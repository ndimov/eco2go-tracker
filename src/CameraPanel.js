import React from "react";
import Webcam from "react-webcam"
import { storage } from "./firebase.js"
import checkImage from "./cameraModel.js"

const CameraPanel = () => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    storage.ref(`/images/user.png`).putString(imageSrc, 'data_url', { contentType: 'image/jpg' })
    alert(checkImage(imageSrc))
  }, [webcamRef, setImgSrc]);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  };

  return (
    <>
      <Webcam
        audio={false}
        height={350}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={350}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && (
        <img
          src={imgSrc}
        />
      )}
    </>
  );
};



export default CameraPanel;