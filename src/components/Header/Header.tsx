import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import "./header.scss";

const Header = () => {
  return (
    <header className="header">
        <div className="container">
            <div className="header-otr">
                <Link to="/" className="logo"><img src={logo} alt="" /></Link>
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
                <button type="button" className="btn btn-outline">Login/Register</button>
            </div>
        </div>
    </header>
  );
};

export default Header;