import React from 'react'

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export default (props) => {
    
    const styleMap = {
        "supports":{
            color: 'green',
        },
        "mixed":{
            color: '#bcbf00',
        },
        "opposed":{
            color: 'red',
        },
        "unknown":{
            color: 'grey',
        },
    }

    const {position, policyList} = props;
  
    const {name} = policyList.filter(policy=>policy._id === position.issue)[0]

    const makeDeleteRequest = () => {
        const URL = `${process.env.REACT_APP_API_PATH}/candidates/positions/${position._id}`;
        fetch(URL, {
            method: 'DELETE', 
        })
        .then((data)=>props.onUpdate());

    }

    return (
        <div>
            <p><span onClick={makeDeleteRequest}>(X)</span> <strong>{name}</strong> <span style={styleMap[position.status]}>{position.status.capitalize()}</span> </p>
            <p>{position.description}</p>
        </div>
    )
}
