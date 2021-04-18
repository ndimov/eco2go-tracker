import '@tensorflow/tfjs-node';
import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';


Promise.all([
    faceapi.nets.faceRecognitionNet.loadfromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadfromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadfromUri('/models')
])

function checkImage(image1, image2){
    const results = await faceapi
        .detectAllFaces(image1)
        .withFaceLandmarks()
        .withFaceDescriptors()

    if(!results.length){
        return
    }

    const faceMatcher = new faceapi.FaceMatcher(results, 0.6)
    const singleResult = await faceapi.detectSingleFace(image2)
                                        .withFaceLandmarks()
                                        .withFaceDescriptor()

    if(singleResult){
        const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor)
        return(bestMatch)
    }

    return
}