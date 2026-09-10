import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import profileImg from "../../assets/images/profile-lg.png";
import notificationIcon from "../../assets/images/notification.svg";
import tick from "../../assets/images/tick.png";
import menu from "../../assets/images/menu.png";

import { logOut } from "../../store/auth.store";
import { getMyNotifications } from "../../services/apis/notification.api";
import socketService from "../../services/socketService";
import type { RootState } from "../../store/store";

import "./DashboardHeader.scss";

interface DashboardHeaderProps {
  toggleMenu: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ toggleMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.authSlice.user);
  const [unreadCount, setUnreadCount] = useState(0);
  const firstName = user?.firstName?.trim() || "User";
  const profileImage = user?.profileimageurl?.trim() || "";
  useEffect(() => {
    let mounted = true;
    void (async () => {
      try {
        const res = await getMyNotifications();
        if (!mounted) return;
        setUnreadCount(Number(res?.unreadCount || 0));
      } catch {
        if (mounted) setUnreadCount(0);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!user?._id) return;

    socketService.connect(user._id);

    const handleNotificationCreated = ({
      unreadCount: nextUnreadCount,
    }: {
      unreadCount: number;
    }) => {
      setUnreadCount(nextUnreadCount);
    };

    const handleNotificationUpdated = ({
      unreadCount: nextUnreadCount,
    }: {
      unreadCount: number;
    }) => {
      setUnreadCount(nextUnreadCount);
    };

    socketService.onNotificationCreated(handleNotificationCreated);
    socketService.onNotificationUpdated(handleNotificationUpdated);

    return () => {
      socketService.offNotificationCreated();
      socketService.offNotificationUpdated();
    };
  }, [user?._id]);

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
          {unreadCount > 0 ? <span className="notification-badge">{unreadCount}</span> : null}
        </Link>
      </div>

      {/* User Dropdown */}
      <div className="user dropdown">
        <button type="button" className="dropdown-toggle">
          <span className="user-avatar">
            <img src={profileImage || profileImg} alt={firstName} />
          </span>
          <span className="user-name">{firstName}</span>
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
