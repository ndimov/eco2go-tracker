import React from "react";
import Webcam from "react-webcam"

class CameraPanel extends React.Component {
    
    state = {
        imageData: null,
        image_name: "",
        saveImage: false
    }

    setRef = (webcam) => {
        this.webcam = webcam;
    }

    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        this.setState({
            imageData: imageSrc
        })
    }

    onClickRetake = (e) => {
        e.persist();
        this.setState({
            imageData: null
        })
    }


}