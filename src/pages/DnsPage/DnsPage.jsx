///// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

////style
import "./style.scss";

//////helpers
import { listDns } from "../../helpers/LocalData";

////// fns
import { setActiveDns } from "../../store/reducers/stateSlice";

////// imgs
import diagramWhite from "../../assets/icons/diagramWhite.svg";
import addicon from "../../assets/icons/add.svg";
import editIcon from "../../assets/icons/edit.svg";
import AddDns from "../../components/DnsPage/AddDns/AddDns";
import InnerDns from "../../components/DnsPage/InnerDns/InnerDns";
import TypeAddDns from "../../components/DnsPage/TypeAddDns/TypeAddDns";

const DnsPage = () => {
  const dispatch = useDispatch();

  const { activeDns } = useSelector((state) => state.stateSlice);

  const clickDns = (id) => dispatch(setActiveDns(id));

  const active = activeDns === 0 ? "activeDns" : "";

  return (
    <div className="dnsMain">
      <div className="dnsMain__add">
        <div className={`dnsMain__add__inner ${active}`}>
          <ul className="listDns">
            {listDns?.map((item, index) => (
              <li
                className={item?.id === activeDns ? "activeDns" : ""}
                key={index}
                onClick={() => clickDns(item?.id)}
              >
                <img src={diagramWhite} alt="%" />
                <p>{item?.name}</p>
              </li>
            ))}
          </ul>
          <div className="actionDns">
            <TypeAddDns />
          </div>
        </div>
      </div>
      <div className="dnsMain__edit">
        <InnerDns />
      </div>
    </div>
  );
};

export default DnsPage;
