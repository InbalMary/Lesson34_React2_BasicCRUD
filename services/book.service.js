import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.subtitle) {
                const regExp = new RegExp(filterBy.subtitle, 'i')
                books = books.filter(book => regExp.test(book.subtitle))
            }
            if (filterBy.authors && typeof filterBy.authors === 'string' && filterBy.authors.trim() !== '') {
                const authorToFilter = filterBy.authors.toLowerCase()
                books = books.filter(book =>
                    book.authors.some(author => author.toLowerCase().includes(authorToFilter))
                )
            }
            if (filterBy.publishedDate) {
                books = books.filter(book => book.publishedDate === filterBy.publishedDate)
            }
            if (filterBy.description) {
                const regExp = new RegExp(filterBy.description, 'i')
                books = books.filter(book => regExp.test(book.description))
            }
            if (filterBy.pageCount) {
                books = books.filter(book => book.pageCount >= filterBy.pageCount)
            }
            if (filterBy.categories && filterBy.categories.length > 0) {
                books = books.filter(book =>
                    book.categories.some(category => filterBy.categories.includes(category))
                )
            }
            if (filterBy.language) {
                books = books.filter(book => book.language === filterBy.language)
            }
            if (filterBy.listPrice && filterBy.listPrice.amount) {
                books = books.filter(book => book.listPrice.amount <= filterBy.listPrice.amount)
            }
            if (filterBy.listPrice && filterBy.listPrice.isOnSale !== undefined) {
                books = books.filter(book => book.listPrice.isOnSale === filterBy.listPrice.isOnSale)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', amount = 0) {
    return {
        title,
        listPrice: {
            amount,
            currencyCode: 'EUR',
            isOnSale: false
        }
    }
}

function getDefaultFilter() {
    return {
        title: '',
        subtitle: '',
        authors: [],
        publishedDate: null,
        description: '',
        pageCount: 0,
        categories: [],
        thumbnail: '',
        language: '',
        listPrice: {
            amount: 0,
            currencyCode: '',
            isOnSale: false
        }
    }
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        const books = []
        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [
                    utilService.makeLorem(1)
                ],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(20),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                }
            }
            books.push(book)
        }
        console.log('books', books)
        saveToStorage(BOOK_KEY, books)
    }
}

// function _createBook(title, amount = 109) {
//     const book = getEmptyBook(title, amount)
//     book.id = makeId()
//     return book
// }