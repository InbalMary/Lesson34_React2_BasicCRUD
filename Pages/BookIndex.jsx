
import { bookService } from "../services/book.service.js"


const { useState, useEffect, Fragment } = React

export function BookIndex() {
    
    const [books, setBooks] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
            .then(setBooks)
            .catch(err => console.log('err:', err))
    }


    if (!books) return <div>Loading...</div>

    return (
        <section className="book-index">
            {books.map(book =>
                <p key={book.id}>{book.title}</p>
            )}

        </section>
    )


}