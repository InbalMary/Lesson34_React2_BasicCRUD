const { useState, useEffect } = React

export function BookFilter({ defaultFilter, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...defaultFilter })

    useEffect(() => {
        console.log('filterByToEdit', filterByToEdit)
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
            case 'text':
                value = target.value.trim()
                break
        }
        if (field === 'amount' || field === 'isOnSale') {
            if (field === 'isOnSale') {
                if (value === 'all') value = null
                else value = (value === 'true')
            }
            setFilterByToEdit(prevFilter => ({
                ...prevFilter,
                listPrice: {
                    ...prevFilter.listPrice,
                    [field]: value
                }
            }))
        } else {
            setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
        }
    }

    const { title, authors, categories, listPrice } = filterByToEdit
    const { amount, isOnSale } = listPrice

    return (
        <section className="book-filter container">
            <h2>Filter Our Books</h2>

            <form>
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
                    value={authors}
                    name="authors"
                    id="authors"
                    type="text"
                />
                <label htmlFor="categories">Categories</label>
                <select
                    onChange={handleChange}
                    value={Array.isArray(categories) ? categories[0] || '' : categories || ''}
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
                <label htmlFor="amount">Max Price</label>
                <input
                    onChange={handleChange}
                    value={amount || ''}
                    name="amount"
                    id="amount"
                    type="number"
                />
                <label htmlFor="isOnSale">On Sale</label>
                <div id="isOnSale">
                    <label>
                        <input
                            type="radio"
                            name="isOnSale"
                            value="all"
                            checked={isOnSale === null}
                            onChange={handleChange}
                        />
                        All
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="isOnSale"
                            value="true"
                            checked={isOnSale === true}
                            onChange={handleChange}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="isOnSale"
                            value="false"
                            checked={isOnSale === false}
                            onChange={handleChange}
                        />
                        No
                    </label>
                </div>
            </form>
        </section>
    )
}
