import React from 'react'

export default function CandidateListCard(props) {
    const styles = {
        container: {
            display: 'flex',
            width: '350px',
            minHeight: '80px',
            margin: '3px',
            backgroundColor: '#00050f',
            color: '#fff',
        },
        imgContainer: {
            padding: '10px'
        },
        imgStyle: {
            maxWidth: '80px',
            borderRadius: '50%',
            border: '2px solid #000',
        },
        textContainer: {
            flexGrow: '1',
            paddingLeft: '10px',
            textShadow: '2px 2px 5px #000463',
        },
        surnameStyle: {
            fontWeight: 'bold',
            fontSize: '20px'
        },
        percentageText: {
            float: 'right',
            paddingRight: '15px',
            textAlign: 'right',
            fontSize: '22px',
            color: '#f7ae1d',
        },
        sloganText: {
            textAlign: 'right',
            float: 'right',
            padding: '0px 15px 10px 0px',
            fontSize: '12px',
        },
    }

    const {image, name, polling, slogan} = props.candidate;
    const lastName = name.substring(name.indexOf(' ')+1)
    const firstName = name.split(' ')[0]

    return (
        <div style={styles.container}>
            <div style={styles.imgContainer}>
            {(image)?<img alt={name} style={styles.imgStyle} src={process.env.PUBLIC_URL + `/headshots/${image}`} />:null}
            </div>
            <div style={styles.textContainer}>
                <p style={styles.percentageText}>
                    <span>{(polling && polling > 0)?polling + '%':null}</span><br/>                    
                </p>
                <p>
                    <span>{firstName}</span><br />
                    <span style={styles.surnameStyle}>{lastName}</span><br />
                </p>
                <span style={{...styles.sloganText}}>{slogan}</span>
            </div>
        </div>
    )
}
