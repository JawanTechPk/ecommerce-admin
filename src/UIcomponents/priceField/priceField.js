import React from "react";
import Css from "./pricefield.module.css";
import { toast } from "react-toastify";

const Pricefield = ({ maxLength, type, title, onchange, value }) => {
  const inpChg = (e) => {
    if (e.target.value.length > 6) {
    } else {
      onchange(e.target.value);
    }
  };

  return (
    <>
      <div>
        <input
          oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
          maxLength={maxLength}
          type={type}
          value={value}
          onChange={(e) => {
            inpChg(e);
          }}
          className={Css.priceFieldStyle}
        />
        <h6 className={Css.priceTxtStyle}>{title}</h6>
      </div>
    </>
  );
};

export default Pricefield;
