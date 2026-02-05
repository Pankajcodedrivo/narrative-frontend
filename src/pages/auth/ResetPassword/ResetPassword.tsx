import logo from "../../../assets/images/logo.svg";
import lock from "../../../assets/images/lock.svg";
import "./ResetPassword.scss";
import LeftPanel from "../../../components/LeftPanel/LeftPanel";
import SubHeader from "../../../components/SubHeader/SubHeader";
import SubFooter from "../../../components/SubFooter/SubFooter";
const ResetPassword = () => {
  return (
    <div className="auth-wrapper">
        <LeftPanel title="You’re almost done. Set your new password." />
        <div className="right-panel">
            <div className="right-panel-wrapper">
                <div className="auth-logo mb-5"><img src={logo} alt="" /></div>
                <SubHeader title="Create a New Password." desc="Create a secure password to protect your account." />
                <form action="">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label className="form-label float">New Password*</label>
                                <div className="password">
                                    <input type="password" className="form-control" placeholder="Enter password ..." />
                                    <span className="lock"><img src={lock} alt="" /></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-32">
                                <label className="form-label float">Confirm New Password*</label>
                                <div className="password">
                                    <input type="password" className="form-control" placeholder="Enter password ..." />
                                    <span className="lock"><img src={lock} alt="" /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-btn">
                        <button type="submit" className="btn btn-secondary">Update Password</button>
                    </div>
                </form>
            </div>
        </div>
        <SubFooter />
    </div>
  );
};

export default ResetPassword;