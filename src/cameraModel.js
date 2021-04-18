import * as faceapi from 'face-api.js';
import firebase from './firebase';

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/weights'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/weights'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/weights')
])



async function loadLabeledImages() {
    var storage = firebase.storage();
    var storageRef = storage.ref();

    var url = await storageRef.child('inputFaces/200/image.jpg').getDownloadURL();
    const img = await faceapi.fetchImage(url);
    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
    return new faceapi.LabeledFaceDescriptors('200', detections);
}

export default async function checkImage(img) {

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
};