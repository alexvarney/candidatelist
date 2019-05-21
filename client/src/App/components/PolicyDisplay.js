import React, {Component} from 'react'
import DeletionConfirm from './DeletionConfirm';

export default class PolicyDisplay extends Component {
  

  deletePolicy = (event) => {
      const URL = `${process.env.REACT_APP_API_PATH}/issues/id/${this.props.policy._id}`;
      fetch(URL, {
          method: 'DELETE', 
      })
      .then(()=>this.props.onUpdate());
  }
    

    render(){
      const {policy} = this.props;
      return (
        <div>
            <h3>{policy.name}</h3>
            <p>{policy.description}</p>
            <DeletionConfirm onDelete={this.deletePolicy}/>
        </div>
      )
      }
}