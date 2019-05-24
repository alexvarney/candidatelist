import React, { Component } from 'react'

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
            this.props.onUpdate();
        });
    }
    

  render() {
    return (
        <div>
            {(false)?<form>
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
            </form>:null}

            <form>
                <label>Title</label><br/>
                <input type="text" name="title" placeholder="title" onChange={this.onLinkInput} /><br />
                <label>URL</label><br/>
                <input type="text" name="url" placeholder="http://www.example.com" onChange={this.onLinkInput}/><br />
                <button onClick={this.postLink}>Add</button>
            </form>
            
            <table>
                <thead>
                    {(this.props.position.links && this.props.position.links.length > 0) ? <tr><th>Title</th><th>URL</th><th>Action</th></tr> : null}
                </thead>
                <tbody>
                    {this.props.position.links.map((link)=>{
                        return(
                            <tr><td><a href={link.url}>{link.title}</a></td><td>{link.url}</td><td>Delete</td></tr>
                        )
                    })}
                </tbody>
            </table>
        

        </div>
    )
  }
}
