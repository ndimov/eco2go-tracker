import React from 'react';
import { Button, TextField } from '@material-ui/core';
import firebase from './firebase.js';

class InputForm extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();
        const logRef = firebase.firestore().collection("log");
        logRef.add({
            studentID: this.studentID.value,
            quantity: this.quantity.value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
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
                        ref={input => this.studentID = input}
                    />
                    <TextField
                        type="number"
                        name="quantity"
                        label="Number of boxes"
                        placeholder="2"
                        ref={input => this.quantity = input}
                    />
                    <Button>Log!</Button>
                </form>
            </div>
        )
    }
}

export default InputForm;