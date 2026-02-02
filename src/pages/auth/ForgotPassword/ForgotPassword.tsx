import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.svg";
import "./ForgotPassword.scss";
import LeftPanel from "../../../components/LeftPanel/LeftPanel";
import SubHeader from "../../../components/SubHeader/SubHeader";
import SubFooter from "../../../components/SubFooter/SubFooter";
const ForgotPassword = () => {
  return (
    <div className="auth-wrapper">
        <LeftPanel title="Don’t worry, we’ll help you reset your password." />
        <div className="right-panel">
            <div className="right-panel-wrapper">
                <div className="auth-logo mb-5"><img src={logo} alt="" /></div>
                <SubHeader title="Reset Your Password" desc="Enter the email address associated with your account." />
                <form action="">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group mb-32">
                                <label className="form-label float">Email Address*</label>
                                <input type="email" className="form-control" placeholder="Enter email address ..." />
                            </div>
                        </div>
                    </div>
                    <div className="form-btn">
                        <button type="submit" className="btn btn-secondary">Send OTP</button>
                        <Link to="/login" className="btn btn-outline">Back to Login</Link>
                    </div>
                </form>
            </div>
            <SubFooter />
        </div>
    </div>
  );
};

export default ForgotPassword;