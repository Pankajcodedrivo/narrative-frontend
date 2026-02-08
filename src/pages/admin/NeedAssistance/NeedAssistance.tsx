import { Link } from "react-router-dom";
import "./NeedAssistance.scss";
import star from "../../../assets/images/star-icon.svg";
import sendicon from "../../../assets/images/send-btn.svg";
import user from "../../../assets/images/avtar-2.svg";
import arrow from "../../../assets/images/acc-close.svg";
import WelcomeHeader from "../../../components/WelcomeHeader/WelcomeHeader";
const NeedAssistance = () => {
    return (
        <>
            <WelcomeHeader  showButton desc="Get the support and guidance you need to create, manage and share your stories with ease." />
            <div className="cmn-wrapper mb-4">
                <div className="ask-ai text-center">
                    <span className="d-block mb-5"><img src={star} alt="" /></span>
                    <p>Ask our AI anything</p>
                </div>
                <div className="chat-wrapper">
                    <div className="chat-innr right">
                        <div className="chat-right-outr">
                            <div className="chat-right-img">
                                <img src={user} alt="" />
                            </div>
                            <div className="chat-right-content">
                                <div className="chat-top mb-4">
                                    <p>Hi!</p>
                                </div>
                                <div className="chat-bottom">
                                    <p>Tribute and Appreciation Videos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="chat-innr left">
                        <p>Create a tribute video to express gratitude or honor someone special—such as parents, mentors, or friends. Include meaningful moments, shared memories, and a heartfelt message to make it truly memorable.</p>
                    </div>
                </div>
                <div className="send-msg">
                    <div className="send-msg-input">
                        <input type="text" placeholder="Text messages ..." />
                    </div>
                    <button type="submit"><img src={sendicon} alt="" /></button>
                </div>
            </div>
            <Link to="/faq" className="faq-box">
                <h3 className="mb-0">Frequently Asked Questions (FAQ’s)</h3>
                <span><img src={arrow} alt="" /></span>
            </Link>
        </>
    );
};

export default NeedAssistance;