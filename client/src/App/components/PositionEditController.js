import React, { Component } from 'react'
import PositionEditForm from './PositionEditForm'

const initialState = {
    selectedIssue: '',
    position: {},
}

export default class PositionEditController extends Component {
    
    constructor(props){
        super(props);
        this.state = initialState;
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.candidate && nextProps.candidate.positions){
            const position = nextProps.candidate.positions.filter(position => position.issue === this.state.selectedIssue)[0];

            this.setState({position});
        }
    }

    onIssueChange = (event) => {
        event.persist();

            const position = this.props.candidate.positions.filter(position => position.issue === event.target.value)[0];

            this.setState({selectedIssue: event.target.value, position: position});

    }

    render() {

        const containerStyle = {

        }
        
        const candidatePositionIds = (this.props.candidate.positions) ? Array.from(this.props.candidate.positions.map((position)=>position.issue)) : [];
        
        return (
        <div style={containerStyle}>
            <form onSubmit={this.onSubmit}>
                <select value={this.state.selectedIssue} onChange={this.onIssueChange} name="issue">
                    <option value="">Select an Issue</option>
                    {this.props.policyList.filter((policy) => candidatePositionIds.includes(policy._id)).map(policy => {
                        return(<option value={policy._id}>{policy.name}</option>)
                    })}
                </select>
            </form>

            {(this.state.selectedIssue !== '')?<PositionEditForm onUpdate={this.props.onUpdate} candidate={this.props.candidate} position={this.state.position} />:null}
        </div>
        )
    }
}
