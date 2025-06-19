import { googleBookService } from '../services/google-book.service.js'
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookAdd() {
    const [searchTerm, setSearchTerm] = useState('')
    const [books, setBooks] = useState([])

    useEffect(() => {
        console.log('books', books)
    }, [books])

    function onSearchGoogleAPI(ev) {
        ev.preventDefault()
        googleBookService.query(searchTerm)
            .then((data) => {
                console.log('data', data)
                setBooks(data)
            })
    }

    function onAddGoogleBook(book) {
        console.log('book on onaddgbook', book)
        bookService.save(book)
            .then(() => console.log('Book saved:', book))
            .catch(err => console.error('Failed to save book:', err))
    }

    return (
        <section className="book-add">
            <h2>Add books from Google API</h2>

            <form onSubmit={onSearchGoogleAPI}>
                <input
                    type="text" name="text" placeholder="Search for a book"
                    value={searchTerm}
                    onChange={(ev) => setSearchTerm(ev.target.value)}
                />
                <button>Search</button>
            </form>

            <ul className="add-review">
                {books.length && books.map(book => (
                    <li key={book.id}>
                        {book.title}
                        <button onClick={() => onAddGoogleBook(book)}>+</button>
                    </li>
                ))}
            </ul>
        </section>
    )
}