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

    const containerStyle = {
      maxWidth: '80%',
      marginLeft: 'auto',
      marginRight: 'auto',
    }

    return (
      <div style={containerStyle}>
        <h1>Policies</h1>
        {this.state.policies.map(item=>{
          return(
          <PolicyDisplay onUpdate={this.getPolicies} policy={item}/>)
        })}
        <PolicyAddForm onUpdate={this.getPolicies}/>
      </div>
    )
  }
}
