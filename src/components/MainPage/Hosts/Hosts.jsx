/////// hooks
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// imgs
import delImg from "../../../assets/icons/delete.svg";
import diagram from "../../../assets/icons/diagram.svg";
import repeat from "../../../assets/icons/repeat.svg";
import editImg from "../../../assets/icons/edit.svg";

////// styles
import "./style.scss";

/////// componets
import MemoryComp from "../MemoryComp/MemoryComp";
import Modals from "../../../common/Modals/Modals";
import MyInputs from "../../../common/MyInput/MyInputs";

/////// fns
import { delVmbr, setTemporaryHosts } from "../../../store/reducers/stateSlice";
import { getContainers } from "../../../store/reducers/requestSlice";
import { deleteHost, editHost } from "../../../store/reducers/requestSlice";

const Hosts = ({ item }) => {
  const { node_name, vmbr } = item;
  const { host_ip, node_comment, host_status, id } = item;
  const { percent, GB } = item;
  //////////////
  const { host_name, node_uptime_sec, guid } = item;
  const { array_storages, node_model } = item;
  const { storage_name } = item;

  // console.log(storage_content, "storage_content");

  const [del, setDel] = useState(false);
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  const { activeHost, temporaryHosts } = useSelector(
    (state) => state.stateSlice
  );

  const lisVmbr = vmbr?.split(",");

  const clickHost = () => dispatch(getContainers(guid));
  //// выбор хоста для получения контейнеров связанных с этим хостом

  const delHost = () => dispatch(deleteHost(guid));
  // удаление хоста через запрос

  const editOpenModal = () => {
    setEdit(true);
    const obj = { host_name, guid, node_model, array_storages };
    dispatch(setTemporaryHosts(obj));
  };

  const editHostFN = () => dispatch(editHost(temporaryHosts));
  // редактирование хоста через запрос

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(setTemporaryHosts({ ...temporaryHosts, [name]: value }));
  };

  const err = host_status == 5 ? "lineError" : "";

  const active = activeHost == guid ? "activeHost" : "";

  return (
    <>
      <div className={`hostsMain ${err} ${active}`} onClick={clickHost}>
        <h4>{node_model}</h4>
        <div className="actions">
          <p>
            {host_name}(<b>{node_uptime_sec}</b>)
          </p>

          <div className="actions">
            <button onClick={() => {}}>
              <img src={repeat} alt="x" />
              <span className="moreInfo">Обновить данные хоста</span>
            </button>
            <button className="edit" onClick={editOpenModal}>
              <img src={editImg} alt="x" />
              <span className="moreInfo">Изменить</span>
            </button>
            <button className="del" onClick={() => setDel(true)}>
              <img src={delImg} alt="x" />
              <span className="moreInfo">Удалить</span>
            </button>
          </div>
        </div>

        <div className="vmbrBlock">
          {array_storages?.map((item, index) => (
            <div key={index}>
              <p>vmbr {index}</p>
              <img src={diagram} alt="0" />
              <span>{item?.storage_name}</span>
            </div>
          ))}
        </div>

        <p className="ip_host">{host_ip}</p>

        <MemoryComp percent={percent} GB={GB} />

        <p className="comment">{node_comment}</p>
      </div>

      {/* для удаления  */}
      <Modals
        openModal={del}
        setOpenModal={() => setDel()}
        title={"Удалить данный хост ?"}
      >
        <div className="modalDel">
          <button className="yes" onClick={delHost}>
            Да
          </button>
          <button className="no" onClick={() => setDel("")}>
            Нет
          </button>
        </div>
      </Modals>
      {/* для удаления  */}

      {/* для редактирования  */}
      <Modals
        openModal={edit}
        setOpenModal={() => setEdit()}
        title={"Редактирование хоста"}
      >
        <div className="addDns hostsEdit">
          <div className="second">
            <MyInputs
              title={"Информация :"}
              onChange={onChange}
              name={"record_name"}
              value={temporaryHosts?.host_name}
            />

            <MyInputs
              title={"Модель :"}
              onChange={onChange}
              name={"host_ip"}
              value={temporaryHosts?.node_model}
            />
          </div>

          <h6>vmbr</h6>

          <div className="listHostsStorage">
            {temporaryHosts?.array_storages?.map((item) => (
              <div className="every" key={item?.guid}>
                <p>{item?.storage_name}</p>
                <button className="del" onClick={() => dispatch(delVmbr(item))}>
                  <img src={delImg} alt="x" />
                </button>
              </div>
            ))}
          </div>
          <div className="second actions">
            <button className="addAction" onClick={editHostFN}>
              Сохранить
            </button>
          </div>
        </div>
      </Modals>
      {/* для редактирования  */}
    </>
  );
};

export default Hosts;
