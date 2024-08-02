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
import { tranformTextInNum } from "../../../helpers/tranformTextInNum";
import { percentNums } from "../../../helpers/percentNums";
import DataBases from "../../../iconsComponents/DataBases/DataBases";

const MemoryComp = ({ percent, GB }) => {
  ///   const percent = { per: "49%", cpu: "56 cpu" };
  /// const GB = { perOne: "600.4 GiBasdasdsad", perAll: "1000.83 GiB" };

  const percentGB = percentNums(
    tranformTextInNum(GB?.perOne),
    tranformTextInNum(GB?.perAll)
  );

  return (
    <div className="memoryBlock">
      <div className="cpu">
        <img src={materinka} alt="" />
        <div className="blockProPercent">
          <div
            className="percent"
            style={{
              width: percent?.per,
              background: percentColor(percent?.per),
            }}
          ></div>
          <p className="info">
            {percent?.per} / {percent?.cpu}
          </p>
        </div>
      </div>
      <div className="GB">
        <img src={plata} alt="" />
        <div className="blockProPercent">
          <div
            className="percent"
            style={{
              width: `${percentGB}%`,
              background: percentColor(percentGB),
            }}
          ></div>
          <p className="info">
            {tranformTextInNum(GB?.perOne)} GiB /{" "}
            {tranformTextInNum(GB?.perAll)} GiB
          </p>
        </div>
      </div>

      <div className="comps">
        <DataBases percent={"21%"} img={dataBaseIcon} more={"local"} />
        <DataBases percent={"34%"} img={dataBaseIcon} more={"storage2"} />
        <DataBases percent={"98%"} img={dataBaseIcon} more={"px-huawei"} />
        <DataBases percent={"56%"} img={backupIcon} more={"local_lvm"} />
        <DataBases percent={"32%"} img={backupIcon} more={"storage2"} />
        <DataBases percent={"78%"} img={hostingIcon} more={"pxmb 105-7"} />
        <DataBases percent={"32%"} img={hostingIcon} more={"pxmb 243-2"} />
      </div>
    </div>
  );
};

export default MemoryComp;
