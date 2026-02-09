import logo from "../../../assets/images/logo.svg";
import "./ResetPassword.scss";
import LeftPanel from "../../../components/LeftPanel/LeftPanel";
import SubHeader from "../../../components/SubHeader/SubHeader";
import SubFooter from "../../../components/SubFooter/SubFooter";
import lock from "../../../assets/images/lock.svg";
import { useResetPass } from "./useResetPass";
import InputField from "../../../components/common/forms/Input/Input";

const ResetPassword = () => {
    const email = localStorage.getItem("email") || "";
    const { resetPasswordFormik } = useResetPass(email);

  return (
    <div className="auth-wrapper">
        <LeftPanel title="You’re almost done. Set your new password." />
        <div className="right-panel">
            <div className="right-panel-wrapper">
                <div className="auth-logo mb-5"><img src={logo} alt="" /></div>
                <SubHeader title="Create a New Password." desc="Create a secure password to protect your account." />
                <form
                    onSubmit={(e) => {
                    e.preventDefault();
                    resetPasswordFormik.handleSubmit();
                    }}
                >
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label className="form-label float">New Password*</label>
                                <div className="password">
                                    <InputField
                                        id="password"
                                        type="password"
                                        placeholder="Enter password ..."
                                        className="form-control"
                                        onChange={resetPasswordFormik.handleChange}
                                        value={resetPasswordFormik.values.password}
                                        errorMsg={resetPasswordFormik.errors.password}
                                        rightIcon={lock}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-32">
                                <label className="form-label float">Confirm New Password*</label>
                                <div className="password">
                                    <InputField
                                        id="cpassword"
                                        type="password"
                                        placeholder="Enter password ..."
                                        className="form-control"
                                        onChange={resetPasswordFormik.handleChange}
                                        value={resetPasswordFormik.values.cpassword}
                                        errorMsg={resetPasswordFormik.errors.cpassword}
                                        rightIcon={lock}
                                        />
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