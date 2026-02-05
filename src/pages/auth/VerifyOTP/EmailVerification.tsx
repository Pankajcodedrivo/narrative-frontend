import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.svg";
import "./EmailVerification.scss";
import LeftPanel from "../../../components/LeftPanel/LeftPanel";
import SubHeader from "../../../components/SubHeader/SubHeader";
import SubFooter from "../../../components/SubFooter/SubFooter";
const EmailVerification = () => {
  return (
    <div className="auth-wrapper">
        <LeftPanel title="Sign in to manage your dashboard and activities." />
        <div className="right-panel">
            <div className="right-panel-wrapper">
                <div className="auth-logo mb-5"><img src={logo} alt="" /></div>
                <SubHeader title="Verify Your Email." desc="We’ve sent an OTP to your registered email. Open your inbox, find the verification message, and enter the OTP." />
                <form action="">
                    <div className="mb-3">
                        <div className="otp-box">
                            <input type="text" placeholder="X" maxLength={1} />
                            <input type="text" placeholder="X" maxLength={1} />
                            <input type="text" placeholder="X" maxLength={1} />
                            <input type="text" placeholder="X" maxLength={1} />
                        </div>
                    </div>
                    <p className="clr-2 mb-32">Didn’t receive the email? <Link to="/">  Resend Verification</Link></p>
                    <div className="form-btn">
                        <button type="submit" className="btn btn-secondary">Verify Email</button>
                        <Link to="/login" className="btn btn-outline">Back to Login</Link>
                    </div>
                </form>
            </div>
        </div>
        <SubFooter />
    </div>
  );
};

export default EmailVerification;