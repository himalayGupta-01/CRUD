import React from 'react'
import {NavLink,useHistory} from "react-router-dom";
import LoginCall from "../Services/LoginCall"

const Navbar = () => {

    const history=useHistory();
    const logout=(e)=>{
        e.preventDefault();
        LoginCall.logout();
        history.push("/login");
        window.reload()

    }
    return (
        <>
            <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand text-light" to="/">Home</NavLink>
                    <button className="bg-light navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>                            */}
                        </ul>
                        <form className="d-flex">
                            <button onClick={logout} className="btn btn-outline-primary">Logout</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
