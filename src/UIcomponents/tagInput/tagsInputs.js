import React, { useState, useEffect } from "react";
import Css from "./tagsInput.module.css";

const TagsInput = ({
  value,
  tags,
  suggestions,
  addObj,
  setAddObj,
  inputStyle,
  deleteTags,
}) => {
  const lang = [];

  useEffect(() => {
    // let arr = [...{...suggestions.name}];
    suggestions.map((item, index) => {
      lang.push(item.name);
    });
  });

  const [searchtext, setSearchtext] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [resfound, setResfound] = useState(true);
  const [val, setVal] = useState([]);

  const handleChange = (e) => {
    let searchval = e.target.value;
    let suggestion = [];
    if (searchval.length > 0) {
      suggestion = lang
        .sort()
        .filter((e) => e.toLowerCase().includes(searchval.toLowerCase()));
      setResfound(suggestion.length !== 0 ? true : false);
    }
    setSuggest(suggestion);
    setSearchtext(searchval);
  };

  const suggestedText = (values) => {
    setSearchtext(values);
    setSuggest([]);
    setSearchtext("");
    setVal([...val, values]);
    setAddObj(values);
  };

  const deleteTag = (index) => {
    val.splice(index, 1);
    // deleteTags(val)
    deleteTags(value);
    setVal([...val]);
  };

  const getSuggestions = () => {
    if (suggest.length === 0 && searchtext !== "" && !resfound) {
      return <p>Search Content Not Found</p>;
    }

    const filterTag = suggest.filter((e) => val.indexOf(e) === -1);

    return (
      <ul>
        {filterTag.slice(0, 5).map((item, index) => {
          return (
            <div key={index}>
              <li onClick={() => suggestedText(item)}>{item}</li>
              {index !== suggest.length - 1 && <hr />}
            </div>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      {value &&
        value.length != 0 &&
        value.map((item, index) => {
          return (
            <li
              className={Css.selectedTag}
              key={index}
              onClick={() => deleteTag(index)}
            >
              {item}
            </li>
          );
        })}
      <div>
        <input
          type="text"
          placeholder="Search.."
          className={inputStyle}
          value={searchtext}
          onChange={handleChange}
        />
        {getSuggestions()}
      </div>
    </>
  );
};

export default TagsInput;
