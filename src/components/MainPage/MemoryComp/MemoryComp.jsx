import React from "react";

////// style
import "./style.scss";

///// imgs
import materinka from "../../../assets/images/materinka.png";
import plata from "../../../assets/images/plata.png";
import dataBaseIcon from "../../../assets/images/memoryImgs/database.png";
import backupIcon from "../../../assets/images/memoryImgs/backup.png";
import hostingIcon from "../../../assets/images/memoryImgs/hosting.png";

////// helpers
import { percentColor } from "../../../helpers/percentColor";
import DataBases from "../../../iconsComponents/DataBases/DataBases";
import { cutNums } from "../../../helpers/cutNums";

const MemoryComp = (props) => {
  const { node_cpu_usage, node_cpu } = props;
  const { node_ram_usage, node_ram_mb } = props;
  const { array_storages } = props;

  const node_ram_usage_new = cutNums(+node_ram_usage / 1024, 2);
  const node_ram_mb_new = cutNums(+node_ram_mb / 1024, 2);
  const all_node_ram = `${node_ram_usage_new}GiB / ${node_ram_mb_new}GiB`;

  const color_ram = (+node_ram_usage * 100) / +cutNums(+node_ram_mb, 2);

  const objImgs = {
    1: hostingIcon,
    2: dataBaseIcon,
    3: backupIcon,
    4: dataBaseIcon,
  };

  return (
    <div className="memoryBlock">
      <div className="cpu">
        <img src={materinka} alt="" />
        <div className="blockProPercent">
          <div
            className="percent"
            style={{
              width: `${cutNums(+node_cpu_usage * 100)}%`,
              background: percentColor(`${+node_cpu_usage * 100} %`),
            }}
          ></div>
          <p className="info">
            {cutNums(+node_cpu_usage * 100, 1)} % / {node_cpu} cpu
          </p>
        </div>
      </div>
      <div className="GB">
        <img src={plata} alt="" />
        <div className="blockProPercent">
          <div
            className="percent"
            style={{
              width: `${color_ram}%`,
              background: percentColor(`${color_ram}%`),
            }}
          />
          <p className="info">{all_node_ram}</p>
        </div>
      </div>

      {array_storages?.length !== 0 && (
        <div className="comps">
          {array_storages?.map((item) => (
            <DataBases
              percent={`${+item?.storage_used_fraction * 100}%`}
              img={objImgs?.[item?.tipe_id]}
              more={item?.storage_name}
              key={item?.guid}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MemoryComp;
