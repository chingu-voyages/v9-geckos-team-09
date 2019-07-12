import React from 'react';
import './TestPage.css';
import {Button, Form, Toast} from  'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './global.css'

const TestPage = (props) => {  
    
  if (props.transMode === 'fromEng') {
      var questionSentence = props.testQ.english;
      var answerSentence = props.testQ.foreign;
      var placeHolderText = 'Provide the '+props.language+' translation';
    } else {
        questionSentence = props.testQ.foreign;
        answerSentence = props.testQ.english;
        placeHolderText = 'Provide the English translation';
  }   

  var answerWords = answerSentence.toLowerCase().split(' ');
  var markedAns = props.userAns === '' ? <span>I'll mark your answer here</span> 
      : props.userAns.split(' ').map((x, i) => {
        if (x.toLowerCase() === answerWords[i]) {
            return <span className='goodWord' key={i}>{x+' '}</span>
        }
        return <span className='badWord' key={i}>{x+' '}</span>
        })

  const handleSubmit = (event) => {
    event.preventDefault();
  }
  

  
  return (
      <div id='testpage'>
        <div className='wrapper rounded'>
            <div id='test-page-content'>
              <h2>Translate the following</h2>
              <p id='question'>{questionSentence}</p>
              <Form onSubmit={handleSubmit} >
                <Form.Group>
                  <Form.Control 
                    id='trans-input'
                    type='text' 
                    placeholder={placeHolderText}
                    value={props.userAns} 
                    onChange={props.changeAns} />
                </Form.Group>
              <Button variant='primary' onClick={props.switchModeClick}>Translate the other way</Button>
              </Form>
              <p></p>
              <div id='answer'>{markedAns}</div>
              <p>If your translation matches what I'm thinking of, then your words will be green. 
                If a word is red, then your translation is different to mine. <br />
                If you get the complete sentence, I will reward you with a new question!</p>
            </div>
          </div>
          <Toast 
            id='answerToast' 
            show={props.showAnswerToast} 
            onClose={props.closeToast} 
            delay={2000}
            autohide
          >
            <Toast.Header id='answerHeader'>
              <h4>Correct!!</h4>
            </Toast.Header>
            <Toast.Body>
              <p>You have translated {props.correctAnswerCount} sentences.</p>
            </Toast.Body>
          </Toast>
        </div>
  )
}

export default TestPage;