/* eslint-disable require-jsdoc */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();
const leaderboardRef = db.collection("leaderboard");
const usersRef = db.collection("users");

// Update the leaderboard quantities when a new log entry is made
// Possibly create a new doc in the leaderboard collection
// Also make sure this function is idempotent
// - see bottom of https://cloud.google.com/blog/products/serverless/cloud-functions-pro-tips-building-idempotent-functions
exports.onLogCreate = functions.firestore
  .document("log/{logID}")
  .onCreate((snap, context) => {
    const eventRef = db.collection("events").doc(context.eventId);

    return shouldRunWithLease(eventRef).then((run) => {
      if (run) {
        const data = snap.data();

        leaderboardRef.where("studentID", "==", data.studentID)
          .get()
          .then((querySnapshot) => {
            let exists = false;
            querySnapshot.forEach((snapshot) => {
              const doc = snapshot.ref;
              const currentQuantity = snapshot.data().quantity;
              const newQuantity = currentQuantity + data.quantity;
              doc.update({
                quantity: newQuantity
              }); // error checking?
              exists = true;
              // there should be only one record matching studentID
            });
            if (!exists) {
              usersRef.where("studentID", "==", data.studentID)
                .get()
                .then((querySnapshot) => {
                  // We are guaranteed to have this student ID
                  const name = querySnapshot.docs[0].data().name;
                  leaderboardRef.add({
                    studentID: data.studentID,
                    name: name,
                    quantity: data.quantity,
                  });
                });
            }
          });
        markRan(eventRef);
      }
    });
  });


const leaseTime = 60 * 1000; // 60s

function shouldRunWithLease(eventRef) {
  return db.runTransaction((transaction) => {
    return transaction.get(eventRef).then((doc) => {
      if (doc.exists && doc.data().sent) {
        return false;
      }
      if (doc.exists && new Date() < doc.data().lease) {
        return Promise.reject("Lease already taken, try later.");
      }
      transaction.set(
        eventRef, { lease: new Date(new Date().getTime() + leaseTime) });
      return true;
    });
  });
}

function markRan(eventRef) {
  return eventRef.set({ ran: true });
}