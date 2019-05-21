import React, { Component } from 'react'

import PolicyAddForm from '../components/PolicyAddForm'
import PolicyDisplay from '../components/PolicyDisplay'

export default class PolicyView extends Component {
  constructor(props){
    super(props)
    this.state = {
      policies: [],
    }
  }

  componentDidMount(){
    this.getPolicies();
  }

  getPolicies = () => {
    const URL = `${process.env.REACT_APP_API_PATH}/issues/`

    fetch(URL)
      .then((data)=>data.json())
      .then((data)=>this.setState({policies: data}));

  } 


  render() {
    return (
      <div>
        {this.state.policies.map(item=>{
          return(
          <PolicyDisplay onUpdate={this.getPolicies} policy={item}/>)
        })}
        <PolicyAddForm onUpdate={this.getPolicies}/>
      </div>
    )
  }
}
