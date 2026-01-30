import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import "./header.scss";

const Header = () => {
    const [open, setOpen] = useState(false);
    return (
        <header className="header">
            <div className="container">
                <div className="header-otr">
                    <Link to="/" className="logo"><img src={logo} alt="" /></Link>
                    <div className={`mobile-menu ${open ? "show" : ""}`}>
                        <div className="navbar">
                            <ul>
                                <li><Link to="/">How It Works</Link></li>
                                <li><Link to="/">Features</Link></li>
                                <li><Link to="/">FAQ’s</Link></li>
                                <li><Link to="/">Blog</Link></li>
                                <li><Link to="/">Help Center</Link></li>
                                <li><Link to="/">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                    <button type="button" className="btn btn-outline">Login/Register</button>
                    <div
                        className={`hamburger ${open ? "active" : ""}`}
                        onClick={() => setOpen(!open)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;