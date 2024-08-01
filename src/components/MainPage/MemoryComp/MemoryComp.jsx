import React from "react";

////// style
import "./style.scss";

///// imgs
import materinka from "../../../assets/images/materinka.png";
import plata from "../../../assets/images/plata.png";

const MemoryComp = () => {
  return (
    <div className="memoryBlock">
      <div className="cpu">
        <img src={materinka} alt="" />
        <div></div>
      </div>
      <div className="GB">
        <img src={plata} alt="" />
        <div></div>
      </div>
    </div>
  );
};

export default MemoryComp;
