import React from 'react';
import WordListDisplay from './Components/WordListDisplay';
import {wordList} from './Assets/Vocab';
import './App.css';
import Reader from './Components/Reader'

class App extends React.Component {
  state = {
    knownWords : wordList
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">Soon to be a language learning app
        </header>
        <WordListDisplay words={this.state.knownWords} />
      </div>
    );
  } 

}

export default App;
