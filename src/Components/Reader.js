import React from 'react'
import GrabbedText from './GrabbedText'
import {Button} from  'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Toast from 'react-bootstrap/Toast'
import './Reader.css'
import './global.css'

class Reader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mode: this.props.mode,
            currentTitle: '',
            userTextInput: '',
            showSaveAlert: false,
            showBlankAlert: false
        }
    }

    addNewText = () => {
        this.props.updateMode('paste')
        this.props.clearStateTextInfo()
    }

    /*this is included for when edit-saved-text mode is opened and the initial values of the input fields need to be the 
    same as the title and text values of App's state. They have to be in Reader's state to allow the user to use the input
    elements on the page*/ 
    componentWillReceiveProps = (nextProps) => {
        this.setState(
            {currentTitle: nextProps.title,
            userTextInput: nextProps.text
            }
        )
    }

    deleteText = () => {
        this.props.deleteText()
    }

    editSavedText = () => {
        this.props.updateMode('edit-saved')
    }

    goToStudyMode = () => {
        this.props.updateMode('study')
    }

    handleChangeText = (event) => {
        this.setState(
            {userTextInput: event.target.value}
        )
    }

    handleChangeTitle = (event) => {
        this.setState(
            {currentTitle: event.target.value}
        )
    }

    handleClose = () => {
        this.setState(
            {showSaveAlert: false}
        )
    }

    handleCloseBlankAlert = () => {
        this.setState(
            {showBlankAlert: false}
        )
    }

    hideSaveAlert = () => {
        this.setState(
            {showSaveAlert: false}
        )
    }

    saveEditedText = () => {
        if (this.state.userTextInput === '') {
            this.setState(
                {showBlankAlert: true}
            )
            return
        } else {
            this.props.saveEditedText(this.state.currentTitle, this.state.userTextInput)
            this.setState(
                {showSaveAlert: true}
            )
            this.props.updateMode('read')
    }
    }

    saveText = () => {
        if (this.refs.myTextArea.value === '') {
            this.setState(
                {showBlankAlert: true}
            )
            return
        } else {
            this.setState(
                {showBlankAlert: false}
            )
        var pastedText = this.refs.myTextArea.value
        this.props.updateText(pastedText)


        var title
        if (this.refs.myTitleArea.value !== '') {
            title = this.refs.myTitleArea.value
            this.props.updateTitle(title)
        } else {
            let splitUpText = this.refs.myTextArea.value.split(' ')
            if (splitUpText.length < 6) {
                var firstFiveWords = splitUpText.slice(0, splitUpText.length) 
                var defaultTitle = ''
                for (let i = 0; i < splitUpText.length; i++){
                    defaultTitle = defaultTitle + firstFiveWords[i] + ' '
                    }
                    defaultTitle = defaultTitle.slice(0, -1)
                    defaultTitle = defaultTitle + '...'
                    title = defaultTitle
                    this.props.updateTitle(title)
                } else {
                    firstFiveWords = splitUpText.slice(0, 6) 
                    defaultTitle = ''
                    for (let i = 0; i < 6; i++ ){
                        defaultTitle = defaultTitle + firstFiveWords[i] + ' '
                    }
                    defaultTitle = defaultTitle.slice(0, -1)
                    defaultTitle = defaultTitle + '...'
                    title = defaultTitle
                    this.props.updateTitle(title)
                }
            }

        let d = new Date()
        let fullTime = d.toTimeString()
        fullTime = fullTime.split(' ')[0]

        let dd = d.getDate()
        let mm = d.getMonth() + 1
        let yy = d.getFullYear().toString().substr(-2)
        if (dd < 10) {
        dd = '0' + dd 
        }
        if (mm < 10) {
        mm = '0' + mm
        }
        let fullDate = dd + '/' + mm + '/' + yy
        let timeAndDate = fullTime + ' ' + fullDate
        
        this.props.saveText(timeAndDate, title, pastedText)
        this.setState(
            {showSaveAlert: true}
        )
        this.props.updateMode('read')
    }
    }

    updateTitle = (updatedTitle) => {
        this.props.updateTitle(updatedTitle)
        }

    render() {

        let blankAlert
        if (this.state.showBlankAlert === false) {
            blankAlert = ''
        } else {
            blankAlert = <Toast className='alert' onClose={this.handleCloseBlankAlert} delay={3000} autohide><Toast.Body>Enter some text!</Toast.Body></Toast>
        }

        let saveAlert 
        if (this.state.showSaveAlert === false) {
            saveAlert = ''
        } else {
            saveAlert = <Toast className='alert' onClose={this.handleClose} delay={3000} autohide><Toast.Body>Saved!</Toast.Body></Toast>
        }


        if (this.props.mode === 'paste'){

            return (
                <div className='wrapper rounded'>
                    <div className='row flex-nowrap'> 
                        <div className='col-lg-3 button-area'>
                            <div className='btn-group-vertical'>
                                <Button variant='primary' onClick={this.saveText} className='button btn-lg'>Save</Button>
                            </div>
                        </div>
                        <div id='main-area' className="form-group main-area-paste col-lg-6 rounded">
                            <input className="form-control text-area" ref="myTitleArea" placeholder='Enter title...' onChange={this.handleChangeTitle} value={this.state.currentTitle}></input>
                            <textarea className="form-control text-area" id='textArea' ref='myTextArea' rows='11' cols='80' placeholder='Paste your text here...' value={this.state.userTextInput} onChange={this.handleChangeText}></textarea>
                            {blankAlert}
                        </div>
                        <div className='col-lg-3'>
                            
                        </div>
                    </div>
                </div>

    )} else if (this.props.mode === 'read'){

            return (
                <div className='wrapper rounded'>
                    <div className='row flex-nowrap'>
                        <div className='col-lg-3 button-area'>
                            <div className='btn-group-vertical'>
                                <Button variant='primary' className='button btn-lg' onClick={this.editSavedText}>Edit</Button>
                                <Button variant='primary' className='button btn-lg' onClick={this.goToStudyMode}>Study</Button>
                                <Button variant='primary' className='button btn-lg' onClick={this.addNewText}>Add new text</Button>
                                <Button variant='primary' className='button btn-lg' onClick={this.deleteText}>Delete</Button>
                            </div>
                        </div>
                        <div className='col-lg-6 main-area rounded'>
                            <h2 className='text-title'>{this.props.title}</h2>
                            <div className='text-box'>{this.props.text}</div>
                            {saveAlert}
                        </div>
                        <div className='col-lg-3'>
                            
                        </div>
                    </div>
                </div>
            )

    } else if (this.props.mode === 'edit-saved') {

            return (
                <div className='wrapper rounded'>
                    <div className='row  flex-nowrap'>
                        <div className='col-lg-3 button-area'>
                            <div className='btn-group-vertical'>
                                <Button variant='primary' className='button btn-lg' onClick={this.saveEditedText}>Save</Button>
                            </div>
                        </div>
                        <div className='main-area col-lg-6 rounded'>
                            <input className='form-control text-area' value={this.state.currentTitle} onChange={this.handleChangeTitle}></input>
                            <textarea className='form-control text-area' rows='20' cols='80' value={this.state.userTextInput} onChange={this.handleChangeText}></textarea> 
                            {blankAlert}
                        </div>
                        <div className='col-lg-3'>
                            
                        </div>
                    </div>
                </div>
                )

    } else if (this.props.mode === 'study') {

            return (
                <div className='wrapper rounded'>
                    <div>
                        <div className='text-box'>
                            <GrabbedText title={this.props.title} text={this.props.text} knownWords={this.props.knownWords} editText={this.editSavedText} deleteText={this.deleteText}/>
                        </div>
                    </div>
                </div>
            )
    } 
    }
    }

export default Reader 