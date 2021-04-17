import React from 'react';
import { Button, TextField } from '@material-ui/core';
import firebase from './firebase.js';

class InputForm extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();
        const logRef = firebase.firestore().collection("log");
        logRef.add({
            studentID: parseInt(this.studentID.value),
            quantity: parseInt(this.quantity.value),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
            .then((logRef) => {
                console.log("Document written with id ", logRef.id);
            })
            .catch((error) => {
                console.error("Error adding document", error);
            });
    }

    render() {
        return (
            <div>
                <form className="input-form" onSubmit={this.handleSubmit}>
                    <TextField
                        type="number"
                        name="id"
                        label="Student ID"
                        placeholder="123456"
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
                    <Button type="submit">Log!</Button>
                </form>
            </div>
        )
    }
}

export default InputForm;