import React from 'react'
import Grabbed from './Grabbed'

class Reader extends React.Component {
    constructor(props) {
        super()

        this.state = {
            mode: 'paste',
            userInput: '',
            text: ''
        }

    this.grabText = this.grabText.bind(this)
    this.editText = this.editText.bind(this)
    this.handleChange = this.handleChange.bind(this)

    }

    handleChange(event) {
        this.setState(
            {userInput: event.target.value}
        )
    }

    grabText() {

        let pastedText = this.refs.myTextArea.value
        this.setState({
            mode: 'read',
            text: pastedText
        })
    }

    editText() {
        this.setState(
            {mode: 'paste'}
        )
    }
   
    render() {

        const textAreaStyles = {
            fontSize: 20,
            marginBottom: '20px',
            margin: 'auto',
            display: 'block',
            width: '60%'
        }
        
        const buttonStyles = {
            display: 'block',
            fontSize: '25px',
            margin: '0 auto',
            marginBottom: '100px',
            marginTop: '20px',
            width: '100px'
        }
        
        const mainAreaStyles = {
            display: 'block'
        }

        if (this.state.mode === 'paste'){

        return (

            <div id='main-area' style={mainAreaStyles}>
                <textarea id='textArea' ref='myTextArea' rows='20' cols='80' placeholder='Paste your text here...' value={this.state.userInput} style={textAreaStyles} onChange={this.handleChange}></textarea>
                <button onClick={this.grabText} style={buttonStyles}>Go!</button>
            </div>

        )} else {

            return (

                <div>
                   <Grabbed text={this.state.text}/>
                   <button style={buttonStyles} onClick={this.editText}>Edit</button>
                </div>
            )
        }
    }
}

export default Reader 