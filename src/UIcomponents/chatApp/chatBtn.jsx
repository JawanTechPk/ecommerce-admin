import React from "react";
import { AiFillWechat } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "./chatBtn.module.css";
const ChatBtn = () => {
  return (
    <Link to="/chatapp">
      <div className={styles.chatBtnBox}>
        <AiFillWechat size={35} color="white" />
      </div>
    </Link>
  );
};

export default ChatBtn;
