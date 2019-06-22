import React from 'react'

class Grabbed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        const knownWords = ['Lorem', 'ipsum', 'fugiat', 'dolore', 'ullamco']

        const divStyle = {
            fontSize: 20,
            marginBottom: '20px',
            margin: 'auto',
            display: 'block',
            width: '60%'
        }

        const knownWordStyle = {
            color: 'green'
        }

        const unknownWordStyle = {
            color: 'red'
        }

        let wordArray = this.props.text.split(' ')
        let newWordArray = wordArray.map(function (word, index) {

            if (knownWords.includes(word)) {

            return (
                <span key={word+index} style = {knownWordStyle}>{word} </span>
            )

        } else {
            return (
                <span key={word+index} style={unknownWordStyle}>{word} </span>
            )
        }
        }
        )

        return (
            <div id='grabbedText' style = {divStyle}>{newWordArray}</div>
        )

    }

}


export default Grabbed
