import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.svg";
import lock from "../../../assets/images/lock.svg";
import cta1 from "../../../assets/images/cta1.png";
import cta2 from "../../../assets/images/cta2.png";
import "./Login.scss";
import LeftPanel from "../../../components/LeftPanel/LeftPanel";
import SubHeader from "../../../components/SubHeader/SubHeader";
import SubFooter from "../../../components/SubFooter/SubFooter";
const Login = () => {
  return (
    <div className="auth-wrapper">
        <LeftPanel title="Sign in to manage your dashboard and activities." />
        <div className="right-panel">
            <div className="right-panel-wrapper">
                <div className="auth-logo mb-5"><img src={logo} alt="" /></div>
                <SubHeader title="Welcome Back!" desc="Continue creating and preserving your cherished stories." />
                <form action="">
                    <div className="row">
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
                    </div>
                    <div className="form-btm">
                        <label className="checkbox-container mb-0">Remember Me
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                        </label>
                        <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
                    </div>
                    <div className="form-btn">
                        <button type="submit" className="btn btn-secondary mb-3">Log In</button>
                    </div>
                    <p className="clr-2 mb-3">OR</p>
                    <div className="cta-btn">
                        <button type="button"><img src={cta1} alt="" /></button>
                        <button type="button"><img src={cta2} alt="" /></button>
                    </div>
                    <p className="clr-2">Don’t have an account? <Link to="/registration"> Sign Up</Link></p>
                </form>
            </div>
        </div>
        <SubFooter />
    </div>
  );
};

export default Login;