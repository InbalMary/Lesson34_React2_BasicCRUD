const { useState } = React

import { AppHeader } from "./cmps/AppHeader.jsx"
import { NotFound } from "./cmps/NotFound.jsx"
import { About } from "./Pages/About.jsx"
import { Home } from "./Pages/Home.jsx"
import { BookIndex } from "./Pages/BookIndex.jsx"
import { BookDetails } from "./Pages/BookDetails.jsx"
import { BookEdit } from "./cmps/BookEdit.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { BookAdd } from "./cmps/BookAdd.jsx"
import { AboutTeam } from "./cmps/AboutTeam.jsx"
import { AboutGoal } from "./cmps/AboutGoal.jsx"
import { MemberPage } from "./cmps/MemberPage.jsx"
import { BookChart } from "./cmps/BookChart.jsx"

const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

export function RootCmp() {

    const [page, setPage] = useState('books')
    // console.log('Current page:', page)

    function onSetPage(page) {
        setPage(page)
    }
    return (
        <Router>
            <section className="app">
                <AppHeader onSetPage={onSetPage} currentPage={page} />

                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} >
                            <Route path="team" element={<AboutTeam />} >
                                <Route path=":memberName" element={<MemberPage />} />
                            </Route>
                            <Route path="goal" element={<AboutGoal />} />
                        </Route>


                        <Route path="/book" element={<BookIndex />} />

                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="/book/edit" element={<BookEdit />} />
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />
                        <Route path="/book/add" element={<BookAdd />} />
                        <Route path="/book/chart" element={<BookChart />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>

                </main>
                <UserMsg />
            </section>
        </Router>
    )
} 