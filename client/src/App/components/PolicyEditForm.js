import React, { Component } from 'react'

export default class PolicyEditForm extends Component {
    constructor(props){
        super(props);

        this.state={
            name: '',
            description: '',
            tags: [],
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.policy.name,
            description: nextProps.policy.description,
            tags: nextProps.policy.tags,
        })
    }

    render() {
        return (
            <div>
                Edit: {this.state.name},                
            </div>
        )
    }
}

