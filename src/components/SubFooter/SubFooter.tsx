import { Link } from "react-router-dom";
import "./SubFooter.scss";

const SubFooter = () => {
    return (
        <div className="sub-footer">
            <p><span>Narrative ARC</span> © 2025.  <Link to="/">Privacy Policy</Link> • <Link to="/">Terms & Policy</Link> • <Link to="/">Disclaimer</Link></p>
            <p>This site is protected by reCAPTCHA and the Google</p>
        </div>
    );
};

export default SubFooter;