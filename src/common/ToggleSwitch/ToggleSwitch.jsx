import React from "react";
import "./style.scss";

const ToggleSwitch = ({ onChange, name, value, guid, keyGuid }) => {
  const click = () => onChange({ value: !value, name, guid });

  return (
    <div className={`toggle-switch ${value ? "checked" : ""}`} onClick={click}>
      <input
        type="checkbox"
        id={`switch-${keyGuid}${name}`}
        className="switch-input"
        checked={value}
        name={name}
        readOnly
      />
      <label
        htmlFor={`switch-${keyGuid}${name}`}
        className="switch-label"
      ></label>
    </div>
  );
};

export default ToggleSwitch;
