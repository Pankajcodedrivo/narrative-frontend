interface DashboardHeaderProps {
    toggleMenu: () => void;
}
import { Link } from "react-router-dom";
import notificationIcon from "../../assets/images/notification.svg"
import user from "../../assets/images/avtar.png"
import tick from "../../assets/images/tick.png"
import menu from "../../assets/images/menu.png"
import "./DashboardHeader.scss";

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ toggleMenu }) => {
  return (
    <div className="dashboard-header">
        <div className="menu-bar d-flex d-md-none" onClick={toggleMenu}>
            <img src={menu} alt="" />
        </div>
        <div className="notification-icon">
            <Link to="/"><img src={notificationIcon} alt="" /></Link>
        </div>
        <div className="user dropdown">
            <button type="button" className="dropdown-toggle"><span><img src={user} alt="" /></span> User</button>
            <ul className="dropdown-menu">
                <li>
                    <Link to="/"><span><img src={tick} alt="" /></span> My Profile</Link>
                </li>
                <li>
                    <Link to="/"><span><img src={tick} alt="" /></span> Settings</Link>
                </li>
                <li>
                    <Link to="/"><span><img src={tick} alt="" /></span> Logout</Link>
                </li>
            </ul>
        </div>
    </div>
  );
};

export default DashboardHeader;