import React from 'react'
import { Link } from "react-router-dom";

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
        <Link style={linkStyle} to="/policies">Policies</Link>
    </nav>
  )
}
