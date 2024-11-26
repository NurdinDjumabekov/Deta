/////// hooks
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

/////// fns

/////// img
import edit from "../../assets/icons/edit.svg";

///////helpers
import { listColor, anotherListColor } from "../../helpers/LocalData";
import { getTextColor } from "../../helpers/getBrightness";

///////components
import NumberTypes from "../../components/MicroticPage/NumberTypes/NumberTypes";

///////style
import "./style.scss";

const MicroticPage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {}, [pathname]);

  return (
    <div className="microticPage">
      <div className="microticPage__inner">
        <NumberTypes list={listColor} title={"Маршрутизатор"} />
        <div className="list">
          {listColor?.map((item, index) => (
            <div className="every" key={index}>
              <div
                className="colors"
                style={{
                  background: item.color,
                  color: getTextColor(item.color),
                }}
              >
                <p>{item?.num}</p>
              </div>
              <button>
                <img src={edit} alt="edit" />
              </button>
              <div className="texts">
                <p>{item?.description}</p>
                <span>{item?.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="microticPage__inner">
        <NumberTypes list={anotherListColor} title={"Свитч"} />
        <div className="list">
          {anotherListColor?.map((item, index) => (
            <div className="every" key={index}>
              <div
                className="colors"
                style={{
                  background: item.color,
                  color: getTextColor(item.color),
                }}
              >
                <p>{item?.num}</p>
              </div>
              <button>
                <img src={edit} alt="edit" />
              </button>
              <div className="texts">
                <p>{item?.description}</p>
                <span>{item?.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MicroticPage;
