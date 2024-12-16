import React from "react";
import "./style.scss";

const MyTextArea = (props) => {
  const { title, placeholder, name } = props;
  const { onChange, required, value } = props;

  return (
    <div className="myInput">
      <h5>{title}</h5>
      <textarea
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        required={required}
        value={value}
      />
    </div>
  );
};

export default MyTextArea;
