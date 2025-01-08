/////// hooks
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

////// components
import { Tooltip } from "@mui/material";
import ModalsComands from "../../components/ComandsPage/ModalsComands/ModalsComands";
import ConfirmModal from "../../common/ConfirmModal/ConfirmModal";

////// helpers
import { myAlert } from "../../helpers/MyAlert";

////// fns
import {
  getComandsReq,
  getListVMsInIp,
  performComandsReq,
} from "../../store/reducers/dataCenterSlice";

////// icons
import krestIcon from "../../assets/icons/krest.svg";
import editIcon from "../../assets/icons/edit.svg";
import displayIcon from "../../assets/icons/tv.svg";
import checkCircle from "../../assets/icons/check-circle.svg";
import delIcons from "../../assets/icons/delete.svg";
import services from "../../assets/icons/menu/database.svg";
import container from "../../assets/icons/menu/box2.svg";
import virtualka from "../../assets/icons/tv.svg";

/////// style
import "./style.scss";

const ComandsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [crudComands, setCrudComands] = useState({
    username: "root",
    password: "Afina954120",
    port: 22,
  });

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
    // 2- редактирование , 4 - выполнение команды
    if (actionType == 2) {
      const vm_guid = {
        value: item?.vm_guid,
        label: `${item?.host_name}${item?.vm_name}`,
      };
      dispatch(getListVMsInIp(item?.vm_id));
      const send = { actionType, ...item, vm_guid };
      setCrudComands(send);
    } else {
      const send = { actionType, ...item };
      setCrudComands(send);
    }
  };

  const performComandsFN = async () => {
    const send = { ...crudComands };
    const res = await dispatch(performComandsReq(send)).unwrap();
    setCrudComands({
      username: "root",
      password: "Afina954120",
      port: 22,
    });
    if (res == 1) {
      myAlert("Команда выполнена успешно");
      getData();
    }
  };

  const objStatusType = {
    running: "rgb(70,150,45)",
    stopped: "#514848",
    deleted: "#514848",
  };
  const objTypeImgs = { qemu: virtualka, lxc: container };

  const service_check = false;
  const statusid = "running";
  const typeid = "lxc";

  return (
    <>
      <div className="comandsPage">
        <div className="comandsPage__inner">
          <div className="header">
            <button
              className="create"
              onClick={() => setCrudComands({ ...crudComands, actionType: 1 })}
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
                  <div className="main">
                    <div className="bottom">
                      <div
                        className={`numIndex`}
                        style={{ background: objStatusType?.[statusid] }}
                      >
                        {!!service_check ? (
                          <img src={services} alt="[]" className="services" />
                        ) : (
                          <img src={objTypeImgs?.[typeid]} alt="[]" />
                        )}
                        <p>{item?.vm_id}</p>
                      </div>
                    </div>

                    <div>
                      <div className="mainInfo">
                        <p className="host">{item?.host_name}</p>
                        <p className="vm">- {item?.vm_name}</p>
                      </div>
                      <div className="mainInfo">
                        <p className="password">
                          {item?.username}/{item?.password}
                        </p>
                      </div>
                    </div>

                    <div className="moreInfoCommands">
                      <p className="command">{item?.command}</p>
                      <p className="description">{item?.description}</p>
                    </div>
                  </div>

                  <div className="actions">
                    <Tooltip title="Выполнить команду" placement="top">
                      <button
                        onClick={() => editComandModal(item, 4)}
                        className="edit"
                      >
                        <img src={checkCircle} alt="editIcon" />
                      </button>
                    </Tooltip>
                    <Tooltip title="Редактировать" placement="top">
                      <button
                        onClick={() => editComandModal(item, 2)}
                        className="edit"
                      >
                        <img src={editIcon} alt="editIcon" />
                      </button>
                    </Tooltip>
                    <Tooltip title="Удалить" placement="top">
                      <button
                        onClick={() => editComandModal(item, 3)}
                        className="edit"
                      >
                        <img src={delIcons} alt="editIcon" />
                      </button>
                    </Tooltip>
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
