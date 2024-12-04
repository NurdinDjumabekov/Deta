import React from "react";

import "./style.scss";
import { getTextColor } from "../../../helpers/getBrightness";

const NumberTypes = ({ list }) => {
  return (
    <div className="numberTypes">
      {list?.map((item, index) => (
        <div key={index} style={{ background: item.color }}>
          <p>{item?.codeid}</p>
        </div>
      ))}
    </div>
  );
};

export default NumberTypes;
