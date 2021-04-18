const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.getFaces = functions.https.onCall((image) =>{

    const storageRef = firebase.storage().ref();
    var listRef = storageRef.child('inputFaces')

    var imagesMap = new Map();

    listRef.listAll().then((res)=>{
        res.items.forEach(function(itemFolder) {
            var refImage = listRef.child(itemFolder).child('image.jpg')
            imagesMap.set(itemFolder, refImage)
        })
    })

    return{
        imageMap: imagesMap
    }

});
