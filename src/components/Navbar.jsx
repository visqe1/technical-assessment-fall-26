import './Navbar.css'

function Navbar() {
    return (
        <nav>
            <div className="nav-logo">
                <div className="logo-sq">SF</div>
                <span className="nav-title"><span className="red">Scuderia</span> Ferrari</span>
            </div>
            <div className="nav-links">
                <a href="#overview">Overview</a>
                <a href="#results">Race Results</a>
                <a href="#charts">Analytics</a>
            </div>
        </nav>
    )
}

export default Navbar