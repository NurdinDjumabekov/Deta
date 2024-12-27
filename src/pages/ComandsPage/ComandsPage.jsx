/////// hooks
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

////// components
import { Tooltip } from "@mui/material";
import ModalsComands from "../../components/ComandsPage/ModalsComands/ModalsComands";

////// helpers

////// fns
import {
  getComandsReq,
  performComandsReq,
} from "../../store/reducers/dataCenterSlice";

////// icons
import krestIcon from "../../assets/icons/krest.svg";
import editIcon from "../../assets/icons/edit.svg";
import displayIcon from "../../assets/icons/tv.svg";
import checkCircle from "../../assets/icons/check-circle.svg";
import delIcons from "../../assets/icons/delete.svg";

/////// style
import "./style.scss";
import ConfirmModal from "../../common/ConfirmModal/ConfirmModal";
import { myAlert } from "../../helpers/MyAlert";

const ComandsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [crudComands, setCrudComands] = useState({});

  const { listComands } = useSelector((state) => state.dataCenterSlice);

  const getData = async () => {
    const res = await dispatch(getComandsReq()).unwrap();
    setFilteredList(res);
    setSearchText("");
  };

  useEffect(() => {
    getData();
  }, [pathname]);

  const onChangeSearch = (e) => {
    setSearchText(e.target?.value);
    if (!!!e.target?.value) {
      getData();
    } else {
      const filtered = listComands?.filter((item) =>
        item?.domen_name
          ?.toLowerCase()
          ?.includes(e.target?.value?.toLowerCase())
      );
      setFilteredList(filtered);
    }
  };

  const editComandModal = (item, actionType) => {
    const send = { actionType, ...item };
    setCrudComands(send);
    // 2- редактирование , 4 - выполнение команды
  };

  const performComandsFN = async () => {
    const send = { ...crudComands };
    const res = await dispatch(performComandsReq(send)).unwrap();
    setCrudComands({});
    if (res == 1) {
      myAlert("Команда выполнена успешно");
      getData();
    }
  };

  return (
    <>
      <div className="comandsPage">
        <div className="comandsPage__inner">
          <div className="header">
            <button
              className="create"
              onClick={() => setCrudComands({ actionType: 1 })}
            >
              +
            </button>
            <div className="searchBigData">
              <input
                type="text"
                placeholder="Поиск команд"
                value={searchText}
                onChange={onChangeSearch}
              />
              {!!searchText && (
                <button onClick={getData}>
                  <img src={krestIcon} alt="x" />
                </button>
              )}
            </div>
          </div>
          <div className="body">
            <div className="list">
              {filteredList?.map((item) => (
                <div className="every" key={item?.guid}>
                  <div className="actions">
                    <Tooltip title="Выполнить команду" placement="right">
                      <button
                        onClick={() => editComandModal(item, 4)}
                        className="edit"
                      >
                        <img src={checkCircle} alt="editIcon" />
                      </button>
                    </Tooltip>
                    <Tooltip title="Редактировать" placement="right">
                      <button
                        onClick={() => editComandModal(item, 2)}
                        className="edit"
                      >
                        <img src={editIcon} alt="editIcon" />
                      </button>
                    </Tooltip>
                    <Tooltip title="Удалить" placement="right">
                      <button
                        onClick={() => editComandModal(item, 3)}
                        className="edit"
                      >
                        <img src={delIcons} alt="editIcon" />
                      </button>
                    </Tooltip>
                  </div>
                  <div className="mainInfo">
                    <div className="ip_address">
                      <img className="iconDisplay" src={displayIcon} alt="" />
                      <p>{item?.ip_address}</p>
                    </div>
                    <p className="password">Логин: {item?.username}</p>
                    <p className="password">Пароль: {item?.password}</p>
                    <p className="port">Порт: {item?.port}</p>
                  </div>

                  <div className="moreInfoCommands">
                    <p className="command">{item?.command}</p>
                    <p className="description">{item?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ModalsComands
        setCrudComands={setCrudComands}
        crudComands={crudComands}
        getData={getData}
      />

      {/* для выполнения команды */}
      <ConfirmModal
        state={crudComands?.actionType == 4}
        title={"Выполнить команду ?"}
        yes={performComandsFN}
        no={() => setCrudComands({})}
      />
    </>
  );
};

export default ComandsPage;
