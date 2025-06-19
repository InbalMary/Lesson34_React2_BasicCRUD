import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"

const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function getPageCountInfo(pageCount) {
        if (pageCount > 500) return 'Serious Reading'
        if (pageCount > 200) return ' Descent Reading'
        return 'Light Reading'
    }

    function getDateCategory(publishedDate) {
        const curYear = (new Date()).getFullYear()
        console.log('curyear, publishedDate', curYear, publishedDate)
        if (curYear - publishedDate > 10) return 'Vintage'
        return 'New'
    }

    function getAmountClass(amount) {
        if (amount > 150) return 'red'
        if (amount < 20) return 'green'
        return ''
    }

    function onBack() {
        navigate('/book')
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
            <section className="book-authors">
                <h4>Authors</h4>
                <ul>
                    {authors.map(author => <li key={author}>{author}</li>)}
                </ul>
            </section>
            <section className="book-published-date">
                <h4>Published Date:</h4>
                <p>{publishedDate} - {dateCategory}</p>
            </section>
            <LongTxt txt={description} length={20} />
            <section className="book-page-count">
                <h4>Page Count:</h4>
                <p>{pageCount} - {pageCountInfo}</p>
            </section>
            <section className="book-categories">
                <h4>Categories</h4>
                <ul>
                    {categories.map(cat => <li key={cat}>{cat}</li>)}
                </ul>
            </section>
            <section className="book-language">
                <h4>Language:</h4>
                <p>{language}</p>
            </section>
            <section>
                <h4>Price:</h4>
                <p><span className={`book-price ${amountClass}`}>{amount}</span></p>
            </section>
            <section className="book-on-sale">
                <h4>On Sale:</h4>
                <p>{isOnSale ? 'Yes' : 'No'}</p>
            </section>
            {isOnSale ? <span className="on-sale-badge">On Sale</span> : ''}
            <button onClick={onBack}>Back</button>
            <section>
                <button ><Link to={`/book/${book.prevBookId}`}>Prev Book</Link></button>
                <button ><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
            </section>
        </section>
    )
}