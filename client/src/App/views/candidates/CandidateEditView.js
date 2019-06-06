import React, { Component } from 'react';
import axios from 'axios';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import CandidateEditForm from '../../components/CandidateEditForm';

export default class CandidateEditView extends Component {

    constructor(props){
        super(props);
        this.state = {
            filterTerm: '',
            selectedCandidate: {},
            candidates: [],
            policies: [],
        }
    }

    componentDidMount(){
        this.updateData();
    }

    updateData = () => {

        const selectedId = this.state.selectedCandidate._id;
    
        axios.get(`${process.env.REACT_APP_API_PATH}/candidates/`)
            .then(res => {
                this.setState({candidates: res.data})
                if(selectedId){
                    const candidate = this.state.candidates.filter(candidate=>candidate._id === selectedId)[0];
                    this.setState({selectedCandidate: candidate});
                }
            })

        axios.get(`${process.env.REACT_APP_API_PATH}/issues/`)
            .then(res=>this.setState({policies: res.data}));

    }

    onFilterChange = (event) => {
        this.setState({filterTerm: event.target.value});
    }

    

    render() {

        const componentStyle = {
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
            height: '100%',
        }


        const searchFilter = (list) => list.filter((item)=>item.name.toLowerCase().includes(this.state.filterTerm.toLowerCase()));
        const sortAlphabetical = (list) => list.sort((a,b)=>(a.name.split(" ")[1]>b.name.split(" ")[1])?1:-1);

        const candidateDropDownList = sortAlphabetical(searchFilter(this.state.candidates));

        return (
        <div style={componentStyle}>

        {/* -- Candidate Selection -- */}

            <DropdownButton id="dropdown-basic-button" title={(this.state.selectedCandidate.name)?this.state.selectedCandidate.name:'Select a Candidate'}>
                <InputGroup style={{padding:'10px 10px 0px 10px'}}size="sm" className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-sm">Filter</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={this.onFilterChange} value={this.state.filterTerm}/>
                </InputGroup>

                {candidateDropDownList.map(candidate=>{
                    return(
                        <Dropdown.Item onClick={()=>{this.setState({selectedCandidate: candidate})}}>{candidate.name}</Dropdown.Item>
                    )
                })}

            </DropdownButton>

        {/* -- End Candidate Selection -- */}

        {(this.state.selectedCandidate._id)?
            <CandidateEditForm candidate={this.state.selectedCandidate} policies={this.state.policies} onUpdate={this.updateData}/>:null}
        </div>

        )
    }
}
