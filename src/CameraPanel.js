import React from "react";
import Webcam from "react-webcam"

class CameraPanel extends React.Component {

    state = {
        imageData:null
    }

    setRef = (webcam) => {
        this.webcam = webcam;
    }

    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        this.setState({
            imageData:imageSrc
        })
    }

    render(){
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: 'user',
        };

        return (
            <div>
                <Webcam
                    audio = {false}
                    height = {350}
                    ref = {this.setRef}
                    screenshotFormat="image/jpeg"
                    width = {350}
                    videoConstraints={videoConstraints}
                />
                <div className ="button-container"><button onClick={this.capture}> Capture </button></div>
                {this.imageData && (
                    <img
                        src={this.imageData}
                   />
               )}
            </div>
        )
    }
}

export default CameraPanel;