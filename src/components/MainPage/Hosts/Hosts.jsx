/////// hooks
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// imgs
import delImg from "../../../assets/icons/delete.svg";
import diagram from "../../../assets/icons/diagram.svg";
import repeat from "../../../assets/icons/repeat.svg";
import editImg from "../../../assets/icons/edit.svg";
import vncImg from "../../../assets/icons/tv.svg";

import proxmoxImg from "../../../assets/images/proxmox.png";

////// styles
import "./style.scss";

/////// fns
import { setTemporaryHosts } from "../../../store/reducers/stateSlice";
import { setListDiagrams } from "../../../store/reducers/stateSlice";
import { setGuidHostDel } from "../../../store/reducers/stateSlice";
import { setGuidHostEdit } from "../../../store/reducers/stateSlice";
import { getContainers } from "../../../store/reducers/requestSlice";

/////// components
import MemoryComp from "../MemoryComp/MemoryComp";

////// helpers
import { secondsToDhms } from "../../../helpers/secondsToDhms";
import { cutNums } from "../../../helpers/cutNums";

const Hosts = ({ item }) => {
  const { host_ip, node_comment, host_status, vmbr, ping_avg } = item;
  const { host_name, node_uptime_sec, guid, guid_node } = item;
  const { array_storages, node_model, node_cpu_usage } = item;
  const { node_cpu, node_ram_usage, node_ram_mb, chart } = item;

  const dispatch = useDispatch();

  const { activeHost } = useSelector((state) => state.stateSlice);

  const listVmbr = vmbr?.split(",");

  const clickHost = () => {
    dispatch(getContainers(guid));
    dispatch(setListDiagrams({ list: chart, node_ram_mb }));
    //// выбор хоста для получения контейнеров связанных с этим хостом
  };

  const editOpenModal = () => {
    const obj = {
      host_name: node_comment,
      guid_node,
      node_model,
      array_storages,
    };
    dispatch(setTemporaryHosts({ ...obj, listVmbr }));
    /// временно хранение данных для редактирования
    dispatch(setGuidHostEdit(guid_node));
    //// для открытия модалки
  };

  const err = host_status == -1 ? "lineError" : "";

  const active = activeHost == guid ? "activeHost" : "";

  return (
    <div className={`hostsMain ${err} ${active}`} onClick={clickHost}>
      <h4>{node_model}</h4>
      <div className="actions">
        <a
          href={`https://${host_ip}:8006`}
          target="_blank"
          className="hostTitle"
        >
          <img src={proxmoxImg} alt="vnc" />
          <p>
            {host_name} (<b>{secondsToDhms(node_uptime_sec)}</b>)
          </p>
        </a>
        <div className="actions">
          <button>
            <img src={repeat} alt="x" />
            <span className="moreInfo">Обновить данные хоста</span>
          </button>
          <button className="edit" onClick={editOpenModal}>
            {/* <BorderColorIcon sx={{ width: 19, height: 19, fill: "yellow" }} /> */}
            <img src={editImg} alt="edit" />
            <span className="moreInfo">Изменить</span>
          </button>
          <button
            className="del"
            onClick={() => dispatch(setGuidHostDel(true))}
          >
            <img src={delImg} alt="x" />{" "}
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

      <div className="ip_address">
        <p className="ip_host">{host_ip}</p>

        <div className="ping">
          <span style={{ color: pingtimeFN(ping_avg) }}>({ping_avg})</span>
          <b style={{ color: pingtimeFN(ping_avg) }}>мс</b>
        </div>
      </div>
      <MemoryComp
        node_cpu_usage={node_cpu_usage}
        node_cpu={node_cpu}
        node_ram_usage={node_ram_usage}
        node_ram_mb={node_ram_mb}
        array_storages={array_storages}
      />

      <p className="comment">{node_comment}</p>
    </div>
  );
};

export default Hosts;

const pingtimeFN = (provider_pingtime) => {
  if (+provider_pingtime < 10 && +provider_pingtime > 0) {
    return "#008000";
  } else if (+provider_pingtime > 10 && +provider_pingtime < 200) {
    return "orange";
  } else if (provider_pingtime == "" || provider_pingtime == 0) {
    return "#ff00008c";
  } else {
    return "#ff00008c";
  }
};
