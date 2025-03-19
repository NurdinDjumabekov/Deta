import React from "react";
import "./style.scss";

const MyInputs = (props) => {
  const { title, placeholder, name } = props;
  const { onChange, required, value, type, disabled } = props;

  return (
    <div className="myInput">
      <h5>{title}</h5>
      <input
        type={type ? type : "text"}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        required={required}
        value={value}
        disabled={!!disabled || false}
      />
    </div>
  );
};

export default MyInputs;
