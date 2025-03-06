import React from "react";

/////// style
import "./style.scss";

const MiniLoader = () => {
  return (
    <div className="miniLoader">
      <div className="miniLoader__block">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default MiniLoader;
