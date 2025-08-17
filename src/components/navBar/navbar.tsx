import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/character">Character</Link>
                </li>
                <li>
                    <Link to="/bestiary">Bestiary</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;