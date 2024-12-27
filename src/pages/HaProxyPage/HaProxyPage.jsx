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
import SearchIcon from "@mui/icons-material/Search";

////// components
import ModalsHaProxy from "../../components/HaProxyPage/ModalsHaProxy/ModalsHaProxy";

/////// fns
import { getHaProxyList } from "../../store/reducers/haProxySlice";
import { setModalActionsHaProxy } from "../../store/reducers/haProxySlice";

/////// style
import "./style.scss";

const HaProxyPage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [counts, setCounts] = useState({});
  const [searchText, setSearchText] = useState("");

  const { modalActionsHaProxy } = useSelector((state) => state.haProxySlice);
  const { listHaProxy } = useSelector((state) => state.haProxySlice);

  async function getData() {
    const res = await dispatch(getHaProxyList({})).unwrap(); /// get список HaProxy
    setCounts(res?.counts);
  }

  useEffect(() => {
    getData();
  }, [pathname]);

  function addProxyFN() {
    const obj = { ...modalActionsHaProxy, typeAction: 1, guid: "create" };
    dispatch(
      setModalActionsHaProxy({ ...obj, type: { value: 1, label: "http" } })
    );
  }

  async function editProxy(obj) {
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

  async function delProxy({ guid, domain }) {
    const send = { guid, name: domain, typeAction: 3 };
    dispatch(setModalActionsHaProxy(send));
  }

  function onChange(e) {
    setSearchText(e.target.value);
  }

  async function searchActionFN() {
    if (!!searchText) {
      const send = { value: searchText };
      const res = await dispatch(getHaProxyList(send)).unwrap(); /// get список HaProxy
      setCounts(res?.counts);
    } else {
      getData();
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

        <div className="searchBigData">
          <div>
            <input
              type="text"
              placeholder="Поиск по наименованию"
              value={searchText}
              onChange={onChange}
            />
            {!!searchText && (
              <button onClick={() => setSearchText("")} className="clear">
                <img src={krestIcon} alt="x" />
              </button>
            )}
          </div>
          <button className="search" onClick={searchActionFN}>
            <SearchIcon />
            <p>Поиск</p>
          </button>
        </div>
      </div>

      <div className="haProxy__inner">
        {listHaProxy?.map((item, index) => (
          <div className="every" key={index}>
            {item?.map((i, index) => {
              const [ip, port] = i?.backend_ip?.split(":");
              return (
                <div
                  className="every__inner"
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
                        <button className="edit" onClick={() => editProxy(i)}>
                          <img src={editIcon} alt="delIcon" />
                        </button>
                        <button className="del" onClick={() => delProxy(i)}>
                          <img src={delIcon} alt="delIcon" />
                        </button>
                      </div>
                    </div>
                    <b>{i?.comment || "..."}</b>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <ModalsHaProxy />
      {/* ///// модалки ha-proxy */}
    </div>
  );
};

export default HaProxyPage;

const getCellColor = (port) => {
  if (port === "443") return "#cb3ebd30"; // Если порт 443, то красный
  if (port === "80") return "rgba(126, 76, 227, 0.189)"; // Если порт 80, то зеленый
};
