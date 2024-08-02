import React from "react";

////style
import "./style.scss";

//////helpers
import { list_haProxy } from "../../helpers/LocalData";

////// imgs
import delIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";

const HaProxyPage = () => {
  return (
    <div className="haProxy">
      <div className="haProxy__menu">
        <button className="addBtn">+</button>
        <button className="addBtn save">Сохранить</button>
        <div>
          <p>Всего:</p>
          <span>1000</span>
        </div>
        <div>
          <p>Вкл:</p>
          <span>123</span>
        </div>
        <div>
          <p>Выкл:</p>
          <span>54</span>
        </div>
      </div>
      <div className="haProxy__inner">
        {list_haProxy?.map((item, index) => (
          <div className="every" key={index}>
            {item?.map((i, index) => (
              <div className="every__inner" key={index}>
                <div className={"btnBlink"}></div>
                <div className="every__inner__data">
                  <div className="action">
                    <p>{i?.name}</p>
                    <span>{i?.host}</span>
                    <button className="edit">
                      <img src={editIcon} alt="editIcon" />
                    </button>
                    <button className="del">
                      <img src={delIcon} alt="delIcon" />
                    </button>
                  </div>
                  <b>{i?.desc}</b>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HaProxyPage;
