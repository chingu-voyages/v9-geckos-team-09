import React from 'react';
import './TestPage.css'

const rndNoun = (arr) => {
    var i = Math.floor(Math.random()*arr.length);
    return {english:arr[i].english, foreign:arr[i].foreign}
}

// so far only tense in vocab.js is 'present'
// nb: person is zero-indexed [1stSing, 2ndSing, 3rdSing, 1stPlur, 2ndPlur, 3rdPlur]
const rndVerb = (arr, tense, person) => {
    var i = Math.floor(Math.random()*arr.length);
    return {english:arr[i][tense][person], foreign: arr[i][tense+'Foreign'][person]}
}

// gender is stored as an array [male, female, neuter]
// not fully implemented, because the gender of nouns is not currently stored
const rndAdj = (arr, gender) => {
    var i = Math.floor(Math.random()*arr.length);
    return {english:arr[i].english, foreign:arr[i].foreign[gender]}  
}

const TestPage = (props) => {  
  var noun1 = rndNoun(props.words.nouns);
  var verb1 = rndVerb(props.words.verbs, 'present', 2);
  var adj1 = rndAdj(props.words.adjectives, 0); //masculine because gender not currently defined
  var englishSentence = 'The '+noun1.english +' '+ verb1.english + ' ' + adj1.english +'.' ;
  //NB: 'the' needs to match gender too
  var foreignSentence = 'Ten '+noun1.foreign +' '+ verb1.foreign + ' ' + adj1.foreign +'.' ;
  
  if (props.transMode === 'fromEng') {
      var questionSentence = englishSentence;
      var answerSentence = foreignSentence;
      var buttonRole = 'Switch to translating INTO English';
    } else {
        questionSentence = foreignSentence;
        answerSentence = englishSentence;
        buttonRole = 'Switch to translating FROM English';
  }

    
  return (
      <div id='testpage'>
        <h2>Translate the following</h2>
        <p id='question'>{questionSentence}</p>
        <p>{answerSentence}</p>
        <button onClick={props.switchModeClick}>{buttonRole}</button>
      </div>
  )
}

export default TestPage;