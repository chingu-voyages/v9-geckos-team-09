import React from 'react';
import Reader from './Components/Reader';
import TextCatalogue from './Components/TextCatalogue'
import WordListDisplay from './Components/WordListDisplay';
import TestPage from './Components/TestPage';
import {rndSentence} from './Components/TestMaker';
import {wordList} from './Assets/Vocab';
import './App.css';
import {Tabs, Tab} from  'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
  state = {
    knownWords : wordList,
    typesToShow : ['Nouns', 'Verbs', 'Adjectives'], 
    translationMode : 'fromEng', 
    userAnswer: '',
    sentences: rndSentence(wordList), 
    tabToShow: 'WordList',
    savedTexts: '',
    text: '',
    title: '',
    readerMode: 'paste',
    wordToSearchFor: '',
    searchFromStart: false,
  }

  changeToShow = (category) => {
    var ttShow = Array.from(this.state.typesToShow);
    if (ttShow.includes(category)) {
      ttShow = ttShow.filter(x => x!==category)
    } else {ttShow.push(category)}
    this.setState({typesToShow: ttShow});
  }

  switchModeHandler = () => {
    if (this.state.translationMode === 'fromEng') {
      var newMode = 'toEng'
    } else {newMode = 'fromEng'}
    this.setState({translationMode: newMode})
  }

  ChangeAnswerHandler = (event) => {
    if (this.state.translationMode === 'fromEng') {
      var ans = this.state.sentences.foreign
    } else {ans = this.state.sentences.english}
    console.log(ans, this.state.userAnswer)
    if (event.target.value.toLowerCase() === ans.toLowerCase()) {
      this.setState({sentences: rndSentence(this.state.knownWords), userAnswer:''})
    } else { this.setState({userAnswer:event.target.value}) }
  }

  saveText = (timeAndDate, title, text) => {

    var newTextObj = {
      timeAndDate: timeAndDate,
      title: title,
      text: text
    }
  
    this.saveToLocalStorage(newTextObj)
  }

  saveToLocalStorage = (textObj) => {
    let savedTexts
  
    if (localStorage.getItem('savedTexts') != null) {
      savedTexts = JSON.parse(localStorage.getItem('savedTexts'))
      savedTexts.push(textObj);
    } else {
      savedTexts = []
      savedTexts.push(textObj);
    }
    localStorage.setItem('savedTexts', JSON.stringify(savedTexts))
    this.componentWillMount()
  }

  componentWillMount = () => {
    if (localStorage.getItem('savedTexts') != null) {
      var savedTexts = JSON.parse(localStorage.getItem('savedTexts'))
      this.setState(
        {savedTexts: savedTexts}
      )
    } else {
        this.setState(
          {savedTexts: ''}
        )
    }
  }

  goToReader = (e) => {
    var textTitle = e.target.id
    var matchingTextArray = this.state.savedTexts.filter(text => text.title === textTitle)
    var matchingText = matchingTextArray[0].text
    this.setState({tabToShow: 'Reader', readerMode: 'grabbed', text: matchingText, title: textTitle})
    e.preventDefault()
  }

  updateReaderMode = (mode) => {
    this.setState(
      {readerMode: mode}
    )
  }

  updateText = (text) => {
    this.setState(
      {text: text}
    )
  }

  updateTitle = (updatedTitle) => {
    this.setState(
      {title: updatedTitle}
    )
  }
  changeSearchWord = (event) => {
    this.setState({wordToSearchFor:event.target.value})
  }

  changeStartChecked = (event) => {
    this.setState({searchFromStart:!this.state.searchFromStart})
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-header">Word Box</h1>
        <Tabs
          activeKey={this.state.tabToShow}
          onSelect={key => this.setState({tabToShow:key})}
          variant = 'pills'
          fill
        >
        <Tab eventKey='Reader' title='Analyse text'>
          <Reader knownWords={this.state.knownWords} saveText={this.saveText} mode={this.state.readerMode} updateMode={this.updateReaderMode} updateText={this.updateText} updateTitle={this.updateTitle} text={this.state.text} title={this.state.title}/>
        </Tab>
        <Tab eventKey='TextCatalogue' title='Saved Texts'>
          <TextCatalogue savedTexts={this.state.savedTexts} goToReader={this.goToReader}/>
        </Tab>
        <Tab eventKey='WordList' title='Known Words'>
          <WordListDisplay 
            words={this.state.knownWords} 
            types={this.state.typesToShow}
            changeTypes={this.changeToShow}
            searchFor={this.state.wordToSearchFor}
            changeSearch={this.changeSearchWord}
            searchFromStart={this.state.searchFromStart}
            changeCheckBox={this.changeStartChecked}
          />          
        </Tab>
        <Tab eventKey='testPage' title='Test Your knowledge'>
          <TestPage 
            words={this.state.knownWords}
            transMode={this.state.translationMode}
            switchModeClick={this.switchModeHandler}
            userAns={this.state.userAnswer}
            testQ={this.state.sentences}
            changeAns={this.ChangeAnswerHandler}
          />          
        </Tab>
        </Tabs>
      </div>
    );
  } 

}

export default App;
