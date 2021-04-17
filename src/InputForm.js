import React from 'react';
import { Button, TextField } from '@material-ui/core'

class InputForm extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();
        this.studentId.value = "";
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
                        placeholder="123456"
                        ref={input => this.studentId = input}
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