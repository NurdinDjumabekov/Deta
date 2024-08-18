/////// hooks
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// imgs
import delImg from "../../../assets/icons/delete.svg";
import diagram from "../../../assets/icons/diagram.svg";
import repeat from "../../../assets/icons/repeat.svg";
import editImg from "../../../assets/icons/edit.svg";

////// styles
import "./style.scss";

/////// fns
import { setTemporaryHosts } from "../../../store/reducers/stateSlice";
import { setGuidHostDel } from "../../../store/reducers/stateSlice";
import { setGuidHostEdit } from "../../../store/reducers/stateSlice";
import { getContainers } from "../../../store/reducers/requestSlice";
import { secondsToDhms } from "../../../helpers/secondsToDhms";
import MemoryComp from "../MemoryComp/MemoryComp";

const Hosts = ({ item }) => {
  const { host_ip, node_comment, host_status, vmbr } = item;
  const { host_name, node_uptime_sec, guid, guid_node } = item;
  const { array_storages, node_model, node_cpu_usage } = item;
  const { node_cpu, node_ram_usage, node_ram_mb } = item;

  const dispatch = useDispatch();

  const { activeHost } = useSelector((state) => state.stateSlice);

  const listVmbr = vmbr?.split(",");

  const clickHost = () => dispatch(getContainers(guid));
  //// выбор хоста для получения контейнеров связанных с этим хостом

  const editOpenModal = () => {
    const obj = { host_name, guid_node, node_model, array_storages };
    dispatch(setTemporaryHosts({ ...obj, listVmbr }));
    /// временно хранение данных для редактирования
    dispatch(setGuidHostEdit(guid_node));
    //// для открытия модалки
  };

  const err = host_status == 5 ? "lineError" : "";

  const active = activeHost == guid ? "activeHost" : "";

  return (
    <>
      <div className={`hostsMain ${err} ${active}`} onClick={clickHost}>
        <h4>{node_model}</h4>
        <div className="actions">
          <p>
            {host_name}(<b>{secondsToDhms(node_uptime_sec)}</b>)
          </p>

          <div className="actions">
            <button>
              <img src={repeat} alt="x" />
              <span className="moreInfo">Обновить данные хоста</span>
            </button>
            <button className="edit" onClick={editOpenModal}>
              <img src={editImg} alt="x" />
              <span className="moreInfo">Изменить</span>
            </button>
            <button
              className="del"
              onClick={() => dispatch(setGuidHostDel(true))}
            >
              <img src={delImg} alt="x" />
              <span className="moreInfo">Удалить</span>
            </button>
          </div>
        </div>

        <div className="vmbrBlock">
          {listVmbr?.map((item, index) => (
            <div key={index}>
              <p>vmbr {index}</p>
              <img src={diagram} alt="0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <p className="ip_host">{host_ip}</p>

        <MemoryComp
          node_cpu_usage={node_cpu_usage}
          node_cpu={node_cpu}
          node_ram_usage={node_ram_usage}
          node_ram_mb={node_ram_mb}
          array_storages={array_storages}
        />

        <p className="comment">{node_comment}</p>
      </div>
    </>
  );
};

export default Hosts;
