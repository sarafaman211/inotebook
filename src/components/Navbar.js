import React from 'react'
import { Link, useLocation, useHistory} from "react-router-dom";

const Navbar = (props)=>{
    let location = useLocation();
    let history = useHistory();

    const handleLogout = ()=>{
        localStorage.removeItem('token')
        history.push('/Login')
    } 
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/"><span className="text-primary">{props.heading}</span> <i className="fas fa-book-open"></i></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/"? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about"? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex">
                        <Link className="btn btn-primary mx-2" to="/Login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-2" to="/SignUp" role="button">SignUp</Link>
                        </form>: <button className="btn btn-primary" onClick={handleLogout}>Logout</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
