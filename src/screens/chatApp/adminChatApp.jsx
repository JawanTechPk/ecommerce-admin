import React, { useEffect, useRef, useState } from "react";
import Css from "./adminchat.module.css";
import profile from "../../images/profile.png";
import profileicon from "../../images/profileicon.png";
import { IoMdSend } from "react-icons/io";
import Logo from "../../images/mainlogo.jpeg";
import { database } from "../../config/firebase";
import { onChildAdded, push, ref } from "firebase/database";

const AdminChatApp = () => {
  const currentUserData = JSON.parse(localStorage.getItem("adminData"));

  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState({});

  let [firebaseRealMsg, setfirebaseRealMsg] = useState([]);
  const [firebaseChat, setFirebaseChat] = useState([]);
  const [firebaseSelectedChat, setFirebaseSelectedChat] = useState("test");

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const dbRef = ref(database, firebaseSelectedChat);

    await push(dbRef, {
      userUid: currentUserData.userId,
      message: message,
    });
    setMessage("");
  };

  useEffect(() => {
    const dbRef = ref(database, firebaseSelectedChat);

    firebaseRealMsg = [];

    onChildAdded(dbRef, (snapShot) => {
      const todo = firebaseRealMsg;
      todo.push(snapShot.val());
      setfirebaseRealMsg([...todo]);
    });
  }, [firebaseSelectedChat]);

  ///get all chats uid///
  useEffect(async () => {
    const dbRef = ref(database, "/");
    let chatKey = [];
    onChildAdded(dbRef, (snapShot) => {
      chatKey.push(snapShot.key);
      setFirebaseChat([...firebaseChat, ...chatKey]);
    });
  }, []);

  const singleChat = (currentChat) => {
    setFirebaseSelectedChat(firebaseChat[currentChat]);
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };
  useEffect(scrollToBottom, [firebaseRealMsg]);
  return (
    <div className={Css.mainContainer}>
      <div className={Css.leftContainer}>
        <div className={Css.head}>
          <img src={Logo} alt="renting logo" width={100} />
        </div>

        <div className={Css.oneChatContainer}>
          {firebaseChat.map((val, ind) => {
            return (
              <div
                key={ind}
                className={Css.oneChat}
                onClick={() => singleChat(ind)}
              >
                <div className={Css.chatAvatar}>
                  <img src={profile} width={40} alt="profile" />
                </div>
                <div className={Css.phoneNumber}>{val}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={Css.rightContainer}>
        <div className={Css.chatHead}>
          <div className={Css.chatHeadAvatar}>
            <img src={profileicon} width={60} alt="profile" />
          </div>
          <div className={Css.chatHeadphoneNumber}>
            {" "}
            {selectedChat?.customer?.phone_number}
          </div>
        </div>

        {/* Chat Box */}

        <div className={Css.chatBody}>
          {firebaseRealMsg.map((val, ind) => {
            return val.userUid === currentUserData.userId ? (
              <div key={ind} className={`${Css.message} ${Css.myMessage}`}>
                <p>
                  {val.message}
                  <br />
                  {/* <span>12:15</span> */}
                </p>
              </div>
            ) : (
              <div
                key={ind}
                className={`${Css.message} ${Css.incomingMessage}`}
              >
                <p>
                  {val.message}
                  <br />
                  {/* <span>12:15</span> */}
                </p>
              </div>
            );
          })}
          <div ref={messagesEndRef}></div>
        </div>

        {/* ---------- */}

        <form onSubmit={sendMessageHandler}>
          <div className={Css.chatFooter}>
            <div className={Css.messageIputDiv}>
              <input
                type="text"
                className={Css.messageIput}
                placeholder="Type a message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className={Css.sendButtonDiv}>
              <button type="submit" className={Css.sendButton}>
                <IoMdSend className={Css.sendButtonIcon} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminChatApp;
