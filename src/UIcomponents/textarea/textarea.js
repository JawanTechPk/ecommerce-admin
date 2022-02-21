import React from "react";

const Textareas = ({
  value,
  maxlength,
  onchange,
  type,
  head,
  h5Element,
  inputStyle,
  addTitleCss,
  Textareastyle,
  placeholder,
}) => {
  return (
    <>
      <div className={addTitleCss}>
        <h5 className={h5Element}>{head}</h5>
        <textarea
          value={value}
          rows={5}
          maxLength={maxlength}
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

export default Textareas;
