/////// hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////// componnets
import { Tooltip } from "@mui/material";

////// imgs
import editIcon from "../../../assets/icons/edit.svg";
import krestIcon from "../../../assets/icons/krest.svg";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

////// fns

////// helpers
import { objTitle } from "../../../helpers/LocalData";

////// style
import "./style.scss";

const InnerSubDnsActions = (props) => {
  const { setObjedit, row } = props;
  const { setGuidEdit, setGuidDelete, setEditStatus } = props;

  const { activeDns } = useSelector((state) => state.stateSlice);

  const callEditFN = (obj) => {
    ///// вызов модалки для релактирования данных суб домена
    const text = obj?.record_name == obj?.domen_name ? "" : obj?.record_name;
    const record_name = text?.replace(`.${activeDns?.name}`, "");
    setGuidEdit(obj?.guid); //// активный guid для редактирования
    setObjedit({ ...obj, record_name }); //// временный обьект для редактирования
  };

  const callDeleteFn = (guid) => setGuidDelete(guid);
  ///// вызов модалки для удаления данных суб домена

  const actibonStatus = {
    0: (
      <button
        className="actions__btns krest screpka"
        onClick={() => setEditStatus(row)}
      >
        <LockOpenIcon sx={{ fill: "green" }} />
      </button>
    ),
    1: (
      <button
        className="actions__btns krest screpka"
        onClick={() => setEditStatus(row)}
      >
        <LockIcon sx={{ fill: "#9cddfd" }} />
      </button>
    ),
  };

  return (
    <div className="blockActionsSubDns">
      <button onClick={() => callDeleteFn(row?.guid)}>
        <img src={krestIcon} alt="x" />
      </button>
      {row?.recordType != "SOA" ? (
        <button onClick={() => callEditFN(row)}>
          <img src={editIcon} alt="e" />
        </button>
      ) : (
        <button></button>
      )}
      {row?.recordType == "A" && (
        <Tooltip title={objTitle?.[row?.protected]} placement="top">
          {actibonStatus?.[row?.protected]}
        </Tooltip>
      )}
    </div>
  );
};

export default InnerSubDnsActions;
