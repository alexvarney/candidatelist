import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import DeletionConfirm from './DeletionConfirm';
import PositionAddForm from './PositionAddForm';
import PositionEditController from './PositionEditController';

export default class CandidateEditForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            redirect: false,
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
        
        const URL = `${process.env.REACT_APP_API_PATH}/candidates/id/${this.props.candidate._id}`
        
        fetch(URL, {
            method: 'PUT', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(this.state),})
        .then((data)=>this.props.onUpdate());
    }

    renderRedirect = () => {
        if(this.state.redirect){
            return <Redirect to="/candidates/"/>
        }
    }

    deleteCandidate = (event) => {
        const URL = `${process.env.REACT_APP_API_PATH}/candidates/id/${this.props.candidate._id}`
        
        fetch(URL, {
            method: 'DELETE'
        }).then(()=>this.setState({redirect: true}));
    }

    render() {

        const componentStyle = {
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
        }

        const labelStyle = {
            display: 'block',
        }

        return (
        <div style={componentStyle}>
            <h3>Edit Candidate Data</h3>
            <form onSubmit={this.handleSubmit}>
                {this.renderRedirect()}
                <label style={labelStyle}>
                    Name:
                    <input name="name" onChange={this.handleFormChange} type="text" placeholder={`${this.props.candidate.name}`}></input>
                </label>
                <label style={labelStyle}>
                    State:                
                    <input name="state" onChange={this.handleFormChange} type="text" placeholder={`${this.props.candidate.state}`}></input>
                </label>
                <label style={labelStyle}>
                    Date of Birth:
                    <input name="dob" onChange={this.handleFormChange} type="text" placeholder={`${this.props.candidate.dob}`}></input>    
                </label>
                <label style={labelStyle}>
                    Status:
                    <input name="status" onChange={this.handleFormChange} type="text" placeholder={`${this.props.candidate.status}`}></input>
                </label>
                <label style={labelStyle}>
                    Slogan:
                    <input name="slogan" onChange={this.handleFormChange} type="text" placeholder={`${this.props.candidate.slogan}`}></input>
                </label>
                <label style={labelStyle}>
                    Polling:
                    <input name="polling" onChange={this.handleFormChange} type="text" placeholder={`${this.props.candidate.polling}`}></input>
                </label>
                <label style={labelStyle}>
                    Image name:
                    <input name="image" onChange={this.handleFormChange} type="text" placeholder={`${this.props.candidate.image}`}></input>
                </label>
                <label style={labelStyle}>
                    Candidate description:<br/>
                    <textarea name="description" onChange={this.handleFormChange} type="text" placeholder={`${this.props.candidate.description}`}></textarea>
                </label>
                <input type="submit"></input>
                <DeletionConfirm onDelete={this.deleteCandidate}/>
            </form>
            <hr />
            <h3>Add Candidate Positions</h3>
            <PositionAddForm onUpdate={this.props.onUpdate} candidate={this.props.candidate} policyList={this.props.policies}/>
            <hr />
            <h3>Edit Candidate Positions</h3>
            <PositionEditController onUpdate={this.props.onUpdate} candidate={this.props.candidate} policyList={this.props.policies}/>
        </div>

        )
    }
}
