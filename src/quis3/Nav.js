import React from "react";
import {
    Link
} from "react-router-dom";
import logo from './public/img/logo.png'
import "./public/css/style.css"

const Nav = () => {
    return(
        <header>
            <nav>
                <img id="logo" src={logo} width="200px" />
                <ul>
                    <li>
                        <Link to="/"> Home </Link>
                    </li>
                    <li>
                        <Link to="/about"> Home </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Nav