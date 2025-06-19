import { BookPreview } from "./BookPreview.jsx";

const { Link } = ReactRouterDOM

export function BookList({ books, onSelectBookId }) {

    return (
        <ul className="book-list container">
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <Link to={`/book/${book.id}`}>
                            <button onClick={() => onSelectBookId(book.id)}>
                                Details
                            </button>
                        </Link>
                    </section>
                </li>
            )}

        </ul>
    )

}