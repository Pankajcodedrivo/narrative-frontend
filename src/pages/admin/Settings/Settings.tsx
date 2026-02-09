import WelcomeHeader from "../../../components/WelcomeHeader/WelcomeHeader";
import "./Settings.scss";
import { useSettings } from "./useSettings";
import InputField from "../../../components/common/forms/Input/Input";
import lock from "../../../assets/images/lock.svg";

const Settings = () => {
   const { changePasswordFormik } = useSettings();
  return (
    <>
      <WelcomeHeader showButton desc="Manage your personal details, preferences, and storytelling settings in one place." />
      <div className="cmn-box md">
          <form
              onSubmit={(e) => {
              e.preventDefault();
              changePasswordFormik.handleSubmit();
              }}
            >
          <div className="mb-4">
            <h3>Change Password</h3>
            <p>Update your password to keep your account secure.</p>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label className="form-label float">Current Password*</label>
                <div className="password">
                  <InputField
                      id="password"
                      name="password_old"
                      type="password"
                      placeholder="Enter password ..."
                      className="form-control"
                      onChange={changePasswordFormik.handleChange}
                      value={changePasswordFormik.values.password_old}
                      errorMsg={changePasswordFormik.errors.password_old}
                      rightIcon={lock}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label className="form-label float">New Password*</label>
                <div className="password">
                  <InputField
                      id="password"
                      name="password_new"
                      type="password"
                      placeholder="Enter password ..."
                      className="form-control"
                      onChange={changePasswordFormik.handleChange}
                      value={changePasswordFormik.values.password_new}
                      errorMsg={changePasswordFormik.errors.password_new}
                      rightIcon={lock}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label className="form-label float">Confirm New Password*</label>
                <div className="password">
                  <InputField
                    id="cpassword"
                    name="cpassword"
                    type="password"
                    placeholder="Enter password ..."
                    className="form-control"
                    onChange={changePasswordFormik.handleChange}
                    value={changePasswordFormik.values.cpassword}
                    errorMsg={changePasswordFormik.errors.cpassword}
                    rightIcon={lock}
                    />
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-4 mb-32">
              <button type="submit" className="btn btn-secondary mw-100">Change Password</button>
            </div>
          </div>
          </form>
          <form action="">
          <div className="mb-4">
            <h3>Notification Preferences</h3>
            <p>Control email and in-app notifications for important activities.</p>
          </div>
          <div className="switch-btn-wrapper">
            <ul>
              <li>
                <div className="switch-btn-content">
                  <h4>Push Notifications</h4>
                  <p>Receive real-time alerts directly on your device.</p>
                </div>
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                </label>
              </li>
              <li>
                <div className="switch-btn-content">
                  <h4>Email Notifications</h4>
                  <p>Receive important updates, reminders, and activity alerts via email.</p>
                </div>
                <label className="switch">
                    <input type="checkbox" checked />
                    <span className="slider"></span>
                </label>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </>
  );
};

export default Settings;