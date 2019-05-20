import React, { Component } from 'react'


export default class CandidateAddForm extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    handleFormChange = (event) => {
        if(!this.state[event.target.name]){
            this.setState({[event.target.name]:''});
        }
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const URL = `${process.env.REACT_APP_API_PATH}/candidates/`;
        
        fetch(URL, {
            method: 'POST', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(this.state),})
        .then((data)=>{
            console.log(data);
        });
    }

    render() {

        const componentStyle = {

        }

        const labelStyle = {
            display: 'block',
        }

        return (
        <form onSubmit={this.handleSubmit} style={componentStyle}>
            <label style={labelStyle}>
                Name:
                <input name="name" onChange={this.handleFormChange} type="text" placeholder="Name"></input>
            </label>
            <label style={labelStyle}>
                State:                
                <input name="state" onChange={this.handleFormChange} type="text" placeholder="State"></input>
            </label>
            <label style={labelStyle}>
                Date of Birth:
                <input name="dob" onChange={this.handleFormChange} type="text" placeholder="DoB (YYYY-MM-DD)"></input>    
            </label>
            <label style={labelStyle}>
                Status:
                <input name="status" onChange={this.handleFormChange} type="text" placeholder="Status"></input>
            </label>
            <label style={labelStyle}>
                Slogan:
                <input name="slogan" onChange={this.handleFormChange} type="text" placeholder="Campaign Slogan"></input>
            </label>
            <label style={labelStyle}>
                Polling:
                <input name="polling" onChange={this.handleFormChange} type="text" placeholder="Polling %"></input>
            </label>
            
            <input type="submit"></input>
        </form>

        )
    }
}
