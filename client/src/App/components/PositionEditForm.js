import React, { Component } from 'react'
import DeletionConfirm from './DeletionConfirm'


export default class PositionEditForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            status: this.props.position.status,
            description: this.props.position.description,
            linkForm: {
                title: '',
                url: '',
            },
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({status: nextProps.position.status, description: nextProps.position.description});
    }

    makeDeleteRequest = (linkId) => {

        return () => {
            const URL = `${process.env.REACT_APP_API_PATH}/candidates/id/${this.props.candidate._id}/positions/${this.props.position._id}/links/${linkId}`;
            fetch(URL, {
                method: 'DELETE', 
            })
            .then((data)=>this.props.onUpdate());
    }

    }

    makeUpdateRequest = (event) => {
        event.preventDefault();
        const URL = `${process.env.REACT_APP_API_PATH}/candidates/positions/${this.props.position._id}`;
        fetch(URL, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({description: this.state.description, status: this.state.status}),
        }).then((data)=>this.props.onUpdate());
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    onLinkInput = (event) => {
        event.persist();
        this.setState((prevState) => ({
            linkForm: {
                ...prevState.linkForm,
                [event.target.name]: event.target.value,
            }
        }))
    }

    postLink = (event) => {
        event.preventDefault();

        const URL = `${process.env.REACT_APP_API_PATH}/candidates/id/${this.props.candidate._id}/positions/${this.props.position._id}/links`

        fetch(URL, {
            method: 'POST', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(this.state.linkForm),})
        .then((data)=>{
            this.setState({linkForm: {title: '', url: ''}});
            this.props.onUpdate();
        });
    }
    

  render() {

    const flexGrid = {
        display: 'flex',
        width: '100%'
    }

    const flexChild = {
        width: '45%',
    }

    return (
        <div>
            <div style={flexGrid}>
                <div style={flexChild}>
                    <h3>Edit Description</h3>
                    <form onSubmit={this.makeUpdateRequest}>
                        <label>
                            Status:
                        </label><br/>
                        <select onChange={this.onChange} value={this.state.status} name="status">
                            <option value="supports">Supports</option>
                            <option value="mixed">Mixed</option>
                            <option value="opposed">Opposed</option>
                            <option value="unknown">Unknown</option>
                        </select><br/>
                        <textarea onChange={this.onChange} value={this.state.description} name="description" rows="3" /><br/>
                        <button>Update</button>
                    </form>
                </div>
                <div style={flexChild}>
                    <h3>Add Link to Position</h3>
                    <form>
                        <label>Title</label><br/>
                        <input type="text" name="title" placeholder="title" value={this.state.linkForm.title} onChange={this.onLinkInput} /><br />
                        <label>URL</label><br/>
                        <input type="text" name="url" placeholder="http://www.example.com" value={this.state.linkForm.url}onChange={this.onLinkInput}/><br />
                        <button onClick={this.postLink}>Add</button>
                    </form>
                </div>
            </div>
            <h3>Delete Position</h3>
            <DeletionConfirm style={{marginTop: '10px'}} onDelete={this.makeDeleteRequest}/>
            
            <h3>Link Manager</h3>
            <table>
                <thead>
                    {(this.props.position.links && this.props.position.links.length > 0) ? <tr><th>Title</th><th>URL</th><th>Action</th></tr> : null}
                </thead>
                <tbody>
                    {this.props.position.links.map((link)=>{
                        const deletionFunc = this.makeDeleteRequest(link._id);
                        return(
                            <tr key={link.url}><td><a href={link.url}>{link.title}</a></td><td>{link.url}</td><td><DeletionConfirm onDelete={deletionFunc}/></td></tr>
                        )
                    })}
                </tbody>
            </table>
        

        </div>
    )
  }
}
