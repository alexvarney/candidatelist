import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class CandidateList extends Component {
    constructor(){
        super();

        this.state = {
            candidates: [],
            searchTerm: '',
            sortMethod: 'alphabetical',
            showDeclaredOnly: false,
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

    onSearchChange = (event) => {
        this.setState({searchTerm: event.target.value});
    }

    onRadioSortChange = (event) => {
        this.setState({sortMethod: event.target.value});
    }

    onDeclaredCheckboxChange = () => {
        this.setState((prevState)=>{return{showDeclaredOnly: !prevState.showDeclaredOnly}});
    }

    render() {

        const listRow = {
            backgroundColor: '#545454',
            color: '#fff',
            padding: '10px 10px 10px 30px',
            margin: '3px',
            borderRadius: '3px',
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

        const flexContainer = {
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

        const headerStyle = {
            maxWidth: '75%',
            marginLeft: 'auto',
            marginRight: 'auto',
        }

        const searchInputStyle = {
            marginBottom: '12px',
            fontSize: '16px',
            padding: '5px',
            borderRadius: '3px',
            border: '1px solid black'
        }

        const floatingBoxStyle = {
            boxShadow: '3px 2px 26px 0px rgba(179,179,179,0.33)',
            display: 'inline-block',
            padding: '10px',
            marginBottom: '1em',
        }

        let candidateList = this.state.candidates;

        const sorts = {
            'alphabetical': (list) => list.sort((a,b)=>(a.name.split(" ")[1]>b.name.split(" ")[1])?1:-1),
            'polling': (list) => list.sort((a,b)=>(a.polling>b.polling)?-1:1),
        }

        const searchFilter = (list) => list.filter((item)=>item.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
        const declaredFilter = (list) => list.filter((item)=>item.status.toLowerCase() === 'declared');

        candidateList = searchFilter(candidateList);
        candidateList = sorts[this.state.sortMethod](candidateList);
        candidateList = (this.state.showDeclaredOnly) ? declaredFilter(candidateList) : candidateList;

        return (
        <div>
            <div style={headerStyle}>
                <h1 style={{display: 'block', width: '100%',}}>Candidates</h1>
                <div style={floatingBoxStyle}>
                    <p style={{marginTop: '5px', marginBottom: '5px', fontWeight: 'bold'}}>Search</p>
                    <input style={searchInputStyle} placeholder="Search Candidates..."value={this.state.searchTerm} onChange={this.onSearchChange} type="text"></input>
                    <div style={{marginBottom: '6px'}} onChange={this.onRadioSortChange}>
                        Sort:
                        <input type="radio" checked={this.state.sortMethod === 'alphabetical'} value="alphabetical" name="sortMethod"/>
                            <label onClick={()=>this.onRadioSortChange({target: {value: 'alphabetical'}})}>(A-Z)</label>
                        <input style={{marginLeft: '10px',}}type="radio" checked={this.state.sortMethod === 'polling'} value="polling" name="sortMethod"/>
                            <label onClick={()=>this.onRadioSortChange({target: {value: 'polling'}})}>Polling</label>
                    </div>
                    <input style={{marginBottom: '12px'}} checked={this.state.showDeclaredOnly} onClick={this.onDeclaredCheckboxChange} type="checkbox" /> <label onClick={this.onDeclaredCheckboxChange}>Show Active Candidates Only</label>
                </div>
            </div>
            <div style={flexContainer}>
                {candidateList.map(person=>{
                    const last_name = person.name.substring(person.name.indexOf(' ')+1)
                    const first_name = person.name.split(' ')[0]
                    const {image} = person;
                    return(
                    <Link key={person._id} style={linkStyle} to={`/candidates/${person._id}`}>
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
        </div>
        )
  }
}