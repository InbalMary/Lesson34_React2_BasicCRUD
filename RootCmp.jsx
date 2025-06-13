const { useState } = React

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./Pages/About.jsx"
import { Home } from "./Pages/Home.jsx"
import { BookIndex } from "./Pages/BookIndex.jsx"

export function RootCmp() {

    const [page, setPage] = useState('books')
    // console.log('Current page:', page)

    function onSetPage(page) {
        setPage(page)
    }
    return (
        <section className="app">
            <AppHeader onSetPage={onSetPage} />

            <main>
                {page === 'home' && <Home />}
                {page === 'about' && <About />}
                {page === 'books' && <BookIndex />}
            </main>
        </section>
    )  
} 