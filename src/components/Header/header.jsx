import React from "react";
import './header.css';
import { Link } from 'react-router-dom';
import scan from '../../assets/images/scan-logo-header.svg';

function Header() {

    return (
        <header className="header">
            <Link to= "/"><img src= { scan } alt="" /></Link>
            <nav className="header-nav">
            <Link className="header-nav__link" to= "/">Главная</Link>
            <Link className="header-nav__link" to= "/error">Тарифы</Link>
            <Link className="header-nav__link" to= "/error">FAQ</Link>
            </nav>
        </header>
    )
}

export default Header;