import { Link } from "react-router-dom";
import logo from "../../assets/images/footer-logo.svg"
import instagram from "../../assets/images/instagram.svg"
import twiter from "../../assets/images/twiter.svg"
import linkedin from "../../assets/images/linkedin.svg"
import tiktok from "../../assets/images/ticktok.svg"
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="logo-area">
              <img src={logo} alt="" />
            </div>
          </div>
          <div className="col-md-4">
            <h3 className="ft-hdr">Quick Links</h3>
            <ul className="ft-list">
              <li><Link to="/">How It Works</Link></li>
              <li><Link to="/">Features</Link></li>
              <li><Link to="/">FAQ’s</Link></li>
              <li><Link to="/">Blog</Link></li>
              <li><Link to="/">Help Center</Link></li>
              <li><Link to="/">Contact</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h3 className="ft-hdr">Start your story today!</h3>
            <p className="para">Your memories deserve more than storage - they deserve storytelling.</p>
            <button type="button" className="btn btn-outline-secondary">Start Interview</button>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="copiright">
            <p><span>Narrative ARC</span> © 2026.  <Link to="/">Privacy Policy</Link> | <Link to="/">Terms & Policy</Link> | <Link to="/">Disclaimer</Link> </p>
            <p>This site is protected by reCAPTCHA and the Google</p>
          </div>
          <ul className="social-icon">
              <li><Link to="/"><img src={instagram} alt="" /></Link></li>
              <li><Link to="/"><img src={twiter} alt="" /></Link></li>
              <li><Link to="/"><img src={linkedin} alt="" /></Link></li>
              <li><Link to="/"><img src={tiktok} alt="" /></Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;