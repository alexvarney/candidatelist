import React from 'react'
import moment from 'moment';

export default (props) => {
    const {name, state, dob, slogan, status, polling, description, image} = props.candidate;
    
    const years = moment().diff(dob, 'years');
    
    const styles = {
        containerStyle: {
            display: 'flex',
            flexDirection: 'row',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto',
            flexWrap: 'wrap',
        },
        colSm: {
            width: '30%',
            height: '100%',
        },
        colLg: {
            minWidth: '250px',
            width: '70%',
            height: '100%',
        },
        imgStyle:{
            maxWidth: '80%',
            maxHeight: '80%',
            borderRadius: '50%',
            marginTop: '1em',
            border: '3px solid #0d1c33',
        },
        h1:{
            textAlign: 'center',
            marginBottom: '0px',
        },
        slogan: {
            marginTop: '0.5em',
            textAlign: 'center',
        },
        statContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        statChild: {
            display: 'block',
            width: '50%',
            paddingLeft: '0em',
        },
    }
  
    return (
    <div style={styles.containerStyle}>
        <div style={styles.colSm}>
        {(image)?<img alt={name} style={styles.imgStyle} src={process.env.PUBLIC_URL + `/headshots/${image}`} />:null}
        </div>
        <div style={styles.colLg}>
            <h1 style={styles.h1}>{name}</h1>
            {(slogan)?<p style={styles.slogan}>{slogan}</p>:null}
            <div style={styles.statContainer}>
                <p style={styles.statChild}><strong>State:</strong> {state}</p>
                <p style={styles.statChild}><strong>Campaign Status:</strong> {status}</p>
                <p style={styles.statChild}><strong>Polling:</strong> {polling}%</p>
                <p style={styles.statChild}><strong>Age:</strong> {years} Years Old</p>
            </div>
        </div>
        <div>
            <h3>About {name}</h3>
            {(description)?<p>{description}</p>:null}
        </div>
    </div>
  )
}
