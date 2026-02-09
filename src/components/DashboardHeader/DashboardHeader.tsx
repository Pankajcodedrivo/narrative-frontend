import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import notificationIcon from "../../assets/images/notification.svg";
import user from "../../assets/images/avtar.png";
import tick from "../../assets/images/tick.png";
import menu from "../../assets/images/menu.png";

import { logOut } from "../../../store/auth.store";

import "./DashboardHeader.scss";

interface DashboardHeaderProps {
  toggleMenu: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ toggleMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logOut());
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-header">
      
      {/* Mobile Menu */}
      <div className="menu-bar d-flex d-md-none" onClick={toggleMenu}>
        <img src={menu} alt="menu" />
      </div>

      {/* Notification */}
      <div className="notification-icon">
        <Link to="/notification-list">
          <img src={notificationIcon} alt="notification" />
        </Link>
      </div>

      {/* User Dropdown */}
      <div className="user dropdown">
        <button type="button" className="dropdown-toggle">
          <span>
            <img src={user} alt="user" />
          </span>
          User
        </button>

        <ul className="dropdown-menu">
          <li>
            <Link to="/my-profile">
              <span>
                <img src={tick} alt="" />
              </span>
              My Profile
            </Link>
          </li>

          <li>
            <Link to="/settings">
              <span>
                <img src={tick} alt="" />
              </span>
              Settings
            </Link>
          </li>
          <li>
              <Link to="#" onClick={logoutHandler}><span><img src={tick} alt="" /></span> Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardHeader;
