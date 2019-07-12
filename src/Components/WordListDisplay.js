import React from 'react';
import WordListCheckbox from './WordListCheckbox';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './Wordlist.css';
import './global.css'

const WordListDisplay = (props) =>  {
    var wordList = ['the']; 
    // you can add a random word in above to test word modal on unknown words in list, eg: 'surprise!'];
    if (props.types.includes('Nouns')) {
        for (var i in props.words.nouns) {
            wordList.push(props.words.nouns[i].english)
        }
    }
    if (props.types.includes('Verbs')) {
        for (i in props.words.verbs) {
            wordList.push(props.words.verbs[i].english)
        }
    }
    if (props.types.includes('Adjectives')) {
        for (i in props.words.adjectives) {
            wordList.push(props.words.adjectives[i].english)
        }
    }
    wordList = wordList.filter(x=>props.searchFromStart?
        x.toLowerCase().indexOf(props.searchFor.toLowerCase())===0 
        : x.toLowerCase().includes(props.searchFor.toLowerCase()))
       .sort().map(x => <Button key={x} variant='link' onClick={()=>props.wordClick(x)} >{x}</Button>);

    if (wordList.length === 0) {
        var dictionaryLink = 'https://en.bab.la/dictionary/english-czech/'+props.searchFor;
        var dictionaryJSX = <p>Try a <a 
            href={dictionaryLink} target="_blank" rel="noopener noreferrer" >dictionary</a></p>; 
    } 
    
    return (
        <div>
            <div className='wrapper'>
            <Container>
                <Row>
                  <Col>
                     <WordListCheckbox 
                       selection={props.types} 
                       click={props.changeTypes}
                       changeSearch={props.changeSearch}
                       changeCheckBox={props.changeCheckBox}
                     />
                  </Col>
                  <Col>
                     <h2>Words I know</h2>
                     <div id="wordList"><p>{wordList}</p></div>
                     { dictionaryJSX }
                     <p>Click on a word to see its {props.words.foreignLang} translation</p>
                     <p>Or I can test your ability to translate simple random sentences on the test page. <br />
                        (Click the tab above)</p>
                  </Col>
                </Row>
            </Container>
            </div>
        </div>
    )
}

export default WordListDisplay;