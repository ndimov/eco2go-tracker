import React from 'react';
import Webcam from "react-webcam"
import { storage } from "./firebase.js"
import { Paper, Button, TextField } from "@material-ui/core"
import checkImage from "./cameraModel"
import firebase from './firebase.js';
import getNamesMap from './namesMap';

class InputPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: null,
      webcamEnabled: false,
      submissionText: "",
      nameText: "",
      studentID: "",
    }

    // otherwise 'this' is bound wrong
    this.useCamera = this.useCamera.bind(this);
    this.capture = this.capture.bind(this);
  }

  capture() {
    this.setNameText("Analyzing photo...");
    const imageSrc = this.webcamRef.getScreenshot();
    this.setState({ imgSrc: imageSrc });
    storage.ref(`/images/user.png`).putString(imageSrc, 'data_url', { contentType: 'image/jpg' });
    checkImage(imageSrc).then((value) => {
      if (value === undefined) {
        this.setNameText("Picture does not match a known student.");
      } else {
        this.setStudentID(value.label);
        // HACK copy-pasted from onIdInput()
        getNamesMap().then((namesMap) => {
          const studentID = this.state.studentID;
          console.log(studentID);
          const name = namesMap.get(parseInt(studentID));
          console.log("Name: ", name);
          if (name === undefined) {
            this.setNameText("Name not found in database.");
          } else {
            this.setNameText(`Student ID matches ${name}.`);
          }
        });
      }
      this.setState({ webcamEnabled: false });
    })
  }

  useCamera() {
    this.setState({ webcamEnabled: true });
  }

  videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  };

  onIDInput = (event) => {
    this.setStudentID(event.target.value);
    getNamesMap().then((namesMap) => {
      const studentID = this.state.studentID;
      console.log(studentID);
      const name = namesMap.get(parseInt(studentID));
      console.log("Name: ", name);
      if (name === undefined) {
        this.setNameText("Name not found in database.");
      } else {
        this.setNameText(`Student ID matches ${name}.`);
      }
    });
  }

  setSubmissionText(newText) {
    this.setState({ submissionText: newText });
  }

  setNameText(newText) {
    this.setState({ nameText: newText });
  }

  setStudentID(newID) {
    this.setState({ studentID: newID });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const studentID = parseInt(this.state.studentID);
    const quantity = parseInt(this.quantity.value);
    if (isNaN(studentID) || isNaN(quantity)) {
      this.setSubmissionText("Student ID and Quantity cannot be empty.");
      return;
    }
    const logRef = firebase.firestore().collection("log");
    logRef.add({
      studentID: parseInt(this.state.studentID),
      quantity: parseInt(this.quantity.value),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
      .then((logRef) => {
        console.log("Document written with id ", logRef.id);
        this.setSubmissionText("Successfully logged data.")
      })
      .catch((error) => {
        console.error("Error adding document", error);
        this.setSubmissionText("Error logging data.");
      });
    this.setStudentID("");
    this.quantity.value = "";
  }

  render() {
    return (
      <div>
        <span>&nbsp;&nbsp;</span>
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
        <form className="input-form" onSubmit={this.handleSubmit}>
          {this.state.nameText}
          <br></br>
          <TextField
            type="number"
            name="id"
            label="Student ID"
            placeholder="200"
            value={this.state.studentID}
            onInput={this.onIDInput}
          />
          <TextField
            type="number"
            name="quantity"
            label="Number of boxes"
            placeholder="2"
            min="1"
            inputRef={input => this.quantity = input}
          />
          <Button type="submit" className="vertical-centering">Log!</Button>
          <br></br>
          {this.state.submissionText}
        </form>
      </div >
    )
  };
}
export default InputPanel;
