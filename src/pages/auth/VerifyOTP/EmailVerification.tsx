import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.svg";
import "./EmailVerification.scss";
import LeftPanel from "../../../components/LeftPanel/LeftPanel";
import SubHeader from "../../../components/SubHeader/SubHeader";
import SubFooter from "../../../components/SubFooter/SubFooter";
import { useVerifySecurityCode } from "./useVerifySecurityCode";
import { useResendCode } from "./useResendCode";

const EmailVerification = () => {
    const { formik } = useVerifySecurityCode();
    const { resendCode } = useResendCode();

    const handleOtpChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        const otpArr = formik.values.otp.split("");
        otpArr[index] = value;

        const otp = otpArr.join("").slice(0, 4);
        formik.setFieldValue("otp", otp);

        if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handleResendCode = async () => {
        try {
        await resendCode();
        } catch (error) {
        console.error(error);
        }
    };

  return (
    <div className="auth-wrapper">
        <LeftPanel title="Sign in to manage your dashboard and activities." />
        <div className="right-panel">
            <div className="right-panel-wrapper">
                <div className="auth-logo mb-5"><img src={logo} alt="" /></div>
                <SubHeader title="Verify Your Email." desc="We’ve sent an OTP to your registered email. Open your inbox, find the verification message, and enter the OTP." />
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <div className="otp-box">
                            {[0, 1, 2, 3].map((_, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength={1}
                                placeholder="X"
                                className="otp-input"
                                value={formik.values.otp[index] || ""}
                                onChange={(e) => handleOtpChange(e, index)}
                            />
                            ))}
                        </div>
                        {formik.touched.otp && formik.errors.otp && (
                            <p className="error-text">{formik.errors.otp}</p>
                        )}
                    </div>
                    <p className="clr-2 mb-32">Didn’t receive the email? <Link to="#" onClick={handleResendCode}>  Resend Verification</Link></p>
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