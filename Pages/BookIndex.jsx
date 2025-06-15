import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"
import { BookEdit } from "../cmps/BookEdit.jsx"

const { useState, useEffect, useRef } = React

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
        dialogRef.current.showModal()
    }, [selectedBookId])
    
    useEffect(() => {
        if (isEditMode && selectedBookId) {
            dialogEditRef.current.showModal()
        }
    }, [isEditMode])

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
            <BookFilter
                defaultFilter={filterBy}
                onSetFilter={onSetFilter}
            />
            <BookList
                books={books}
                onSelectBookId={onSelectBookId}
            />
            {selectedBookId && <section>
                {
                    !isEditMode && <dialog ref={dialogRef} >
                    <BookDetails
                        bookId={selectedBookId}
                    // onBack={() => setSelectedBookId(null)}
                    />
                    <button onClick={() => onCloseDialog(dialogRef)}>Close</button>
                    <button onClick={() => {
                        setIsEditMode(true)
                        dialogRef.current.close()}}>Edit</button>
                </dialog>}
                {
                    isEditMode && <dialog ref={dialogEditRef} >
                    <BookEdit bookId={selectedBookId}
                        onUpdateBook={onUpdateBook} onCanceled={() =>onCloseDialog(dialogEditRef)}
                        />
                        <button onClick={() =>onCloseDialog(dialogEditRef)}>Close</button>
                        </dialog>
                }
            </section>}
        </section>
    )


}