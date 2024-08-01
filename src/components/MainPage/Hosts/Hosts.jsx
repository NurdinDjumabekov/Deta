import React from "react";

/////// imgs
import del from "../../../assets/icons/delete.svg";
import vmbrImg from "../../../assets/icons/loop.svg";

////// styles
import "./style.scss";
import MemoryComp from "../MemoryComp/MemoryComp";

const Hosts = ({ item }) => {
  const { array_storages, node_model, node_name, vmbr } = item;
  const { host_ip, node_comment, host_status } = item;
  const {} = item;
  console.log(item);

  const lisVmbr = vmbr?.split(",");

  return (
    <div className={`hostsMain ${host_status == 1 ? "lineError" : ""}`}>
      <h4>{node_model || "нету наименования"}</h4>
      <div className="actions">
        <p>
          {node_name}(<b>115d3h2m</b>)
        </p>
        <button>
          <img src={del} alt="x" />
          <span></span>
        </button>
        <button>
          <img src={del} alt="x" />
          <span></span>
        </button>
        <button>
          <img src={del} alt="x" />
          <span></span>
        </button>
        <button>
          <img src={del} alt="x" />
          <span></span>
        </button>
      </div>

      <div className="vmbrBlock">
        {lisVmbr?.map((item, index) => (
          <div>
            <p>vmbr {index}</p>
            <img src={vmbrImg} alt="0" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <p className="ip_host">{host_ip}</p>

      <MemoryComp />

      <p className="comment">{node_comment}</p>
    </div>
  );
};

export default Hosts;
