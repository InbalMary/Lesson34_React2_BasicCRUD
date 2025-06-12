import { bookService } from "../services/book.service.js"

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

    if (!book) return <div>Loading...</div>
    const { title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, language, listPrice } = book
    const { amount, currencyCode, isOnSale } = listPrice
    return (
        <section className="book-details container">
            <img src={thumbnail} alt={title} />
            <h1 className="book-title">{title}</h1>
            <h2 className="book-subtitle">{subtitle}</h2>
            <p className="book-authors">Authors: {authors.join(', ')}</p>
            <p className="book-published-date">Published Date: {publishedDate}</p>
            <p className="book-description">Description: {description}</p>
            <p className="book-page-count">Page Count: {pageCount}</p>
            <p className="book-categories">Categories: {categories.join(', ')}</p>
            <p className="book-language">Language: {language}</p>
            <p className="book-price">Price: {amount} {currencyCode}</p>
            <p className="book-on-sale">On Sale: {isOnSale ? 'Yes' : 'No'}</p>

            <button onClick={onBack}>Back</button>
        </section>
    )
}