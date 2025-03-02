/////// hooks
import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

////// helpers
import { listProtocols } from "../../../helpers/LocalData";

////// imgs
import delIcon from "../../../assets/icons/delete.svg";
import editIcon from "../../../assets/icons/edit.svg";
import redirectIcon from "../../../assets/icons/haproxy/redirect.svg";
import LockIcon from "@mui/icons-material/HttpsTwoTone";
import ClearIcon from "@mui/icons-material/Clear";

////// components
import { Tooltip } from "@mui/material";

/////// fns
import { setModalActionsHaProxy } from "../../../store/reducers/haProxySlice";

/////// style
import "./style.scss";

const EveryHaProxy = ({ i }) => {
  const dispatch = useDispatch();
  const { modalActionsHaProxy } = useSelector((state) => state.haProxySlice);

  if (!!!i?.guid) return null;

  function editProxy(obj) {
    const { guid, check, domain, comment, backend_ip, type_security } = obj;
    const objType = listProtocols?.find(({ value }) => value == type_security);
    const send = {
      ...modalActionsHaProxy,
      guid,
      name: domain,
      comment,
      checkType: check,
      ip_addres: backend_ip,
      typeAction: 2,
      type: { value: type_security, label: objType?.label },
    };
    dispatch(setModalActionsHaProxy(send));
  }

  function delProxy({ guid, domain }) {
    const send = { guid, name: domain, typeAction: 3 };
    dispatch(setModalActionsHaProxy(send));
  }

  function redirectProxy({ guid, redirect_domen, backend_ip, type_security }) {
    const send = {
      guid,
      name: redirect_domen,
      ip_addres: backend_ip,
      typeAction: 4,
    };
    dispatch(setModalActionsHaProxy({ ...send, type_security }));
  }

  function blockProxy({ guid, domain, redirect_ip, block }, mainNum) {
    const send = {
      guid,
      name: domain,
      ip_addres: redirect_ip,
      typeAction: 5,
      block: !!mainNum ? 1 : block == 1 ? 0 : 1,
    };
    dispatch(setModalActionsHaProxy(send));
  }

  function delRedirecProxy({ guid, backend_ip }) {
    const send = { guid, name: "", ip_addres: backend_ip, typeAction: 6 };
    dispatch(setModalActionsHaProxy(send));
  }

  const [ip, port] = i?.backend_ip?.split(":");
  return (
    <td
      style={{
        background: getCellColor(port),
        borderTop: "1px solid gray",
        borderRight: "1px solid gray",
      }}
    >
      <div className={`everyHaProxy ${!!i?.block ? "blockProxy" : ""}`}>
        <div
          className={`btnBlink ${
            !!i?.ping_status ? "offHaproxy" : "onHaproxy"
          }`}
        />
        <div className="everyHaProxy__data">
          <div className="action">
            <div>
              <p>{i?.domain}</p>
              <span>
                {ip}:{port}
              </span>
            </div>
            <div>
              <Tooltip title="Редактировать" placement="top-end">
                <button className="edit" onClick={() => editProxy(i)}>
                  <img src={editIcon} alt="delIcon" />
                </button>
              </Tooltip>
              <Tooltip title="Удалить запись" placement="top-end">
                <button className="del" onClick={() => delProxy(i)}>
                  <img src={delIcon} alt="delIcon" />
                </button>
              </Tooltip>
            </div>
          </div>
          <div className="action">
            <div>
              <b>{i?.comment || "..."}</b>
            </div>
            <div>
              <Tooltip title="Перенаправление" placement="top-end">
                <button className="redirect" onClick={() => redirectProxy(i)}>
                  <img src={redirectIcon} alt="delIcon" />
                </button>
              </Tooltip>
              <Tooltip title="Блокировка" placement="top-end">
                <button className="block" onClick={() => blockProxy(i, 1)}>
                  <LockIcon sx={blueStyle} />
                </button>
              </Tooltip>
            </div>
          </div>
          {i?.redirect_domen && (
            <div
              className="action redirectMain"
              style={{ paddingRight: 5, paddingBottom: 5 }}
            >
              <button className="redirect">
                <img src={redirectIcon} alt="delIcon" />
              </button>
              <div>
                <p>{i?.redirect_domen}</p>
              </div>
              <Tooltip title="Отменить перенаправление" placement="top-end">
                <button className="del" onClick={() => delRedirecProxy(i)}>
                  <ClearIcon sx={{ width: 20, height: 20, fill: "red" }} />
                </button>
              </Tooltip>
            </div>
          )}
          {i?.redirect_ip && (
            <div
              className="action redirectMain"
              style={{ paddingRight: 5, paddingBottom: 5 }}
            >
              <LockIcon sx={blueStyle} />
              <div>
                <span>{i?.redirect_ip}</span>
              </div>
              <Tooltip title="Отменить блокировку" placement="top-end">
                <button className="blockOpen" onClick={() => blockProxy(i)}>
                  <ClearIcon sx={{ width: 20, height: 20, fill: "red" }} />
                </button>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </td>
  );
};

export default EveryHaProxy;

const getCellColor = (port) => {
  if (port === "443") return "#cb3ebd30"; // Если порт 443, то красный
  if (port === "80") return "rgba(126, 76, 227, 0.189)"; // Если порт 80, то зеленый
};

const blueStyle = {
  fill: "#9cddfd",
  width: 19,
  height: 19,
};
