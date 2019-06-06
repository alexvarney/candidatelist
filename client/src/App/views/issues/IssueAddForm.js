import React, { Component } from 'react'

export default class IssueAddForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            form : {
                name: '',
                description: '',
            }
        }
    }

    onIssueChange = (event) => {
        event.persist();
        this.setState((prevState)=>({
            form: {
                ...prevState.form,
                [event.target.name]: event.target.value,
            }
        }))
    }

    onSubmit = (event) => {
        event.preventDefault();
        const URL = `${process.env.REACT_APP_API_PATH}/issues`;
        const {form} = this.state;
        this.setState((prevState)=>({form: {description: '', name: '',}}));    
        
        fetch(URL, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(form),})
        .then(()=>this.props.onUpdate());

    }

    render() {
        return (
        <div>
            <h3>Add a policy</h3>
            <form onSubmit={this.onSubmit}>
                <input type="text" name="name" onChange={this.onIssueChange} value={this.state.form.name} placeholder="Policy Name"/>
                <br />
                <textarea name="description" onChange={this.onIssueChange} value={this.state.form.description} placeholder="Policy Description"/>
                <br />
                <input type="submit"/>
            </form>
        </div>
        )
    }
}
