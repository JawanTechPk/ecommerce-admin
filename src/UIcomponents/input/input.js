import React from "react";

const Inputs = ({
  value,
  maxLength,
  onchange,
  type,
  head,
  h5Element,
  addTitleCss,
  inputStyle,
  placeholder,
}) => {
  return (
    <>
      <div className={addTitleCss}>
        <h5 className={h5Element}>{head}</h5>
        <input
          value={value}
          maxLength={maxLength}
          onChange={(e) => {
            onchange(e.target.value);
          }}
          type={type}
          placeholder={placeholder}
          className={inputStyle}
        />
      </div>
    </>
  );
};

export default Inputs;
