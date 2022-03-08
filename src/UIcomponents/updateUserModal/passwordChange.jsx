import React from "react";
import styles from "./phoneNumberChange.module.css";
const PasswordChange = ({ newPassword, setNewPasword }) => {
  return (
    <div className={styles.numberBox}>
      <h5>CHANGE PASSWORD</h5>
      <div>
        <label htmlFor="">New User Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPasword(e.target.value)}
          placeholder="New Password"
        />
      </div>
    </div>
  );
};

export default PasswordChange;
