import React from "react";

const Dropdown = ({
  options,
  addTypeSelect,
  addTypeDiv,
  onchange,
  value,
  h5Element,
  head,
}) => {
  return (
    <>
      <div className={addTypeDiv}>
        <h5 className={h5Element}>{head}</h5>
        <select
          value={value}
          className={addTypeSelect}
          onChange={(e) => {
            onchange(e.target.value, e.target.selectedIndex, options);
          }}
        >
          {options &&
            options.map((val, ind) => {
              return (
                <option key={ind} value={val}>
                  {val}
                </option>
              );
            })}
        </select>
      </div>
    </>
  );
};

export default Dropdown;
