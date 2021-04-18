import firebase from './firebase';

// Return the map of student id -> names from Firestore
function getNamesMap() {
    var usersRef = firebase.firestore().collection("users");

    var namesMap = new Map();
    usersRef.get().then((collection) => {
        collection.forEach(doc => {
            const data = doc.data();
            namesMap.set(data.studentID, data.name);
        })
    })

    return namesMap;
}

export default getNamesMap;