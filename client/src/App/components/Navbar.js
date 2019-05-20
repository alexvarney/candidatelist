import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default () => {

    const componentStyle = {
        padding: '10px',
        width: '100%',
        backgroundColor: '#000',
        
    }

    const linkStyle = {
        padding: '5px',
        color: '#fff',
        textDecoration: 'none',
    }

    const titleStyle = {
        color: '#fff',
        fontWeight: 'bold',
        marginRight: '1em',
    }

  return (
    <nav style={componentStyle}>
        <span style={titleStyle}>CandidateList</span>
        <Link style={linkStyle} to="/">Home</Link>
        <Link style={linkStyle} to="/candidates">Candidates</Link>
        <Link style={linkStyle} to="/candidates/add">-> New</Link>
        <Link style={linkStyle} to="/policies">| Policies</Link>
    </nav>
  )
}
