import React from "react";

/////// imgs
import container from "../../../assets/icons//menu/box.svg";
import edit from "../../../assets/icons/edit.svg";
import skrepka from "../../../assets/icons/skrepka.svg";

////
import calendarX from "../../../assets/icons/calendar-x.svg";
import download from "../../../assets/icons/download.svg";
import keyIncon from "../../../assets/icons/key.svg";
import moreInfo from "../../../assets/icons/moreInfo.svg";
import warning from "../../../assets/icons/warning.svg";
import playCircle from "../../../assets/icons/play-circle.svg";
import stopCircle from "../../../assets/icons/stop-circle.svg";
import repeat from "../../../assets/icons/repeat.svg";
import deleteIcon from "../../../assets/icons/delete.svg";

////// styles
import "./style.scss";

////// components
import MemoryComp from "../MemoryComp/MemoryComp";

const Containers = ({ item }) => {
  const { id, host_name, container_name, description } = item;
  const { key, del } = item;

  return (
    <div className="сontainerMain">
      <div className="numIndex">
        <img src={container} alt="[]" />
        <p>{id}</p>
      </div>
      <button className="edit">
        <img src={edit} alt="" />
      </button>
      <div className="mainInfo">
        <div>
          <b className="hostName">[{host_name}] </b>
          <p className="container_name"> - {container_name}</p>
        </div>
        <span className="description">{description}</span>
      </div>

      <div className="GB">
        <div className="memory">
          <button>
            <img src={skrepka} alt="#" />
          </button>
          <MemoryComp />
        </div>

        <div className="actions">
          <div className="actions__inner">
            <button>
              <img src={calendarX} alt="" />
            </button>
            <button>
              <img src={download} alt="" />
            </button>
            <button>
              <img src={keyIncon} alt="" />
            </button>
            <button>
              <img src={moreInfo} alt="" />
            </button>
            <button>
              <img src={playCircle} alt="" />
            </button>
            <button>
              <img src={repeat} alt="" />
            </button>
            <button>
              <img src={stopCircle} alt="" />
            </button>
            <button>
              <img src={warning} alt="" />
            </button>
            {del && (
              <button>
                <img src={deleteIcon} alt="" />
              </button>
            )}
          </div>
          <p>({key})</p>
        </div>
      </div>
    </div>
  );
};

export default Containers;
