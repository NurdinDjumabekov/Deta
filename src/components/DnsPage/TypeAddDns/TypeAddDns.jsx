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
import AddDns from "../AddDns/AddDns";
import AddChame from "../AddChame/AddChame";

const TypeAddDns = () => {
  const dispatch = useDispatch();

  const { dnsList, activeDnsMenu } = useSelector((state) => state.stateSlice);

  console.log(dnsList, "dnsList");

  const clickMenuDns = (id) => dispatch(setActiveDnsMenu(id));

  const objComp = {
    1: <AddDns obj={"one"} />,
    2: <AddChame obj={"two"} />,
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
