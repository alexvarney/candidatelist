import React from 'react'
import moment from 'moment';

export default function CandidateTitleCard(props){
    const {name, state, dob, slogan, status, polling, description, image, website, websiteDisplay, partyAffiliation} = props.candidate;
    
    const years = moment().diff(dob, 'years');
    
    const styles = {
        containerStyle: {
            display: 'flex',
            flexDirection: 'row',
            maxWidth: '800px',
            minWidth: '375px',
            marginLeft: 'auto',
            marginRight: 'auto',
            flexWrap: 'wrap',
        },
        imgStyle:{
            maxWidth: '80%',
            maxHeight: '80%',
            borderRadius: '50%',
            marginTop: '1em',
            border: '3px solid #0d1c33',
            minHeight: '75px,'
        },
        headerRow: {
            width: '100%',
        },
        flexParent: {
            display: 'flex',
            maxWidth: '400px',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        flexChildSm: {
            flexGrow: '1',
            minWidth: '80px',
            maxWidth: '150px',
            paddingTop: '0.6em',
        },
        flexChildLg: {
            flexGrow: '2',
            textAlign: 'right',
            paddingRight: '2em',
        },
        h1:{
        },
        slogan: {
            marginTop: '0.5em',
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
            width: '45%',
            padding: '5px'
        },
        breakWord: {
            wordBreak: 'break-all',
        }
    }
  
    return (
    <div style={styles.containerStyle}>
        
        <div style={{...styles.headerRow, ...styles.flexParent}}>
            <div style={styles.flexChildSm}>
                {(image)?
                    <img alt={name} style={styles.imgStyle} src={process.env.PUBLIC_URL + `/headshots/${image}`} />:null}
            </div>
            <div style={styles.flexChildLg}>
                <h1 style={styles.h1}>{name}</h1>
                {(slogan)?
                    <p style={styles.slogan}>{slogan}</p>:null}
            </div>
        </div>

        <div style={styles.headerRow}>
            <div style={styles.statContainer}>
                <p style={styles.statChild}><strong>State:</strong> {state}</p>
                <p style={styles.statChild}><strong>Campaign Status:</strong> {status}</p>
                <p style={styles.statChild}><strong>Polling:</strong> {polling}%</p>
                <p style={styles.statChild}><strong>Age:</strong> {years} Years Old</p>
                <p style={styles.statChild}><strong>Website:</strong> {(websiteDisplay)?<a style={styles.breakWord} href={website}>{websiteDisplay}</a>:<a href={website}>{website}</a>}</p>
                <p style={styles.statChild}><strong>Affiliation:</strong> {partyAffiliation}</p>
            </div>
        </div>
        <div>
            {(description)?<div><h3>About {name}</h3><p>{description}</p></div>:null}
        </div>
    </div>
  )
}
