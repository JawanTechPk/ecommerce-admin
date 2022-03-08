import React from "react";
import styles from "./phoneNumberChange.module.css";
const PhoneNumberChange = ({ phoneNumber, newNumber, setNewNumber }) => {
  return (
    <div className={styles.numberBox}>
      <h5>CHANGE PHONE NUMBER</h5>
      <div>
        <label htmlFor="">Old Phone Number</label>
        <input type="number" value={phoneNumber.slice(1)} disabled />
      </div>
      <div>
        <label htmlFor="">New Phone Number</label>
        <input
          type="number"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
          placeholder="Enter New Number"
        />
      </div>
    </div>
  );
};

export default PhoneNumberChange;
