import React, { Component } from 'react';
import moment from 'moment';

import CandidateEditForm from '../components/CandidateEditForm';
import PositionDisplay from '../components/PositionDisplay';
import PositionAddForm from '../components/PositionAddForm';

export default class SingleCandidateView extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            policies: [],
        }
    }

    componentDidMount(){
        
        fetch(`${process.env.REACT_APP_API_PATH}/issues/`)
            .then(v=>v.json())
            .then(v=>this.setState({policies: v}));
        
        this.onUpdate();

    }

    onUpdate = () => {
        const { match: { params } } = this.props;

        fetch(`${process.env.REACT_APP_API_PATH}/candidates/id/${params.id}`)
        .then(v => v.json())
        .then(v => this.setState({data: v}));
    }



    render() {

        const {_id, name, state, dob, slogan, status, polling, positions} = this.state.data;
        const years = moment().diff(dob, 'years');

        return (
        <div>
            <h1>{name}</h1>
            <p>State: {state}</p>
            <p>Age: {years} Years Old</p>
            <p>Campaign Status: {status}</p>
            {(slogan)?<p>Slogan: {slogan}</p>:null}
            {(polling !== -1) ? <p>Polling: {polling}%</p>:null}

            <h2>Positions:</h2>
            <h3>Add Position</h3>
            
            {(this.state.data && this.state.data.positions) ? this.state.data.positions.map(position=>{
                return(<PositionDisplay onUpdate={this.onUpdate} position={position} policyList={this.state.policies}/>)
            }):null}

<PositionAddForm onUpdate={this.onUpdate} candidate={this.state.data} policyList={this.state.policies}/>
            
            <h3>Edit Candidate</h3>
            <CandidateEditForm onUpdate={this.onUpdate} candidate={this.state.data}/>


        </div>
        )
    }
}
