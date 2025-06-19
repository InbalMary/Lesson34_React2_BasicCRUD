import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"
import { BookEdit } from "../cmps/BookEdit.jsx"

const { useState, useEffect, Fragment, useRef } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [isEditMode, setIsEditMode] = useState(false)

    const dialogRef = useRef()
    const dialogEditRef = useRef()

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    useEffect(() => {
        if (!selectedBookId) return
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

    function onCloseDialog(elDialogRef) {
        elDialogRef.current.close()
        setSelectedBookId(null)
        setIsEditMode(false)
    }

    function onUpdateBook(selectedBookId) {
        bookService.get(selectedBookId)
            .then(updatedBook => {
                setBooks(prevBooks =>
                    prevBooks.map(book =>
                        book.id === updatedBook.id ? updatedBook : book
                    )
                )
                setSelectedBookId(null)
                setIsEditMode(false)
            })
    }

    if (!books) return <div>Loading...</div>

    return (
        <section className="book-index">
            {!selectedBookId &&
                <Fragment>
                    <BookFilter
                        defaultFilter={filterBy}
                        onSetFilter={onSetFilter}
                    />
                    <BookList
                        books={books}
                        onSelectBookId={onSelectBookId}
                    />
                </Fragment>
            }
            {selectedBookId && (
                <Fragment>
                    {!isEditMode && (
                        <Fragment>
                            <BookDetails bookId={selectedBookId} />
                            <button onClick={() => setSelectedBookId(null)}>Close</button>
                            <button onClick={() => setIsEditMode(true)}>Edit</button>
                        </Fragment>
                    )}

                    {isEditMode && (
                        <Fragment>
                            <BookEdit
                                bookId={selectedBookId}
                                onUpdateBook={onUpdateBook}
                                onCanceled={() => setIsEditMode(false)}
                            />
                        </Fragment>
                    )}
                </Fragment>
            )}
        </section>
    )


}