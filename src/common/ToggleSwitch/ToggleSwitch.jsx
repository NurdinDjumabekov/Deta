import React from "react";

import "./style.scss";

const ToggleSwitch = ({ onChange, name, value, guid }) => {
  const click = () => {
    onChange({ value: !value, name, guid });
  };

  return (
    <div className="toggle-switch" onClick={click}>
      <input
        type="checkbox"
        id={`switch-${guid}${name}`}
        className="switch-input"
        checked={value}
        name={name}
      />
      <label htmlFor={`switch-${guid}`} className="switch-label"></label>
    </div>
  );
};

export default ToggleSwitch;
