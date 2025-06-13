import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"

const { useState, useEffect, useRef } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    const dialogRef = useRef()

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    useEffect(() => {
        if (!selectedBookId) return
        dialogRef.current.showModal()
    }, [selectedBookId])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => console.log('err:', err))
    }

    function onSetFilter(filterBy) {
        console.log('filterBy', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    function onCloseDialog() {
        dialogRef.current.close()
        setSelectedBookId(null)
    }

    if (!books) return <div>Loading...</div>

    return (
        <section className="book-index">
            <BookFilter
                defaultFilter={filterBy}
                onSetFilter={onSetFilter}
            />
            <BookList
                books={books}
                onSelectBookId={onSelectBookId}
            />
            {selectedBookId &&
                <dialog ref={dialogRef} >
                    <BookDetails
                        bookId={selectedBookId}
                    // onBack={() => setSelectedBookId(null)}
                    />
                    <button onClick={onCloseDialog}>
                        Close
                    </button>
                </dialog>
            }
        </section>
    )


}