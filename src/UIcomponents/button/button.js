import React from "react";

const Buttons = ({ btnStyle, btnTxt, onclick }) => {
  return (
    <>
      <button onClick={() => onclick()} className={btnStyle}>
        {btnTxt}
      </button>
    </>
  );
};

export default Buttons;
