//////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

//////// components
import MyInputs from "../../../common/MyInput/MyInputs";
import Selects from "../../../common/Selects/Selects";

/////// helpers
import { listDnsMenu } from "../../../helpers/LocalData";

/////// fns
import { setActiveDnsMenu } from "../../../store/reducers/stateSlice";

/////// style
import "./style.scss";
import AddSubDns from "../AddSubDns/AddSubDns";
import AddChame from "../AddChame/AddChame";
import AddMXChame from "../AddMXChame/AddMXChame";
import AddNSChame from "../AddNSChame/AddNSChame";
import AddTXTChame from "../AddTXTChame/AddTXTChame";
import AddRTRChame from "../AddRTRChame/AddRTRChame";
import AddSPFChame from "../AddSPFChame/AddSPFChame";

const TypeAddDns = () => {
  const dispatch = useDispatch();

  const { dnsList, activeDnsMenu } = useSelector((state) => state.stateSlice);

  const clickMenuDns = (id) => dispatch(setActiveDnsMenu(id));

  const objComp = {
    1: <AddSubDns obj={"one"} />,
    2: <AddChame obj={"two"} />,
    3: <AddMXChame obj={"three"} />,
    4: <AddNSChame obj={"four"} />,
    5: <AddTXTChame obj={"five"} />,
    6: <AddRTRChame obj={"six"} />,
    7: <AddSPFChame obj={"seven"} />,
  };

  return (
    <div className="addTypeDns">
      <ul className="addTypeDns__menu">
        {listDnsMenu?.map((item) => (
          <li
            className={activeDnsMenu === item?.id ? "activeMenu" : ""}
            key={item?.id}
            onClick={() => clickMenuDns(item?.id)}
          >
            {item?.name}
          </li>
        ))}
      </ul>
      <div className="sendData">{objComp?.[activeDnsMenu]}</div>
    </div>
  );
};

export default TypeAddDns;
