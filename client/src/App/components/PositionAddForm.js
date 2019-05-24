import React, { Component } from 'react'

const initialState = {
    form: {
        issue: '',
        status: '',
        description: '',
    }
}

export default class PositionAddForm extends Component {
    
    constructor(props){
        super(props);

        this.state = initialState;
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
        const URL = `${process.env.REACT_APP_API_PATH}/candidates/id/${this.props.candidate._id}/positions`;
        const {form} = this.state;
        
        this.setState((prevState)=>({form: {description: '', status: '', issue: ''}}));
        
        fetch(URL, {
            method: 'POST', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(form),})
        .then((data)=>{
            this.props.onUpdate();
        });
    }

    
  
    render() {
        
        const candidatePositionIds = (this.props.candidate.positions) ? Array.from(this.props.candidate.positions.map((position)=>position.issue)) : [];
        
        return (
        <div>
            <form onSubmit={this.onSubmit}>
                <select value={this.state.form.issue} onChange={this.onIssueChange} name="issue">
                    <option value="">Select an Issue</option>
                    {this.props.policyList.filter((policy) => !candidatePositionIds.includes(policy._id)).map(policy => {
                        return(<option value={policy._id}>{policy.name}</option>)
                    })}
                </select>
                <select value={this.state.form.status} onChange={this.onIssueChange} name="status">
                    <option value="">-Select status-</option>
                    <option value="supports">Supports</option>
                    <option value="mixed">Mixed</option>
                    <option value="opposed">Opposed</option>
                    <option value="unknown">Unknown</option>
                </select><br/>
                <textarea onChange={this.onIssueChange} rows="2" placeholder="Enter a description here." name="description" value={this.state.form.description}/><br/>
                <input type="submit"/>
            </form>
        </div>
        )
    }
}
