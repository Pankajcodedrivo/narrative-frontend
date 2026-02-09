import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import logo from "../../assets/images/logo-wh.svg";
import icon1 from "../../assets/images/icon-1.svg";
import icon2 from "../../assets/images/icon-2.svg";
import icon3 from "../../assets/images/icon-3.svg";
import icon4 from "../../assets/images/icon-4.svg";
import icon5 from "../../assets/images/icon-5.svg";
import icon6 from "../../assets/images/icon-6.svg";

import iconHover1 from "../../assets/images/icon-hover-1.svg";
import iconHover2 from "../../assets/images/icon-hover-2.svg";
import iconHover3 from "../../assets/images/icon-hover-3.svg";
import iconHover4 from "../../assets/images/icon-hover-4.svg";
import iconHover5 from "../../assets/images/icon-hover-5.svg";
import iconHover6 from "../../assets/images/icon-hover-6.svg";

import close from "../../assets/images/cross.svg";

import { logOut } from "../../../store/auth.store";

import "./Sidebar.scss";

interface SidebarProps {
  isOpen: boolean;
  closeMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logOut());
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-innr">
        <button className="close-icon" onClick={closeMenu}>
          <img src={close} alt="close" />
        </button>

        <div className="dash-logo">
          <img src={logo} alt="logo" />
        </div>

        <ul className="sidebar-list">
          <li>
            <Link to="/dashboard">
              <span>
                <img className="icon" src={icon1} alt="" />
                <img className="icon-hover" src={iconHover1} alt="" />
              </span>
              Welcome
            </Link>
          </li>

          <li>
            <Link to="/my-profile">
              <span>
                <img className="icon" src={icon2} alt="" />
                <img className="icon-hover" src={iconHover2} alt="" />
              </span>
              My Profile
            </Link>
          </li>

          <li>
            <Link to="/my-interviews">
              <span>
                <img className="icon" src={icon3} alt="" />
                <img className="icon-hover" src={iconHover3} alt="" />
              </span>
              My Interviews
            </Link>
          </li>

          <li>
            <Link to="/need-assistance">
              <span>
                <img className="icon" src={icon4} alt="" />
                <img className="icon-hover" src={iconHover4} alt="" />
              </span>
              Need Assistance?
            </Link>
          </li>

          <li>
            <Link to="/my-collections">
              <span>
                <img className="icon" src={icon5} alt="" />
                <img className="icon-hover" src={iconHover5} alt="" />
              </span>
              My Collections
            </Link>
          </li>
          <li>
                <Link to="#" onClick={logoutHandler}>
                    <span>
                      <img className="icon" src={icon6} alt="" />
                      <img className="icon-hover" src={iconHover6} alt="" />
                    </span>
                    Logout
                </Link> 
            </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
