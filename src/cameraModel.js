import * as faceapi from 'face-api.js';
import firebase from './firebase';

Promise.all([
    faceapi.nets.faceRecognitionNet.loadfromUri('/weights'),
    faceapi.nets.faceLandmark68Net.loadfromUri('/weights'),
    faceapi.nets.ssdMobilenetv1.loadfromUri('/weights')
])



async function loadLabeledImages() {
    var storage = firebase.storage();
    var storageRef = storage.ref();

    var url = await storageRef.child('inputFaces/200/image.jpg').getDownloadURL();
    const img = await faceapi.fetchImage(url);
    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
    return new faceapi.LabeledFaceDescriptors('200', detections);
}

function checkImage(img) {

    var image = new Image();

    image.src = img;

    const compare = loadLabeledImages();

    const faceMatcher = new faceapi.FaceMatcher(compare, 0.6);

    const singleResult = await faceapi
        .detectAllFaces(image)
        .withFaceLandmarks()
        .withFaceDescriptor();

    if (singleResult) {
        const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor)
        return (bestMatch)
    }
    return
}

module.exports = { checkImage: checkImage }