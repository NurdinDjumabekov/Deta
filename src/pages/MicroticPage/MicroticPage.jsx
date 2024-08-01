import React from "react";
import { useEffect } from "react";

/////// hooks
import { useDispatch, useSelector } from "react-redux";

/////// fns

/////// img
import edit from "../../assets/icons/edit.svg";

///////style
import "./style.scss";
import NumberTypes from "../../components/MicroticPage/NumberTypes/NumberTypes";
import { listColor, anotherListColor } from "../../helpers/LocalData";
import { getTextColor } from "../../helpers/getBrightness";

///////helpers

///////components

const MicroticPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <div className="microticPage">
      <div className="microticPage__inner">
        <NumberTypes list={listColor} title={"Маршрутизатор"} />
        <div className="list">
          {listColor?.map((item) => (
            <div className="every">
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
          {anotherListColor?.map((item) => (
            <div className="every">
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
