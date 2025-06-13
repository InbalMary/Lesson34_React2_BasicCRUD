import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function  getPageCountInfo(pageCount) {
        if (pageCount > 500) return 'Serious Reading'
        if (pageCount > 200) return ' Descent Reading'
        return 'Light Reading'
    }

    function getDateCategory(publishedDate) {
        const curYear = (new Date()).getFullYear()
        console.log('curyear, publishedDate', curYear, publishedDate)
        if(curYear - publishedDate > 10) return 'Vintage'
        return 'New'
    }

    function getAmountClass(amount) {
        if (amount > 150) return 'red'
        if (amount < 20) return 'green'
        return ''
    }

    if (!book) return <div>Loading...</div>
    const { title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, language, listPrice } = book
    const { amount, currencyCode, isOnSale } = listPrice

    const pageCountInfo = getPageCountInfo(pageCount)
    const dateCategory = getDateCategory(publishedDate)
    const amountClass = getAmountClass(amount)

    return (
        <section className="book-details container">
            <img src={thumbnail} alt={title} />
            <h1 className="book-title">{title}</h1>
            <h2 className="book-subtitle">{subtitle}</h2>
            <p className="book-authors">Authors: {authors.join(', ')}</p>
            <p className="book-published-date">Published Date: {publishedDate} - {dateCategory}</p>
            <LongTxt txt={description} length={20} />
            {/* <p className="book-description">Description: {description}</p> */}
            <p className="book-page-count">Page Count: {pageCount} - {pageCountInfo}</p>
            <p className="book-categories">Categories: {categories.join(', ')}</p>
            <p className="book-language">Language: {language}</p>
            <p className={`book-price ${amountClass}`}>Price: {amount} {currencyCode}</p>
            <p className="book-on-sale">On Sale: {isOnSale ? 'Yes' : 'No'}</p>
            {isOnSale ? <span className="on-sale-badge">On Sale</span> : ''}
            {/* <button onClick={onBack}>Back</button> */}
        </section>
    )
}