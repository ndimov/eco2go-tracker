import React from 'react';
import { Button, TextField } from '@material-ui/core';
import firebase from './firebase.js';

class InputForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            submissionText: ""
        }
    }

    setSubmissionText(newText) {
        this.setState({ submissionText: newText });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const studentID = parseInt(this.studentID.value);
        const quantity = parseInt(this.quantity.value);
        if (isNaN(studentID) || isNaN(quantity)) {
            this.setSubmissionText("Student ID and Quantity cannot be empty.");
            return;
        }
        const logRef = firebase.firestore().collection("log");
        logRef.add({
            studentID: parseInt(this.studentID.value),
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
        this.studentID.value = "";
        this.quantity.value = "";
    }

    render() {
        return (
            <div>
                <form className="input-form" onSubmit={this.handleSubmit}>
                    <TextField
                        type="number"
                        name="id"
                        label="Student ID"
                        placeholder="200"
                        inputRef={input => this.studentID = input}
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
            </div>
        )
    }
}

export default InputForm;