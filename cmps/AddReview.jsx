import { bookService } from '../services/book.service.js'

const { useState } = React

export function AddReview({ bookId, onAddReview }) {
    const [review, setReview] = useState(bookService.getEmptyRev())

    function handleChange({ target }) {
        const { name, value } = target
        setReview(prev => ({ ...prev, [name]: name === 'rating' ? +value : value }))
    }

    function onSubmitAddReview(ev) {
        ev.preventDefault()
        const reviewToAdd = { ...review }
        bookService.addReview(bookId, review)
            .then(() => {
                setReview(bookService.getEmptyRev())
                onAddReview(reviewToAdd)
            })
            .catch(err => {
                console.error('Failed to add review:', err)
            })
    }

    const { fullName, rating, readAt, reviewText  } = review
    return (
    <section className="add-review">
        {/* <h1>Add Review</h1> */}
        <form onSubmit={onSubmitAddReview}>
            <label htmlFor="fullname">Full name: </label>
            <input required onChange={handleChange} value={fullName} type="text" name="fullName" id="fullname" />

            <label htmlFor="rating">Rating: </label>
            <select id="rating" name="rating" onChange={handleChange} value={rating}>
                <option value="">Select Rating</option>
                {[1, 2, 3, 4, 5].map(val => (
                    <option key={val} value={val}>
                        {'⭐'.repeat(val)}
                    </option>
                ))}
            </select>

            <label htmlFor="readAt">Read At: </label>
            <input type="date" id="readAt" name="readAt"
                value={readAt} onChange={handleChange}
            />

            <label htmlFor="reviewText">Your Review: </label>
                <textarea id="reviewText" name="reviewText"
                    value={reviewText || ''} onChange={handleChange}
                    placeholder="Share your review here...)"
                    rows="4"
                />

            <button>Save</button>
        </form>

    </section>
    )
}