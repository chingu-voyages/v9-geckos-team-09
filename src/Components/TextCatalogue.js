import React from 'react'
import './TextCatalogue.css'
import './global.css'

const TextCatalogue = (props) => {

let del = document.createElement("span");
	del.innerHTML = "x";
	del.setAttribute("title", "Remove item")

if (props.savedTexts !== '') {

    var textsArray = props.savedTexts.map(function(item, index){
        let textDate = item.timeAndDate.substr(9)
        let textTime = item.timeAndDate.slice(0, 8)
        return (
            <tr key={item.timeAndDate} id={item.timeAndDate}>
                <td><a href='#/' onClick={props.goToReader} id={item.title}>{item.title}</a></td>
                <td className='text-date'>{textDate}</td>
                <td className='text-time'>{textTime}</td>
                <td><span onClick={props.deleteFromCatalogue} title='Delete' className='close-button'>      &times;</span></td>
            </tr>
        )
    })
}

return (
    
    <div className='wrapper'>
    <h3>Your saved texts: </h3>
    <table className='table'>
        <tbody>
            {textsArray}
        </tbody>
    </table>
    </div>

)
}

export default TextCatalogue