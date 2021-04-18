import firebase from './firebase';

// Return the map of student id -> names from Firestore
async function getNamesMap() {
    var usersRef = firebase.firestore().collection("users");

    return new Promise(function (resolve, reject) {
        var namesMap = new Map();
        usersRef.get().then((collection) => {
            collection.forEach(doc => {
                const data = doc.data();
                namesMap.set(data.studentID, data.name);
            })
        })
        setTimeout(function () {
            resolve(namesMap);
        }, 500);
    });
}

export default getNamesMap;