import React from "react";
import Css from "../priceField/pricefield.module.css";
import { toast } from "react-toastify";

const Otherfield = ({ maxLength, type, title, onchange, value }) => {
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
          type={type}
          value={value}
          onChange={(e) => {
            onchange(e.target.value);
          }}
          className={Css.priceFieldStyle}
        />
        <h6 className={Css.priceTxtStyle}>{title}</h6>
      </div>
    </>
  );
};

export default Otherfield;
