import React from "react";
import { useDispatch, useSelector } from "react-redux";

/////// imgs
import container from "../../../assets/icons//menu/box.svg";
import edit from "../../../assets/icons/edit.svg";
import editBlue from "../../../assets/icons/editBlue.svg";
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

////// fns
import { setTemporaryContainer } from "../../../store/reducers/stateSlice";
import { setActiveContainer } from "../../../store/reducers/stateSlice";

////// components
import MemoryComp from "../MemoryComp/MemoryComp";

const Containers = ({ item }) => {
  const { id, host_name, container_name, description } = item;
  const { key, del, percent, GB, guid } = item;
  /////
  const { vm_id, vm_name, vm_comment } = item;
  const { vm_cpu_usage, vm_cpu, vm_ram_usage_mb, vm_ram_mb } = item;

  const dispatch = useDispatch();

  const { activeContainer } = useSelector((state) => state.stateSlice);

  const clickContainer = () => dispatch(setActiveContainer(guid));

  const openModalEdit = () => {
    //// открываю модалку для редактирования и подставля. во временный state данные
    dispatch(setTemporaryContainer({ guid, vm_comment }));
  };

  const active = activeContainer == guid ? "containerActive" : "";

  return (
    <div className={`containerMain ${active}`} onClick={clickContainer}>
      <div className="containerMain__inner">
        <div className="numIndex">
          <div>
            <img src={container} alt="[]" />
            <p>{vm_id}</p>
          </div>
        </div>
        <div>
          <button className="edit" onClick={openModalEdit}>
            <img src={edit} alt="" />
          </button>
          <button className="edit">
            <img src={editBlue} alt="" />
          </button>
        </div>
        <div className="mainInfo">
          <div>
            <b className="hostName">[{host_name}] </b>
            <p className="container_name"> - {vm_name}</p>
          </div>
          <span className="description">{vm_comment}</span>
        </div>
      </div>

      <div className="GB__block">
        <div className="memory">
          <button>
            <img src={skrepka} alt="#" />
          </button>
          <MemoryComp
            node_cpu_usage={vm_cpu_usage}
            node_cpu={vm_cpu}
            node_ram_usage={vm_ram_usage_mb}
            node_ram_mb={vm_ram_mb}
            array_storages={[]}
          />
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
          </div>
          <div className={`key ${!del ? "actions__key" : ""}`}>
            <p>({key})</p>
            {del && <button className="deleteBtn">Удалить</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Containers;
