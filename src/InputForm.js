import React from 'react';

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
                    <input
                        type="number"
                        name="id"
                        placeholder="123456"
                        ref={input => this.studentId = input}
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="2"
                        ref={input => this.quantity = input}
                    />
                    <button>Log!</button>
                </form>
            </div>
        )
    }
}

export default InputForm;