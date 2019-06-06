import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import PolicyEditForm from '../../components/PolicyEditForm';

export default class IssueView extends Component {
    constructor(props){
        super(props);
        this.state = {
            policy: {},
        }
    }

    componentDidMount = () => {
        this.makePolicyFetch();
    }

    makePolicyFetch = () => {
        fetch(`${process.env.REACT_APP_API_PATH}/issues/id/${this.props.match.params.id}`)
        .then(v=>v.json())
        .then(v=>this.setState({policy: v}));
    }
    

    render() {
        return (
            <div>
                <h2>{this.state.policy.name}</h2>
                <p>{this.state.policy.description}</p>
                <p>{this.state.policy.tags}</p>

                <Route path='/issues/:id/edit' render={(props)=> <PolicyEditForm policy={this.state.policy} onUpdate={this.makePolicyFetch} {...props}/>} />


            </div>
        )
    }
}
