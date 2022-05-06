import React, { useEffect, useRef, useState } from "react";
import Css from "./adminchat.module.css";
import profile from "../../images/profile.png";
import profileicon from "../../images/profileicon.png";
import { IoMdSend } from "react-icons/io";
import Logo from "../../images/mainlogo.jpeg";
import { database } from "../../config/firebase";
import { onChildAdded, push, ref } from "firebase/database";
import { format } from "timeago.js";
import toast, { Toaster } from "react-hot-toast";


// import {baseUrl} from '../../util/utils';
import axios from "axios";

const AdminChatApp = () => {
  const currentUserData = JSON.parse(localStorage.getItem("adminData"));

  const [message, setMessage] = useState("");

  let [firebaseRealMsg, setfirebaseRealMsg] = useState([]);
  const [firebaseChat, setFirebaseChat] = useState([]);
  const [firebaseSelectedChat, setFirebaseSelectedChat] = useState("test");

  const [tokken, setTokken] = useState("");

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const dbRef = ref(database, `/chats/${firebaseSelectedChat}`);

    await push(dbRef, {
      userUid: currentUserData.userId,
      message: message,
      timeStamps: String(new Date()),
    });
    setMessage("");

    axios.post('https://renting-app.herokuapp.com/api/v1/admin/fcmNotification', {
      message,
      firebaseSelectedChat,
      tokken
    }).then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    });

  }

  useEffect(() => {
    const dbRef = ref(database, `/chats/${firebaseSelectedChat}`);

    firebaseRealMsg = [];

    onChildAdded(dbRef, (snapShot) => {
      const todo = firebaseRealMsg;
      todo.push(snapShot.val());
      // console.log("*** Click -->", snapShot.val())
      setfirebaseRealMsg([...todo]);
    });
  }, [firebaseSelectedChat]);

  ///get all chats uid///
  useEffect(async () => {
    const dbRef = ref(database, "/chats");
    let chatKey = [];
    onChildAdded(dbRef, (snapShot) => {
      // console.log(snapShot.key.split("-")[1], "jhahaha");
      chatKey.push(snapShot.key);
      setFirebaseChat([...firebaseChat, ...chatKey]);
    });
  }, []);

  const singleChat = (currentChat) => {
    setFirebaseSelectedChat(firebaseChat[currentChat]);

    const reference = ref(database, `/users/${firebaseChat[currentChat]}`);

    onChildAdded(reference, (snapShot) => {
      setTokken(snapShot.val());
    })

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
  console.log("firebaseSelectedChat", firebaseSelectedChat);

  const copyMessage = async (msg) => {
    try {
      await navigator.clipboard.writeText(msg);
      toast.success("Message has been copied");
    } catch (error) {
      toast.error("Could not copy message");
      console.error(error);
    }
  };


  return (
    <div className={Css.mainContainer}>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              fontSize: 16,
              backgroundColor: "#1d8f50",
              color: "#FFF",
            },
            iconTheme: {
              primary: "#FFF",
              secondary: "#1d8f50",
            },
          },


        }}
      ></Toaster>
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
                <div className={Css.phoneNumber}>{val.split("-")[1]}</div>
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
            {firebaseSelectedChat && firebaseSelectedChat.split("-")[1]}
          </div>
        </div>

        {/* Chat Box */}

        <div className={Css.chatBody}>
          {firebaseRealMsg.map((val, ind) => {
            return val.userUid === currentUserData.userId ? (
              <>
                <div key={ind} className={`${Css.message} ${Css.myMessage}`}>
                  <p style={{ cursor: "pointer" }} onClick={() => copyMessage(val.message)}>
                    {val.message}

                    <br />

                    <span>{format(val.timeStamps)}</span>

                  </p>

                </div>
              </>
            ) : (
              <div
                key={ind}
                className={`${Css.message} ${Css.incomingMessage}`}
              >

                <p style={{ cursor: "pointer" }} onClick={() => copyMessage(val.message)}>
                  {val.message}
                  <br />
                  <span>{format(val.timeStamps)}</span>
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
