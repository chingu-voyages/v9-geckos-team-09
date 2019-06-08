import React from 'react'

const textAreaStyles = {
    fontSize: 20,
    marginBottom: '20px'
}

const buttonStyles = {
    display: 'block',
    fontSize: '25px',
    margin: '0 auto',
    marginBottom: '100px',
    width: '100px'
}

const mainAreaStyles = {
    display: 'block'
}

class Reader extends React.Component {
    render() {
        return (
            <div>
                <h1>This is the reader</h1>
                <div id='main-area' style={mainAreaStyles}>
                    <textarea id='textArea' rows='20' cols='80' placeholder='Paste your text here...' style={textAreaStyles}></textarea>
                    <button style={buttonStyles}>Go</button>
                </div>
            </div>
        )
    }
}

export default Reader 