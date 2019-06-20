import React, { Component } from 'react'
import axios from 'axios';

export default class CandidatePollingEditor extends Component {
    constructor(){
        super();

        this.state = {
            candidates: [],
            newValues: {},
        }
    }

    componentDidMount(){
        this.refreshCandidates();
    }

    refreshCandidates = () => {
        fetch(`${process.env.REACT_APP_API_PATH}/candidates/`)
            .then(response => response.json())
            .then(data=>{
                this.setState({candidates: data.sort((a,b)=>(a.name.split(" ")[1]>b.name.split(" ")[1])?1:-1)});
            })
    }

    handlePollingUpdate = (event) => {
        event.persist();

        console.log(event.target.name)

        if(!this.state.newValues[event.target.name]){
            this.setState((prevState) => ({
                newValues: {
                    ...prevState.newValues,
                    [event.target.name]: '',
                }
            }))
        }
        
        this.setState((prevState) => ({
            newValues: {
                ...prevState.newValues,
                [event.target.name]: event.target.value,
            }
        }))

    }

    handlePollingSubmit = (event) => {
        event.preventDefault();

        for (let key of Object.keys(this.state.newValues)){
            const URL = `${process.env.REACT_APP_API_PATH}/candidates/id/${key}`
            axios.put(URL, {polling: this.state.newValues[key]}).then(()=>this.refreshCandidates());
        }
        
    }

    render() {
        
        return (
            <div>
                <form>
                <table>
                    <thead>
                        <tr>
                            <th>Candidate</th>
                            <th>Polling</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.candidates.map((candidate)=>
                            <tr key={candidate._id}>
                                <td>{candidate.name}</td>
                                <td>{candidate.polling}</td>
                                <td><input name={candidate._id} onChange={this.handlePollingUpdate} value={
                                    (this.state.newValues[candidate._id] === "" || this.state.newValues[candidate._id]) ? this.state.newValues[candidate._id] : candidate.polling
                                }></input></td>
                            </tr>
                        )}
                    </tbody>
                    <button onClick={this.handlePollingSubmit}>Submit</button>
                </table>
                </form>
            </div>
        )
    }
}
