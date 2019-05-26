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
            margin: '3px',
            borderRadius: '5px',
        }
        const linkStyle ={
            color: '#fff',
            textDecoration: 'none',
            width: '32%',
            minWidth: '275px',
            maxWidth: '320px',
            float: 'right',
            display: 'inline-block',
        }

        const containerStyle = {
            display: 'flex',
            flexWrap: 'wrap',
            maxWidth: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
            justifyContent: 'center',
        }

        const surnameStyle = {
            fontWeight: 'bold',
            fontSize: '20px'
        }

        const imgStyle = {
            maxHeight: '64px',
            width: 'auto',
            position: 'relative',
            left: '0px',
            textAlign: 'right',
            borderRadius: '50%',
            border: '2px solid #0f0f0f',
        }

        const candidateNameStyle = {
            float: 'right',
            textAlign: 'right',
            paddingRight: '1em',
        }

        return (
        <div style={containerStyle}>

            <h1 style={{display: 'block', width: '100%'}}>Candidates</h1><br />

            {this.state.candidates.sort((a,b)=>(a.name.split(" ")[1]>b.name.split(" ")[1])?1:-1).map(person=>{

                const last_name = person.name.substring(person.name.indexOf(' ')+1)
                const first_name = person.name.split(' ')[0]
                const {image} = person;

                return(
                <Link style={linkStyle} to={`/candidates/${person._id}`}>
                    <div style={listRow}>
                        {(image)?<img alt={person.name} style={imgStyle} src={process.env.PUBLIC_URL + `/headshots/${image}`} />:null}
                        <p style={candidateNameStyle}>
                            <span>{first_name}</span><br />
                            <span style={surnameStyle}>{last_name}</span>
                        </p>
                    </div>
                </Link>
                )
            })}
        </div>
        )
  }
}
