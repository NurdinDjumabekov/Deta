/////// hooks
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

////// componnets
import TypeAddDns from "../typesSubDns/TypeAddDns/TypeAddDns";
import ModalsForAllDns from "../ModalsForAllDns/ModalsForAllDns";
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";
import InnerSubDnsActions from "../InnerSubDnsActions/InnerSubDnsActions";
import { FixedSizeList } from "react-window";
import lodashFn from "lodash";

////// imgs
import arrowSort from "../../../assets/icons/arrowSort.svg";
import krestIcon from "../../../assets/icons/krest.svg";
import SearchIcon from "@mui/icons-material/Search";

////// fns
import {
  editStatusSubDomen,
  getDnsSubDomen,
  sortSubDomen,
} from "../../../store/reducers/dnsSlice";

////// style
import "./style.scss";

////// helpers
import { objTitle } from "../../../helpers/LocalData";

const InnerSubDns = () => {
  const dispatch = useDispatch();

  const { listDnsSubDomen } = useSelector((state) => state.dnsSlice);
  const { activeDns } = useSelector((state) => state.stateSlice);

  const [guidEdit, setGuidEdit] = useState(""); // храню временный guid для редактирования
  const [guidDelete, setGuidDelete] = useState(""); // храню временный guid для удаления
  const [editStatus, setEditStatus] = useState({});
  const [tableHeight, setTableHeight] = useState(window.innerHeight - 100);
  const [searchText, setSearchText] = useState("");

  const [objEdit, setObjedit] = useState({
    record_name: "",
    host_ip: "",
    ttl: "",
    ttl_type: 1,
    comment: "",
  }); /// временные данные для редактирования

  const [sort, setSort] = useState(1); // счетчик 1 или 2

  function sortList(field_name) {
    const newSort = sort == "1" ? "2" : "1";
    setSort(newSort);
    const data = { domen_guid: activeDns?.guid, sort: newSort };
    dispatch(sortSubDomen({ ...data, field_name }));
    ///// сортировка данных через запрос
  }

  function editStatusSubDnsFn() {
    ///// изменение статуса dns через запрос
    const { guid } = editStatus;
    const data = { guid, protected: !!!editStatus?.protected };
    const past = { data, setEditStatus, activeDns };
    dispatch(editStatusSubDomen(past));
  }

  function onChange(e) {
    setSearchText(e.target.value);
  }

  function searchActionFN() {
    const send = { guid: activeDns?.guid, domen_name: activeDns?.name };
    if (!!searchText) {
      dispatch(
        getDnsSubDomen({
          guid: activeDns?.guid,
          domen_name: activeDns?.name,
          searchText: searchText,
        })
      ); //// get суб домены этого dns
    } else {
      dispatch(getDnsSubDomen(send));
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const availableHeight = window.innerHeight - 100; // Вычитаем отступы (например, 100px для шапки)
      setTableHeight(availableHeight);
    };

    handleResize(); // Рассчитать при первом рендере
    window.addEventListener("resize", handleResize); // Добавить обработчик изменения размера окна

    return () => {
      window.removeEventListener("resize", handleResize); // Очистить обработчик
    };
  }, []);

  const renderRow = ({ index, style }) => {
    const item = listDnsSubDomen?.[index];

    return (
      <div style={{ ...style, display: "flex" }} className="tableBody">
        <div className="tableCell text nameText" style={{ minWidth: "15%" }}>
          {item?.record_name}
        </div>
        <div className="tableCell text name" style={{ minWidth: "5%" }}>
          {item?.recordType}
        </div>
        <div className="tableCell text name" style={{ minWidth: "5%" }}>
          {item?.ttl}
        </div>
        <div className="tableCell text data" style={{ width: "21%" }}>
          {item?.host_ip}
        </div>
        <div className="tableCell text name" style={{ width: "14%" }}>
          {item?.host_ip_insurance || ""}
        </div>
        <div className="tableCell text name" style={{ width: "14%" }}>
          {!!item?.active_status ? (
            <p className="yes">Active</p>
          ) : (
            <p className="no">Disactive</p>
          )}
        </div>
        <div className="tableCell text actions" style={{ width: "8%" }}>
          <InnerSubDnsActions
            row={item}
            setGuidEdit={setGuidEdit}
            setGuidDelete={setGuidDelete}
            setEditStatus={setEditStatus}
            setObjedit={setObjedit}
          />
        </div>
        <div className="tableCell text comment" style={{ width: "18%" }}>
          {item?.comment}
        </div>
      </div>
    );
  };

  return (
    <div className="blockSubDomen">
      <div className="searchBigData">
        <div>
          <input
            type="text"
            placeholder="Поиск по наименованию суб домена"
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
      <div className="tableEditDns hoverScroll">
        <div className="tableHeader">
          <div
            className="tableCell"
            style={{ minWidth: "15%" }}
            onClick={() => sortList("domen_name")}
          >
            Name
            <img src={arrowSort} alt=">" />
          </div>
          <div
            className="tableCell"
            style={{ minWidth: "5%" }}
            onClick={() => sortList("recordType")}
          >
            Types
            <img src={arrowSort} alt=">" />
          </div>
          <div className="tableCell" style={{ minWidth: "5%" }}>
            TTL
          </div>
          <div className="tableCell" style={{ width: "21%" }}>
            Data
          </div>
          <div className="tableCell" style={{ width: "14%" }}>
            Change
          </div>
          <div className="tableCell" style={{ width: "14%" }}>
            Status
          </div>

          <div className="tableCell" style={{ width: "8%" }}></div>
          <div className="tableCell" style={{ width: "18%" }}>
            Comments
          </div>
        </div>

        <FixedSizeList
          height={tableHeight - 145} // Высота области видимости
          itemCount={listDnsSubDomen?.length} // Количество элементов
          itemSize={31} // Высота одного элемента
          width={800} // Ширина таблицы
        >
          {renderRow}
        </FixedSizeList>
      </div>

      <TypeAddDns />

      {/* //// модалки для удвления и именения sуб доменов  */}
      <ModalsForAllDns
        guidEdit={guidEdit}
        setGuidEdit={setGuidEdit}
        guidDelete={guidDelete}
        setGuidDelete={setGuidDelete}
        objEdit={objEdit}
        setObjedit={setObjedit}
      />

      {/* для редактирования статуса  */}
      <ConfirmModal
        state={!!editStatus?.guid}
        title={objTitle?.[editStatus?.protected || 0]}
        yes={editStatusSubDnsFn}
        no={() => setEditStatus({})}
      />
    </div>
  );
};

export default InnerSubDns;
