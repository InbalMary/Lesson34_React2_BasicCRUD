
export function AppHeader({ onSetPage }) {

    const links = [
        { path: 'home' }, { path: 'about' }, { path: 'books' }
    ]
    return (
        <header className="app-header container">
            <section>
                <h1>Miss Books</h1>
                <nav className="app-nav">
                    {links.map(link => <a key={link.path}
                     onClick={() => onSetPage(link.path)}>{link.path}</a>)}
                    
                </nav>
            </section>
        </header>
    )
}