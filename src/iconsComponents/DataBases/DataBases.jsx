import React from "react";

///// helpers
import { tranformTextInNum } from "../../helpers/tranformTextInNum";
import { percentColor } from "../../helpers/percentColor";

////// style
import "./style.scss";

const DataBases = ({ percent, img, more }) => {
  const ledtoversPercent = 100 - +tranformTextInNum(percent);

  return (
    <div className="blockMemory">
      <img
        style={{
          color: "#000",
          background: `linear-gradient(0deg, ${percentColor(
            percent
          )} ${+tranformTextInNum(
            percent
          )}%, rgba(255,255,255,1) ${+ledtoversPercent}%)`,
          width: "90%",
        }}
        src={img}
        alt="#"
        className="imgMemory"
      />

      <span>{more}</span>
    </div>
  );
};

export default DataBases;
