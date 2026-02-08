import info from "../../../assets/images/info.svg";
import cross from "../../../assets/images/close.svg";
import "./NotificationList.scss";
const NotificationList = () => {
  return (
    <>
      <div className="notification-list">
          <ul>
            <li>
                <div>
                   <p><span>Limited Support on Holidays:</span> Our support will be limited during the holiday period. Expect delayed responses.</p>
                </div>
                <span className="cross-icon"><img src={cross} alt="" /></span>
            </li>  
            <li className="alert">
                <div>
                   <p><span><img className="me-2" src={info} alt="" />Account Security Alert:</span> Suspicious login detected. Verify recent activity to secure your account.</p>
                </div>
                <span className="cross-icon"><img src={cross} alt="" /></span>
            </li>  
            <li>
                <div>
                   <p><span>Limited Support on Holidays:</span> Our support will be limited during the holiday period. Expect delayed responses.</p>
                </div>
                <span className="cross-icon"><img src={cross} alt="" /></span>
            </li>  
           <li className="alert">
                <div>
                   <p><span><img className="me-2" src={info} alt="" />Account Security Alert:</span> Suspicious login detected. Verify recent activity to secure your account.</p>
                </div>
                <span className="cross-icon"><img src={cross} alt="" /></span>
            </li>  
          </ul>  
      </div>
    </>
  );
};

export default NotificationList;