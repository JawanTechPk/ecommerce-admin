import React from "react";
import styles from "./phoneNumberChange.module.css";
const UserNameChange = ({ userName, newUserName, setNewUserName }) => {
  return (
    <div className={styles.numberBox}>
      <h5>CHANGE USER NAME</h5>
      <div>
        <label htmlFor="">Old User Name</label>
        <input type="text" value={userName} disabled />
      </div>
      <div>
        <label htmlFor="">New User Name</label>
        <input
          value={newUserName}
          type="text"
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="New User Name"
        />
      </div>
    </div>
  );
};

export default UserNameChange;
