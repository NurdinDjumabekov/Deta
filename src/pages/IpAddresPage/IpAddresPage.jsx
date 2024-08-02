import React from "react";

////style
import "./style.scss";

//////helpers
import { listPrivoiders, list_haProxy } from "../../helpers/LocalData";

////// imgs
import addicon from "../../assets/icons/add.svg";
import editIcon from "../../assets/icons/edit.svg";
import monitor from "../../assets/icons/display.svg";

const IpAddresPage = () => {
  return (
    <div className="ipAddresPage">
      <div className="ipAddresPage__menu">
        <button className="addBtn">+</button>
      </div>

      <div className="ipAddresPage__inner">
        {listPrivoiders?.map((item, index) => (
          <div className="every" key={index}>
            <div className="titlesAction">
              <h5>{item?.privoider}</h5>
              <div className="actions">
                <button>
                  <img src={addicon} alt="+" />
                </button>
                <button className="edit">
                  <img src={editIcon} alt="edit" />
                </button>
              </div>
            </div>
            {item?.listInnerProv?.map((i, index) => (
              <div className="every__inner" key={index}>
                <div className="titleInner">
                  <div className="header">
                    <h6>{i?.nameBlock}</h6>
                    <p>{i?.hostTwo}</p>
                    <div className="actions">
                      <button>
                        <img src={addicon} alt="+" />
                      </button>
                      <button className="edit">
                        <img src={editIcon} alt="edit" />
                      </button>
                    </div>
                  </div>
                  <span className="host">{i?.host}</span>
                </div>
                <div className="listIp">
                  {i?.list?.map((i, index) => (
                    <div className="ip__every">
                      <div className="ip__every__inner">
                        <div className="index">
                          <b>{index + 1}</b>
                          <div className="btnBlink"></div>
                        </div>
                        <div className="moreInfo">
                          <p>{i?.ip}</p>
                          <span>{i?.ping} мс</span>
                          <div className="nums">
                            <img src={monitor} alt="[]" />
                            <p>{i?.num}</p>
                          </div>
                        </div>
                      </div>
                      <p className="comment">{i?.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IpAddresPage;
