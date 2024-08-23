import React, { useState } from "react";
import { useEffect } from "react";

const MyIPInput = ({ title, placeholder, name, onChange, required, value }) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleChange = (e) => {
    const newValue = e.target.value;

    const isValidChar = /^[0-9.]*$/.test(newValue);

    const isValidIP = (ip) => {
      if (ip?.startsWith(".") || ip?.startsWith("0")) return false;

      if (/\.{2,}/.test(ip)) return false;

      const parts = ip?.split(".");
      if (parts?.length > 4) return false;

      return parts?.every((part) => {
        if (part === "") return true;

        const num = parseInt(part, 10);
        return num >= 0 && num <= 255 && part === num?.toString();
      });
    };

    if (isValidChar && isValidIP(newValue)) {
      setInputValue(newValue);
      onChange(e);
    }
  };

  useEffect(() => {
    if (value === "") {
      setInputValue("");
    }
  }, [value]);

  return (
    <div className="myInput">
      <h5>{title}</h5>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default MyIPInput;
