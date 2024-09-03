/////// hooks
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

////style
import "./style.scss";

//////helpers
import { list_haProxy, objDefault } from "../../helpers/LocalData";

////// imgs
import delIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";

////// components
import ModalsHaProxy from "../../components/HaProxyPage/ModalsHaProxy/ModalsHaProxy";

/////// fns
import { getHaProxyList } from "../../store/reducers/requestHaProxySlice";
import { setModalActionsHaProxy } from "../../store/reducers/requestHaProxySlice";

const HaProxyPage = () => {
  const dispatch = useDispatch();

  const { modalActionsHaProxy } = useSelector(
    (state) => state.requestHaProxySlice
  );

  useEffect(() => {
    dispatch(getHaProxyList()); /// get список HaProxy
  }, []);

  const addProxy = () => {
    //// вызов модалки для добавления
    const obj = { ...modalActionsHaProxy, typeAction: 1, guid: "create" };
    dispatch(setModalActionsHaProxy(obj));
  };

  const editProxy = ({ guid, name }) => {
    // поменять на item
    //// вызов модалки для редактирования
    const obj = { ...objDefault, guid, name, typeAction: 2 };
    dispatch(setModalActionsHaProxy(obj));
  };

  const delProxy = ({ guid, name }) => {
    //// вызов модалкт для удаления
    dispatch(setModalActionsHaProxy({ guid, name, typeAction: 3 }));
  };

  return (
    <div className="haProxy">
      <div className="haProxy__menu">
        <button className="addBtn" onClick={addProxy}>
          +
        </button>
        <div>
          <p>Всего:</p>
          <span>1000</span>
        </div>
        <div>
          <p>Вкл:</p>
          <span className="on">123</span>
        </div>
        <div>
          <p>Выкл:</p>
          <span className="off">54</span>
        </div>
      </div>
      <div className="haProxy__inner">
        {list_haProxy?.map((item, index) => (
          <div className="every" key={index}>
            {item?.map((i, index) => (
              <div className="every__inner" key={index}>
                <div className={`btnBlink offHaproxy`}></div>
                <div className="every__inner__data">
                  <div className="action">
                    <p>{i?.name}</p>
                    <span>{i?.host}</span>
                    <button className="edit" onClick={() => editProxy(i)}>
                      <img src={editIcon} alt="editIcon" />
                    </button>
                    <button className="del" onClick={() => delProxy(i)}>
                      <img src={delIcon} alt="delIcon" />
                    </button>
                  </div>
                  <b>{i?.desc}</b>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <ModalsHaProxy />
      {/* ///// модалки ha-prohy */}
    </div>
  );
};

export default HaProxyPage;
