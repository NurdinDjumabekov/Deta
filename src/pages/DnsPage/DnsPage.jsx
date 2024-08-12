///// hooks
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////style
import "./style.scss";

//////helpers
import { listDns } from "../../helpers/LocalData";

////// fns
import { setActiveDns } from "../../store/reducers/stateSlice";
import { getDnsDomen, getDnsSubDomen } from "../../store/reducers/requestSlice";

////// imgs
import diagramWhite from "../../assets/icons/diagramWhite.svg";

////// components
import InnerDns from "../../components/DnsPage/InnerDns/InnerDns";
import TypeAddDns from "../../components/DnsPage/TypeAddDns/TypeAddDns";

const DnsPage = () => {
  const dispatch = useDispatch();

  const { activeDns } = useSelector((state) => state.stateSlice);
  const { listDnsDomen } = useSelector((state) => state.requestSlice);

  const clickDns = (guid) => dispatch(getDnsSubDomen(guid));

  const active = activeDns === 0 ? "activeDns" : "";

  useEffect(() => {
    dispatch(getDnsDomen());
  }, []);

  return (
    <div className="dnsMain">
      <div className="dnsMain__add">
        <div className={`dnsMain__add__inner ${active}`}>
          <ul className="listDns">
            {listDnsDomen?.map((item) => (
              <li
                className={item?.guid === activeDns ? "activeDns" : ""}
                key={item?.guid}
                onClick={() => clickDns(item?.guid)}
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
