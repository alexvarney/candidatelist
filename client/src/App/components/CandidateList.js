import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class CandidateList extends Component {
    constructor(){
        super();

        this.state = {
            candidates: [],
        }
    }

    componentDidMount(){
        console.log(`${process.env.REACT_APP_API_PATH}/candidates/`);
        fetch(`${process.env.REACT_APP_API_PATH}/candidates/`)
            .then(response => response.json())
            .then(data=>{
                this.setState({candidates: data});
            })
    }

    render() {

        const listRow = {
            backgroundColor: '#545454',
            color: '#fff',
            padding: '10px 10px 10px 30px',
            margin: '5px',
            maxWidth: '60%',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: '5px',
        }
        const linkStyle ={
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 'bold',
            marginLeft: '0.5em',
            display: 'inline-block',
            textAlign: 'right',
            float: 'right',
        }

        return (
        <div>
            {this.state.candidates.sort((a,b)=>(a.name.split(" ")[1]>b.name.split(" ")[1])?1:-1).map(person=>{
                return(<div style={listRow}>
                    <span>{person.name}</span>
                    <Link style={linkStyle} to={`/candidates/${person._id}`}>View</Link>
                </div>)
            })}
        </div>
        )
  }
}
