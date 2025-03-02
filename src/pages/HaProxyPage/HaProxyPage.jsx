import React, { useEffect, useState, useMemo, useCallback } from "react";
import { TableVirtuoso } from "react-virtuoso";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import EveryHaProxy from "../../components/HaProxyPage/EveryHaProxy/EveryHaProxy";
import ModalsHaProxy from "../../components/HaProxyPage/ModalsHaProxy/ModalsHaProxy";
import {
  clearListHaProxy,
  getHaProxyList,
  setModalActionsHaProxy,
} from "../../store/reducers/haProxySlice";

////// icons
import krestIcon from "../../assets/icons/krest.svg";
import SearchIcon from "@mui/icons-material/Search";

///// style
import "./style.scss";

const HaProxyPage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [counts, setCounts] = useState({});
  const [searchText, setSearchText] = useState("");
  const [confirmSave, setConfirmSave] = useState(false);

  const { modalActionsHaProxy, listHaProxy } = useSelector(
    (state) => state.haProxySlice
  );

  const list = useMemo(() => listHaProxy, [listHaProxy]);

  async function getData(value) {
    const check = !!value ? { value } : {};
    const res = await dispatch(getHaProxyList(check)).unwrap();
    setCounts(res?.counts);
  }

  useEffect(() => {
    getData();

    return () => dispatch(clearListHaProxy());
  }, [pathname]);

  const addProxyFN = useCallback(() => {
    const obj = {
      ...modalActionsHaProxy,
      typeAction: 1,
      guid: "create",
      type: { value: 1, label: "http" },
    };
    dispatch(setModalActionsHaProxy(obj));
  }, [dispatch, modalActionsHaProxy]);

  const onChange = useCallback((e) => {
    setSearchText(e.target.value);
  }, []);

  async function searchActionFN(e) {
    e.preventDefault();
    if (!!searchText) getData(searchText);
    else getData();
  }

  async function searchClearFN(e) {
    e.preventDefault();
    getData();
    setSearchText("");
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

        <button
          className="btnAction saveSettings"
          onClick={() => setConfirmSave(true)}
        >
          <p>Сохранить настройки</p>
        </button>

        <div className="searchBigData">
          <form onSubmit={searchActionFN}>
            <input
              type="text"
              placeholder="Поиск по наименованию"
              value={searchText}
              onChange={onChange}
            />
            {!!searchText && (
              <div onClick={searchClearFN} className="clear">
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
        {/* <p className="laoder">nurdin nurdin</p> */}
        <div className="haProxy__inner__data">
          <TableVirtuoso
            style={{ height: "100%", width: "100%" }}
            data={list}
            overscan={200} //  Подгружаем элементы заранее
            itemContent={(index, item) => (
              <React.Fragment key={index}>
                <EveryHaProxy i={item?.one} />
                <EveryHaProxy i={item?.two} />
                <EveryHaProxy i={item?.three} />
                <EveryHaProxy i={item?.four} />
                <EveryHaProxy i={item?.five} />
                <EveryHaProxy i={item?.six} />
              </React.Fragment>
            )}
          />
        </div>
      </div>

      <ModalsHaProxy
        confirmSave={confirmSave}
        setConfirmSave={setConfirmSave}
        getData={getData}
        searchText={searchText}
      />
    </div>
  );
};

export default HaProxyPage;
