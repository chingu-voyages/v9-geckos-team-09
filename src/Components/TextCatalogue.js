import React from 'react'
import './TextCatalogue.css'

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
                <th><a href='#/' onClick={props.goToReader} id={item.title}>{item.title}</a></th>
                <th className='text-date'>{textDate}</th>
                <th className='text-time'>{textTime}</th>
                <th><span onClick={props.deleteFromCatalogue} title='Delete' className='close-button'>      &times;</span></th>
            </tr>
        )
    })
}

return (
    
    <div className='catalogue-wrapper'>
    <table className='table'>
        <thead>
            <tr>
                <th scope="col">Title</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
            </tr>
        </thead>
        <tbody>
            {textsArray}
        </tbody>
    </table>
    </div>

)
}

export default TextCatalogue