import React, { Component } from 'react';
import {Route} from 'react-router-dom';


import CandidateEditForm from '../components/CandidateEditForm';
import CandidateTitleCard from '../components/CandidateTitleCard';
import PositionDisplay from '../components/PositionDisplay';


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

        const containerStyle = {
            padding: '1em 0.5em 0em 0.5em'
        }

        return (
        <div style={containerStyle}>
            <CandidateTitleCard candidate={this.state.candidate}/>
            <h2 style={{textAlign: 'center'}}>Positions:</h2>
            
            
            {(this.state.candidate && this.state.candidate.positions) ? this.state.candidate.positions.map(position=>{
                return(<PositionDisplay onUpdate={this.onUpdate} position={position} policyList={this.state.policies}/>)
            }):null}

            <Route exact path='/candidates/:id/edit' render={(props)=> <CandidateEditForm candidate={this.state.candidate} policies={this.state.policies} onUpdate={this.onUpdate} {...props}/>} />
        </div>
        )
    }
}
