import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import socketService from "../../../services/socketService";

import "./NeedAssistance.scss";
import star from "../../../assets/images/star-icon.svg";
import sendicon from "../../../assets/images/send-btn.svg";
import userImg from "../../../assets/images/avtar-2.svg";
import arrow from "../../../assets/images/acc-close.svg";
import WelcomeHeader from "../../../components/WelcomeHeader/WelcomeHeader";
import type { RootState } from "../../../store/store";

const NeedAssistance = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);

  const user = useSelector((state:RootState) => state.authSlice.user);
  const userId = user?._id;

  const chatEndRef = useRef(null);

  // ===============================
  // 🔌 INIT SOCKET
  // ===============================
  useEffect(() => {
    if (!userId) return;

    socketService.connect(userId);

    socketService.onChatStream(({ token }) => {
      setChat(prev => {
        const last = prev[prev.length - 1];

        if (last && last.type === "ai") {
          return [
            ...prev.slice(0, -1),
            { ...last, text: last.text + token },
          ];
        }

        return [...prev, { type: "ai", text: token }];
      });
    });

    socketService.onChatDone(() => setTyping(false));

    socketService.onTyping(({ status }) => setTyping(status));

    socketService.onError(({ message }) => {
      setTyping(false);
      alert(message);
    });

    return () => {
      socketService.offAll();
      socketService.disconnect();
    };
  }, [userId]);

  // ===============================
  // 📩 SEND MESSAGE
  // ===============================
  const sendMessage = () => {
    if (!message.trim() || !userId) return;

    setChat(prev => [...prev, { type: "user", text: message }]);

    socketService.sendMessage(userId, message);

    setMessage("");
  };

  // ===============================
  // ⌨️ ENTER KEY
  // ===============================
  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // ===============================
  // 🔽 AUTO SCROLL
  // ===============================
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <>
      <WelcomeHeader
        showButton
        desc="Get the support and guidance you need to create, manage and share your stories with ease."
      />

      <div className="cmn-wrapper mb-4">
        <div className="ask-ai text-center">
          <span className="d-block mb-5">
            <img src={star} alt="" />
          </span>
          <p>Ask our AI anything</p>
        </div>

        <div className="chat-wrapper">
          {chat.map((msg:any, i) => (
            <div
              key={i}
              className={`chat-innr ${
                msg?.type === "user" ? "right" : "left"
              }`}
            >
              {msg?.type === "user" ? (
                <div className="chat-right-outr">
                  <div className="chat-right-img">
                    <img src={userImg} alt="" />
                  </div>
                  <div className="chat-right-content">
                    <p>{msg?.text}</p>
                  </div>
                </div>
              ) : (
                <p>{msg?.text}</p>
              )}
            </div>
          ))}

          {typing && (
            <div className="chat-innr left">
              <p>Typing...</p>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className="send-msg">
          <div className="send-msg-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>

          <button onClick={sendMessage}>
            <img src={sendicon} alt="" />
          </button>
        </div>
      </div>

      <Link to="/faq" className="faq-box">
        <h3 className="mb-0">Frequently Asked Questions (FAQ’s)</h3>
        <span>
          <img src={arrow} alt="" />
        </span>
      </Link>
    </>
  );
};

export default NeedAssistance;