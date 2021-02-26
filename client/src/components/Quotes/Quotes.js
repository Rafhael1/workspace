import React, { useState, useEffect } from 'react';

import './Quotes.scss'

export default function Quotes() {

    const [quote, setQuote] = useState()
    const [quoteAuthor, setQuoteAuthor] = useState()

    const getQuotes = async() => {
       try {
            const response = await fetch(`http://localhost:5000/quotes`);
 
            const jsonData = await response.json();

            setQuote(jsonData.quote)

            setQuoteAuthor(jsonData.author)

        } catch (error) {
            console.log(error.message)
        }
    }
    
    useEffect(() => {
        getQuotes()
    }, [])

    return (
        <div>
            <p>"{quote}" - {quoteAuthor}</p>
            <button onClick={getQuotes} >Click</button>
        </div>
    )
}
