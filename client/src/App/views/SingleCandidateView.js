import React, { Component } from 'react';


import CandidateEditForm from '../components/CandidateEditForm';
import CandidateTitleCard from '../components/CandidateTitleCard';
import PositionDisplay from '../components/PositionDisplay';
import PositionAddForm from '../components/PositionAddForm';


export default class SingleCandidateView extends Component {
    constructor(props){
        super(props);
        this.state = {
            candidate: {},
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
        .then(v => this.setState({candidate: v}));
    }



    render() {

        const {_id, name, state, dob, slogan, status, polling, positions, image} = this.state.candidate;

        const imgStyle = {
            maxWidth: '256px',
            maxHeight: '256px',
        }
        const containerStyle = {
            padding: '1em 0em 0em 0.5em'
        }

        return (
        <div style={containerStyle}>
            <CandidateTitleCard candidate={this.state.candidate}/>
            <h2>Positions:</h2>
            
            
            {(this.state.candidate && this.state.candidate.positions) ? this.state.candidate.positions.map(position=>{
                return(<PositionDisplay onUpdate={this.onUpdate} position={position} policyList={this.state.policies}/>)
            }):null}
            <h3>Add Position</h3>
            <PositionAddForm onUpdate={this.onUpdate} candidate={this.state.candidate} policyList={this.state.policies}/>
            
            <h3>Edit Candidate</h3>
            <CandidateEditForm onUpdate={this.onUpdate} candidate={this.state.candidate}/>


        </div>
        )
    }
}
