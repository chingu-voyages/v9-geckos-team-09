import React from 'react';
import Reader from './Components/Reader';
import TextCatalogue from './Components/TextCatalogue'
import WordListDisplay from './Components/WordListDisplay';
import TestPage from './Components/TestPage';
import {rndSentence} from './Components/TestMaker';
import WordModal from './Components/WordModal';
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
    showAnswerToast: false,
    correctAnswerCount: 0,
    sentences: rndSentence(wordList), 
    tabToShow: 'testPage',
    savedTexts: '',
    text: '',
    title: '',
    readerMode: 'paste',
    wordToSearchFor: '',
    searchFromStart: false,
    showWordModal: false, 
    modalWord: 'the'
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
    
    if (event.target.value.toLowerCase() === ans.toLowerCase()) {
      this.setState({
        sentences: rndSentence(this.state.knownWords), 
        userAnswer:'',
        showAnswerToast: true,
        correctAnswerCount: this.state.correctAnswerCount+1
      })
    } else { this.setState({userAnswer:event.target.value}) }
  }

  closeToast = () => {
    this.setState({showAnswerToast: false})
  }


  changeSearchWord = (event) => {
    this.setState({wordToSearchFor:event.target.value})
  }

  wordClicked = (word) => this.setState({modalWord: word, showWordModal:true});

  modalClose = () => this.setState({showWordModal:false});

  saveText = (timeAndDate, title, text) => {

    var newTextObj = {
      timeAndDate: timeAndDate,
      title: title,
      text: text
    }
  
    this.saveToLocalStorage(newTextObj)
  }

  changeStartChecked = (event) => {
    this.setState({searchFromStart:!this.state.searchFromStart})
  }

  //methods related to reader and text catalogue are below (in alphabetical order)

  clearStateTextInfo = () => {
    this.setState(
      {title: '', text: ''}
    )
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

  deleteFromCatalogue = (e) => {
    let textId = e.target.parentElement.parentElement.id
    let savedTexts = JSON.parse(localStorage.getItem('savedTexts'))
    for (let i = 0; i < savedTexts.length; i++) {
      if (savedTexts[i].timeAndDate === textId) {
        savedTexts.splice(i, 1)
      }
      localStorage.setItem('savedTexts', JSON.stringify(savedTexts))
      this.componentWillMount()
    }
  }

  deleteText = () => {

  let textTitle = this.state.title
  let savedTexts = JSON.parse(localStorage.getItem('savedTexts'))

  for (let i = 0; i < savedTexts.length; i++) {
    if (savedTexts[i].title === textTitle) {
      savedTexts.splice(i, 1)
    }
    localStorage.setItem('savedTexts', JSON.stringify(savedTexts))
    this.componentWillMount()
    this.clearStateTextInfo()
    this.setState(
      {readerMode: 'paste', tabToShow: 'TextCatalogue'}
    )
  }
  }

goToReader = (e) => {
  var textTitle = e.target.id
  var matchingTextArray = this.state.savedTexts.filter(text => text.title === textTitle)
  var matchingText = matchingTextArray[0].text
  this.setState({tabToShow: 'Reader', readerMode: 'read', text: matchingText, title: textTitle})
  e.preventDefault()
}

saveEditedText = (editedTitle, editedText) => {
  var savedTexts = JSON.parse(localStorage.getItem('savedTexts'))
  for (let i = 0; i < savedTexts.length; i++) {
    if (savedTexts[i].title === this.state.title) {
      savedTexts[i].title = editedTitle
      savedTexts[i].text = editedText
      localStorage.setItem('savedTexts', JSON.stringify(savedTexts))
      this.componentWillMount()
      this.updateTitle(savedTexts[i].title)
      this.updateText(savedTexts[i].text)
      break
    } 
  }
  
}

//why does this method not work if I pass App's state values (title & text) rather than the same as vars from Reader?
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

updateTitle = (title) => {
  this.setState(
    {title: title}
    )
  }

render() {
  return (
    <div className="App">
      <div className='header'>
        <h1 className="App-header">Word Box</h1>
      </div>
      <Tabs
        activeKey={this.state.tabToShow}
        onSelect={key => this.setState({tabToShow:key})}
        variant = 'pills'
        className='tabs'
        fill
        >
        <Tab eventKey='Reader' title='New text'>
          <Reader 
            knownWords={this.state.knownWords} 
            saveText={this.saveText} 
            mode={this.state.readerMode} 
            updateMode={this.updateReaderMode} 
            updateText={this.updateText} 
            updateTitle={this.updateTitle} 
            text={this.state.text} 
            title={this.state.title} 
            saveEditedText={this.saveEditedText} 
            clearStateTextInfo={this.clearStateTextInfo} 
            deleteText={this.deleteText} />
        </Tab>
        <Tab eventKey='TextCatalogue' title='My Texts'>
          <TextCatalogue savedTexts={this.state.savedTexts} goToReader={this.goToReader} deleteFromCatalogue={this.deleteFromCatalogue}/>
        </Tab>
        <Tab eventKey='WordList' title='My Words'>
          <WordListDisplay 
            words={this.state.knownWords} 
            types={this.state.typesToShow}
            changeTypes={this.changeToShow}
            searchFor={this.state.wordToSearchFor}
            changeSearch={this.changeSearchWord}
            searchFromStart={this.state.searchFromStart}
            changeCheckBox={this.changeStartChecked}

            wordClick={this.wordClicked}
          />          

        </Tab>
        <Tab eventKey='testPage' title='Test'>
          <TestPage 
            language={this.state.knownWords.foreignLang}
            transMode={this.state.translationMode}
            switchModeClick={this.switchModeHandler}
            userAns={this.state.userAnswer}
            testQ={this.state.sentences}
            changeAns={this.ChangeAnswerHandler}
            showAnswerToast={this.state.showAnswerToast}
            correctAnswerCount={this.state.correctAnswerCount}
            closeToast={this.closeToast}
            />          
        </Tab>
        </Tabs>
        <WordModal 
          show={this.state.showWordModal}
          onHide={this.modalClose}
          word={this.state.modalWord}
          wList={this.state.knownWords} />
      </div>
    );
  } 
}

export default App;
