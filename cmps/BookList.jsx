import { BookPreview } from "../cmps/BookPreview.jsx";

export function BookList({ books, onSelectBookId }) {

    return (
        <ul className="book-list container">
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onSelectBookId(book.id)}>
                            Details
                        </button>
                    </section>
                </li>
            )}

        </ul>
    )

}