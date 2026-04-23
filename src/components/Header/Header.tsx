import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import "./header.scss";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

  const handleScroll = () => {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.scrollY;

    let currentSection = "";

    sections.forEach((section) => {
      const el = section as HTMLElement;
      const sectionTop = el.offsetTop - 130; // header height adjust

      // ✅ pick LAST section that passed the top
      if (scrollY >= sectionTop) {
        currentSection = el.id;
      }
    });

    setActiveSection(currentSection);
  };

  window.addEventListener("scroll", handleScroll);

  handleScroll(); // run once

  return () => window.removeEventListener("scroll", handleScroll);
}, [location.pathname]);

  return (
    <header className="header">
      <div className="container">
        <div className="header-otr">
          <Link to="/" className="logo">
            <img src={logo} alt="" />
          </Link>
          <div className={`mobile-menu ${open ? "show" : ""}`}>
          <div className="navbar">
          <ul>
         <li>
          <Link
            to="/#how-it-works"
            className={activeSection === "how-it-works" ? "active" : ""}
            onClick={() => setActiveSection("how-it-works")}
          >
            How It Works
          </Link>
        </li>

        <li>
          <Link
            to="/#features"
            className={activeSection === "features" ? "active" : ""}
            onClick={() => setActiveSection("features")}
          >
            Features
          </Link>
        </li>

          
            <li>
              <Link to="/faq" className={location.pathname === "/faq" ? "active" : ""}>
                FAQ’s
              </Link>
            </li>

            <li>
              <Link to="/blog" className={location.pathname === "/blog" ? "active" : ""}>
                Blog
              </Link>
            </li>

            <li>
              <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>
                Contact
              </Link>
            </li>
              </ul>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate("/login")}
          >
            Login/Register
          </button>
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
