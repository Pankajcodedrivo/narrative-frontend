import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.svg";
import lock from "../../../assets/images/lock.svg";
import cta1 from "../../../assets/images/cta1.png";
import cta2 from "../../../assets/images/cta2.png";
import "./Registration.scss";
import LeftPanel from "../../../components/LeftPanel/LeftPanel";
import SubHeader from "../../../components/SubHeader/SubHeader";
import SubFooter from "../../../components/SubFooter/SubFooter";
const Registration = () => {
  return (
    <div className="auth-wrapper">
        <LeftPanel title="Welcome! Let’s set up your account in a few steps." />
        <div className="right-panel">
            <div className="right-panel-wrapper">
                <div className="auth-logo mb-5"><img src={logo} alt="" /></div>
                <SubHeader title="Create Your Account" desc="Start your journey to capturing life stories in a meaningful way." />
                <form action="">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-label float">First Name*</label>
                                <input type="text" className="form-control" placeholder="Enter your name ..." />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-label float">Last Name*</label>
                                <input type="text" className="form-control" placeholder="Enter your name ..." />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label className="form-label float">Email Address*</label>
                                <input type="email" className="form-control" placeholder="Enter email address ..." />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label className="form-label float">Password*</label>
                                <div className="password">
                                    <input type="password" className="form-control" placeholder="Enter password ..." />
                                    <span className="lock"><img src={lock} alt="" /></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label className="form-label float">Confirm Password*</label>
                                <div className="password">
                                    <input type="password" className="form-control" placeholder="Enter password ..." />
                                    <span className="lock"><img src={lock} alt="" /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <label className="checkbox-container mb-32">I agree to the <Link to="/">Terms & Conditions</Link> and <Link to="/">Privacy Policy</Link>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                    </label>
                    <div className="form-btn">
                        <button type="submit" className="btn btn-secondary mb-3">Sign Up</button>
                    </div>
                    <p className="clr-2 mb-3">OR</p>
                    <div className="cta-btn">
                        <button type="button"><img src={cta1} alt="" /></button>
                        <button type="button"><img src={cta2} alt="" /></button>
                    </div>
                    <p className="clr-2">Already have an account? <Link to="/login">Log in</Link></p>
                    <SubFooter />
                </form>
            </div>
        </div>
    </div>
  );
};

export default Registration;