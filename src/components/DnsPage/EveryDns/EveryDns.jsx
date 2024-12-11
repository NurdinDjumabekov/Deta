//////// components
import { TableCell, TableRow } from "@mui/material";

/////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

////// fns
import { getDnsSubDomen } from "../../../store/reducers/dnsSlice";
import { setTemporaryDNS } from "../../../store/reducers/stateSlice";
import { setPastDnsInSubDomen } from "../../../store/reducers/stateSlice";

////// imgs
import diagramWhite from "../../../assets/icons/diagramWhite.svg";
import krestIcon from "../../../assets/icons/krest.svg";

/////// style
import "./style.scss";

const EveryDns = ({ item, setGuidDelete }) => {
  const dispatch = useDispatch();

  const { activeDns, temporaryDNS } = useSelector((state) => state.stateSlice);

  const clickDns = ({ domen_name, guid, server_ttl }) => {
    dispatch(getDnsSubDomen({ guid, domen_name })); //// get суб домены этого dns

    const domenInfo = { domen_name, comment: `${domen_name}${server_ttl}` };
    dispatch(setTemporaryDNS({ ...temporaryDNS, ...domenInfo }));
    //// подставляю данные в stat eдля редактирования данных dns (так же подставляю данные dns)

    dispatch(setPastDnsInSubDomen(`.${domen_name}`));
    // // //// подставляю домен в поля суб домена
  };

  const callDeleteFn = (guid) => setGuidDelete(guid);
  ///// вызов модалки для удаления данных суб домена

  const active = item?.guid == activeDns?.guid ? "activeDns" : "";

  return (
    <TableRow className={`dnsEvery ${active}`} key={item?.guid}>
      <TableCell style={{ width: "80%" }} onClick={() => clickDns(item)}>
        <div className="content">
          <img src={diagramWhite} alt="%" />
          <p>{item?.domen_name}</p>
        </div>
      </TableCell>
      <TableCell className="actions" style={{ width: "10%" }}>
        <div>
          <button
            className="actions__btns krest"
            onClick={() => callDeleteFn(item?.guid)}
          >
            <img src={krestIcon} alt="x" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EveryDns;
