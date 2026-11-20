
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header className="header">

            <nav className="navbar">
                <Link to="/" className="logo">
                    Mech<span>Link</span>
                </Link>

                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>

                    <li><Link to="/mechanics">
                    Find a Mechanic
                    </Link></li>

                    <li><Link to="/bookings">
                    Bookings
                    </Link></li>

                    <li><Link to="/notifications">
                    Notifications
                    </Link></li>

                    <li><Link to="/dashboard">
                    Dashboard
                    </Link></li>
                </ul>

                <div className="nav-actions">
                    <Link to="/dashboard" className="login-link">Sign In</Link>
                    <Link to="/bookings" className="nav-button">Get Help</Link>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
