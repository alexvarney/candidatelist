import React, {Component} from 'react'

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export default class PositionDisplay extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            expanded: false,
        }
    }

    makeDeleteRequest = () => {
        const URL = `${process.env.REACT_APP_API_PATH}/candidates/positions/${this.props.position._id}`;
        fetch(URL, {
            method: 'DELETE', 
        })
        .then((data)=>this.props.onUpdate());

    }

    changeExpansion = () => {
        this.setState((prevState)=>{
            return({expanded: !prevState.expanded});
        })
    }

    render() {

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


        const {position, policyList} = this.props;
    
        const result = policyList.filter(policy=>policy._id === position.issue)[0]
        const name = (result) ? result.name : '<DELETED>';

        const containerStyle = {
            borderRadius: '5px',
            border: '1px solid #000',
            maxWidth: '600px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: '1em',
            padding: '0 1em 0 1em',
            marginLeft: 'auto',
            marginRight: 'auto',
        }

        const expanderStyle = {
            display: (this.state.expanded) ? 'block' : 'none',
        }

        const titleStyle = {
            marginRight: '1em',
            fontWeight: 'bold',
        }

        return (
            <div style={containerStyle}>
                <p style={{width: '70%'}}>
                    <span style={titleStyle}>{name}</span>
                </p>
                <p style={{width: '20%'}}><span style={styleMap[position.status]}>{position.status.capitalize()}</span></p>
                <p onClick={this.changeExpansion} style={{width: '10%', textAlign: 'right'}}>{(this.state.expanded)?'Less':'More'}</p>
                <div style={expanderStyle}>
                    
                    <p>{position.description}</p>
                </div>
            </div>
        )
    }
}
