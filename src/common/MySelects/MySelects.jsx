import React, { useRef, useState } from "react";

///// styles
import "./style.scss";

///// icons
import arrow from "../../assets/icons/arrowWhite.svg";

///// components
import Select from "react-select";

const MySelects = (props) => {
  const { list, initText, title } = props;
  const { onChange, nameKey, value } = props;

  const clickSelect = (item) => onChange({ ...item, name: nameKey });

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#9c9c9c", // Темный фон
      borderColor: "#444",
      color: "#222",
      fontSize: "15px",
      cursor: "pointer",
      fontWeight: 600,
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#9c9c9c",
    }),
    option: (provided, { isFocused, isSelected }) => ({
      ...provided,
      backgroundColor: isSelected
        ? "#5e6e8257"
        : isFocused
        ? "#5e6e8257"
        : "#9c9c9c",
      color: "#222",
      fontSize: "15px",
      cursor: "pointer",
      fontWeight: 600,
      borderBottom: "2px solid #00000050",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#222",
      fontSize: "15px",
      cursor: "pointer",
      fontWeight: 600,
    }),
    input: (provided) => ({
      ...provided,
      color: "#222",
      fontSize: "15px",
      cursor: "pointer",
      fontWeight: 600,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#00000097",
      fontSize: "15px",
      cursor: "pointer",
      fontWeight: 600,
    }),
  };

  return (
    <div className="mySelect">
      <h5>{title}</h5>
      {/* <div className="selectBlock" id="uniqueSelectID" ref={accordionRef}>
        <div className="selectBlock__inner" onClick={() => setActive(!active)}>
          <p className={textSelect ? "activeText" : ""}>
            {textSelect ? textSelect?.label : initText}
          </p>
          <img src={arrow} alt="<" className={active ? "" : "rotate180"} />
        </div>
        {active && (
          <div className="selectBlock__activeBlock">
            {list?.map((i) => (
              <div onClick={() => clickSelect(i)} key={i.value}>
                <p>{i?.label}</p>
              </div>
            ))}
          </div>
        )}
      </div> */}
      <Select
        styles={customStyles}
        options={list}
        value={value}
        onChange={clickSelect}
      />
    </div>
  );
};

export default MySelects;
