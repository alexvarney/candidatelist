import React from 'react'

export default (props) => {

    const {policy, onUpdate} = props;

    const deletePolicy = (event) => {
            const URL = `${process.env.REACT_APP_API_PATH}/issues/id/${policy._id}`;
            fetch(URL, {
                method: 'DELETE', 
            })
            .then(()=>onUpdate());
        
        onUpdate();
    }

  return (
    <div>
        <h3><span onClick={deletePolicy}>(x)</span> {policy.name}</h3>
        <p>{policy.description}</p>
    </div>
  )
}
