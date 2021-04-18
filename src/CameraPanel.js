import React from "react"
import Webcam from "react-webcam"
import { storage } from "./firebase.js"
import { Paper, Button } from "@material-ui/core"
import checkImage from "./cameraModel"

class CameraPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: null,
      webcamEnabled: false
    }

    // otherwise 'this' is bound wrong
    this.useCamera = this.useCamera.bind(this);
    this.capture = this.capture.bind(this);
  }

  capture() {
    const imageSrc = this.webcamRef.getScreenshot();
    this.setState({ imgSrc: imageSrc });
    storage.ref(`/images/user.png`).putString(imageSrc, 'data_url', { contentType: 'image/jpg' });
    checkImage(imageSrc).then((value) => {
      alert(value)
    })
    this.setState({ webcamEnabled: false });
  }

  useCamera() {
    this.setState({ webcamEnabled: true });
  }

  videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  };

  render() {
    return (
      <div>
        <Paper className="container">
          {this.state.webcamEnabled ?
            <div>
              <Button onClick={this.capture}>Use photo</Button>
              <br></br>
              <Webcam
                audio={false}
                className="center webcam"
                ref={input => this.webcamRef = input}
                screenshotFormat="image/jpeg"
                overflow="auto"
                videoConstraints={this.videoConstraints}
              />
            </div>
            :
            <div>
              <Button onClick={this.useCamera}>Enable camera</Button>
              <br></br>
              {
                this.state.imgSrc && (
                  <img alt=""
                    src={this.state.imgSrc}
                  />
                )
              }
            </div>
          }
        </Paper>
      </div >
    );
  }
};

export default CameraPanel;