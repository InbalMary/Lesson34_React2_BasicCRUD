import { bookService } from "../services/book.service.js"
const { useState, useEffect } = React

export function BookEdit({ bookId, onUpdateBook, onCanceled }) {
    const [bookToEdit, setBookToEdit] = useState(null)

    useEffect(() => {
        if (!bookId) {
            setBookToEdit(bookService.getEmptyBook())
        } else {
            bookService.get(bookId)
                .then(book => setBookToEdit({ ...book }))
                .catch(err => {
                    console.error('Failed to load book:', err)
                })
        }
    }, [bookId])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break
            case 'checkbox':
                value = target.checked
                break
        }

        setBookToEdit(prev => {
            const updated = { ...prev }

            if (field === 'amount' || field === 'isOnSale') {
                updated.listPrice = {
                    ...updated.listPrice,
                    [field]: value
                }
            } else if (field === 'authors') {
                updated.authors = value.split(',').map(str => str.trim())
            } else if (field === 'categories') {
                updated.categories = [value]
            } else {
                updated[field] = value
            }

            return updated
        })
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(savedBook => {
                if (onUpdateBook) onUpdateBook(savedBook.id)
            })
            .catch(err => {
                console.error('Cannot save book:', err)
            })
    }

    if (!bookToEdit) return <div>Loading...</div>

    const { title, authors = '', categories = '', listPrice = {} } = bookToEdit
    const { amount = '' } = listPrice

    return (
        <section className="book-edit container">
            <h2>Edit Book</h2>

            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title</label>
                <input
                    onChange={handleChange}
                    value={title}
                    name="title"
                    id="title"
                    type="text"
                />

                <label htmlFor="authors">Authors</label>
                <input
                    onChange={handleChange}
                    value={Array.isArray(authors) ? authors.join(', ') : authors}
                    name="authors"
                    id="authors"
                    type="text"
                />

                <label htmlFor="categories">Categories</label>
                <select
                    onChange={handleChange}
                    value={Array.isArray(categories) ? categories[0] || '' : categories}
                    name="categories"
                    id="categories"
                >
                    <option value="">Select Category</option>
                    <option value="Love">Love</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Poetry">Poetry</option>
                    <option value="Computers">Computers</option>
                    <option value="Religion">Religion</option>
                </select>

                <label htmlFor="amount">Price</label>
                <input
                    onChange={handleChange}
                    value={amount}
                    name="amount"
                    id="amount"
                    type="number"
                />

                <button type="submit">Save</button>
                <button type="button" onClick={onCanceled}>Cancel</button>
            </form>
        </section>
    )
}
