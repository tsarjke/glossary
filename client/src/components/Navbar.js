import React, {useContext} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const Navbar = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const logoutHandler = (event) => {
        event.preventDefault();
        auth.logout();
        navigate('/');
    };
    return (
        <nav>
            <div className="nav-wrapper blue darken-1">
                <span className="brand-logo">Логотип</span>
                <ul id="nav-mobile" className="right hide-on">
                    <li><NavLink to='/create'>Создать</NavLink></li>
                    <li><NavLink to='/glossary'>Глоссарий</NavLink></li>
                    <li><a href='/' onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;