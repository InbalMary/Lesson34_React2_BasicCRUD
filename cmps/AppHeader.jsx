
export function AppHeader({ onSetPage, currentPage }) {

    const links = [
        { path: 'home' }, { path: 'about' }, { path: 'books' }
    ]

    function getLinkClass(linkPath){
        return linkPath === currentPage ? 'active' : ''
    }

    return (
        <header className="app-header container">
            <section>
                <h1>Miss Books</h1>
                <nav className="app-nav">
                    {links.map(link => <a className={getLinkClass(link.path)} key={link.path}
                     onClick={() => onSetPage(link.path)}>{link.path}</a>)}
                    
                </nav>
            </section>
        </header>
    )
}