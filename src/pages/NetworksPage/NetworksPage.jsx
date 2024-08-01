import React from "react";

////style
import "./style.scss";
import { ipBlocks } from "../../helpers/LocalData";

const NetworksPage = () => {
  return (
    <div className="networksPage">
      <button className="addBtn">+ Добавить</button>
      <div className="listNetworks">
        {ipBlocks?.map((item) => (
          <div className="every">
            <div className="title">
              <h6>{item?.ip}</h6>
              <p>x</p>
            </div>
            <div className="grid-container">
              {item?.numbers.map((i, index) => (
                <div
                  key={index}
                  className="grid-item"
                  style={{ backgroundColor: i.color }}
                >
                  <p>{i.num}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworksPage;
