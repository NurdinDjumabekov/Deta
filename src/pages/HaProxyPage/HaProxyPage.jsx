/////// hooks
import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

////// helpers
import { listProtocols } from "../../helpers/LocalData";

////// imgs
import delIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import krestIcon from "../../assets/icons/krest.svg";
import redirectIcon from "../../assets/icons/haproxy/redirect.svg";
import SearchIcon from "@mui/icons-material/Search";
import LockIcon from "@mui/icons-material/HttpsTwoTone";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import iconsCircle from "../../assets/icons/circleWhite.svg";
import ClearIcon from "@mui/icons-material/Clear";
import CachedIcon from "@mui/icons-material/Cached";

////// components
import ModalsHaProxy from "../../components/HaProxyPage/ModalsHaProxy/ModalsHaProxy";
import { Tooltip } from "@mui/material";

/////// fns
import {
  crudHaProxyReq,
  getHaProxyList,
  saveHaProxyReq,
} from "../../store/reducers/haProxySlice";
import { setModalActionsHaProxy } from "../../store/reducers/haProxySlice";

/////// style
import "./style.scss";
import { myAlert } from "../../helpers/MyAlert";
import ConfirmModal from "../../common/ConfirmModal/ConfirmModal";

const HaProxyPage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [counts, setCounts] = useState({});
  const [searchText, setSearchText] = useState("");

  const { modalActionsHaProxy } = useSelector((state) => state.haProxySlice);
  const { listHaProxy } = useSelector((state) => state.haProxySlice);

  const [saveHaProxy, setSaveHaProxy] = useState(false);
  const [confirmSave, setConfirmSave] = useState(false);

  async function getData() {
    const res = await dispatch(getHaProxyList({})).unwrap(); /// get список HaProxy
    setCounts(res?.counts);
    setSearchText("");
  }

  useEffect(() => {
    getData();
  }, [pathname]);

  function addProxyFN() {
    const obj = { ...modalActionsHaProxy, typeAction: 1, guid: "create" };
    dispatch(
      setModalActionsHaProxy({ ...obj, type: { value: 1, label: "http" } })
    );
    setSaveHaProxy(true);
  }

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
    setSaveHaProxy(true);
  }

  function delProxy({ guid, domain }) {
    const send = { guid, name: domain, typeAction: 3 };
    dispatch(setModalActionsHaProxy(send));
    setSaveHaProxy(true);
  }

  function redirectProxy({ guid, redirect_domen, backend_ip, type_security }) {
    const send = {
      guid,
      name: redirect_domen,
      ip_addres: backend_ip,
      typeAction: 4,
    };
    dispatch(setModalActionsHaProxy({ ...send, type_security }));
    setSaveHaProxy(true);
  }

  function blockProxy({ guid, domain, redirect_ip, block }, mainNum) {
    const send = {
      guid,
      name: domain,
      ip_addres: redirect_ip,
      typeAction: 5,
      block: mainNum == 1 ? 1 : block == 1 ? 0 : 1,
    };
    dispatch(setModalActionsHaProxy(send));
    setSaveHaProxy(true);
  }

  function delRedirecProxy({ guid, backend_ip }) {
    const send = { guid, name: "", ip_addres: backend_ip, typeAction: 6 };
    dispatch(setModalActionsHaProxy(send));
    setSaveHaProxy(true);
  }

  function onChange(e) {
    setSearchText(e.target.value);
  }

  async function searchActionFN(e) {
    e.preventDefault();
    if (!!searchText) {
      const send = { value: searchText };
      const res = await dispatch(getHaProxyList(send)).unwrap(); /// get список HaProxy
      setCounts(res?.counts);
    } else getData();
  }

  async function reloadHaProxy(item) {
    const { check, domain, backend_ip, type_security } = item;
    const { comment, guid } = item;
    const send = {
      checkType: check,
      comment,
      guid,
      ip_addres: backend_ip,
      name: domain,
      type: type_security,
      typeAction: 2,
      status: false,
    };

    const res = await dispatch(crudHaProxyReq(send)).unwrap();
    if (res == 1) getData();
  }

  async function saveSettingsFN() {
    dispatch(saveHaProxyReq({}));
    const res = await dispatch(saveHaProxyReq({})).unwrap();
    if (res == 1) {
      setSaveHaProxy(false);
      myAlert("Настройки сохранены");
      setConfirmSave(false);
    }
  }

  return (
    <div className="haProxy">
      <div className="haProxy__menu">
        <div className="info">
          <button className="addBtn" onClick={addProxyFN}>
            +
          </button>
          <div>
            <p>Всего:</p>
            <span>{counts?.all}</span>
          </div>

          <div>
            <p>Вкл:</p>
            <span className="on">{counts?.active}</span>
          </div>

          <div>
            <p>Выкл:</p>
            <span className="off">{counts?.de_active}</span>
          </div>

          <div className="port80">
            <span></span>
            <p> - 80 порт</p>
          </div>

          <div className="port80 port443">
            <span></span>
            <p> - 443 порт</p>
          </div>
        </div>

        {true && (
          <button
            className="btnAction saveSettings"
            onClick={() => setConfirmSave(true)}
          >
            <p>Сохранить настройки</p>
          </button>
        )}

        <div className="searchBigData">
          <form onSubmit={searchActionFN}>
            <input
              type="text"
              placeholder="Поиск по наименованию"
              value={searchText}
              onChange={onChange}
            />
            {!!searchText && (
              <div onClick={getData} className="clear">
                <img src={krestIcon} alt="x" />
              </div>
            )}
            <button className="search" type="submit">
              <SearchIcon />
              <p>Поиск</p>
            </button>
          </form>
        </div>
      </div>

      <div className="haProxy__inner">
        {listHaProxy?.map((item, index) => (
          <div className="every" key={index}>
            {item?.map((i, index) => {
              const [ip, port] = i?.backend_ip?.split(":");
              return (
                <div
                  className={`every__inner ${!!i?.block ? "blockProxy" : ""}`}
                  style={{ background: getCellColor(port) }}
                  key={index}
                >
                  <div
                    className={`btnBlink ${
                      !!i?.ping_status ? "offHaproxy" : "onHaproxy"
                    }`}
                  ></div>
                  <div className="every__inner__data">
                    <div className="action">
                      <div>
                        <p>{i?.domain}</p>
                        <span>
                          {ip}:{port}
                        </span>
                      </div>
                      <div>
                        {/* <Tooltip title="Обновить" placement="top">
                          <button
                            className="reload"
                            onClick={() => reloadHaProxy(i)}
                          >
                            <CachedIcon
                              sx={{ fill: "#fff", width: 20, height: 20 }}
                            />
                          </button>
                        </Tooltip> */}
                        <Tooltip title="Редактировать" placement="top">
                          <button className="edit" onClick={() => editProxy(i)}>
                            <img src={editIcon} alt="delIcon" />
                          </button>
                        </Tooltip>
                        <Tooltip title="Удалить запись" placement="top">
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
                        <Tooltip title="Перенаправление" placement="top">
                          <button
                            className="redirect"
                            onClick={() => redirectProxy(i)}
                          >
                            <img src={redirectIcon} alt="delIcon" />
                          </button>
                        </Tooltip>
                        {/* {!!i?.block && (
                          <Tooltip title="Разблокировка" placement="top">
                            <button
                              className="blockOpen"
                              onClick={() => blockProxy(i)}
                            >
                              <img src={iconsCircle} alt="iconsCircle" />
                            </button>
                          </Tooltip>
                        )} */}
                        <Tooltip title="Блокировка" placement="top">
                          <button
                            className="block"
                            onClick={() => blockProxy(i, 1)}
                          >
                            <LockIcon
                              sx={{
                                fill: "#9cddfd",
                                width: 19,
                                height: 19,
                              }}
                            />
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                    {i?.redirect_domen && (
                      <div
                        className="action redirectMain"
                        style={{ paddingRight: 5, paddingBottom: 5 }}
                      >
                        <button
                          className="redirect"
                          // onClick={() => redirectProxy(i)}
                        >
                          <img src={redirectIcon} alt="delIcon" />
                        </button>
                        <div>
                          <p>{i?.redirect_domen}</p>
                        </div>
                        <Tooltip
                          title="Отменить перенаправление"
                          placement="top"
                        >
                          <button
                            className="del"
                            onClick={() => delRedirecProxy(i)}
                          >
                            <ClearIcon
                              sx={{ width: 20, height: 20, fill: "red" }}
                            />
                          </button>
                        </Tooltip>
                      </div>
                    )}
                    {i?.redirect_ip && (
                      <div
                        className="action redirectMain"
                        style={{ paddingRight: 5, paddingBottom: 5 }}
                      >
                        <LockIcon
                          sx={{
                            fill: "#9cddfd",
                            width: 19,
                            height: 19,
                          }}
                        />
                        <div>
                          <span>{i?.redirect_ip}</span>
                        </div>
                        <Tooltip title="Отменить блокировку" placement="top">
                          <button
                            className="blockOpen"
                            onClick={() => blockProxy(i)}
                          >
                            <ClearIcon
                              sx={{ width: 20, height: 20, fill: "red" }}
                            />
                          </button>
                        </Tooltip>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <ModalsHaProxy />
      {/* ///// модалки ha-proxy */}

      {/* для удаления перенаправлениЯ */}
      <ConfirmModal
        state={confirmSave}
        title={`Сохранить настройки ?`}
        yes={saveSettingsFN}
        no={() => setConfirmSave(false)}
      />
    </div>
  );
};

export default HaProxyPage;

const getCellColor = (port) => {
  if (port === "443") return "#cb3ebd30"; // Если порт 443, то красный
  if (port === "80") return "rgba(126, 76, 227, 0.189)"; // Если порт 80, то зеленый
};
