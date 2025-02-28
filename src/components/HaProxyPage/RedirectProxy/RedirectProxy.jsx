//////// hooks
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

///// components
import MySelects from "../../../common/MySelects/MySelects";
import MyInputs from "../../../common/MyInput/MyInputs";

////// helpers
import { transformListsForHost } from "../../../helpers/transformLists";

/////// fns
import { setModalActionsHaProxy } from "../../../store/reducers/haProxySlice";

/////// style
import "./style.scss";

const RedirectProxy = ({ sendData }) => {
  const dispatch = useDispatch();

  const { modalActionsHaProxy } = useSelector((state) => state.haProxySlice);
  const { listDataCenter } = useSelector((state) => state.dataCenterSlice);
  const listTypes = transformListsForHost(
    listDataCenter,
    "guid",
    "date_center_name"
  );

  const onChange = (e) => {
    const { name, value } = e.target;
    const obj = { ...modalActionsHaProxy, [name]: value };
    dispatch(setModalActionsHaProxy(obj));
  };

  const onChangeSelect = (item) => {
    const obj = { ...modalActionsHaProxy, dataCenter: item };
    dispatch(setModalActionsHaProxy(obj));
  };

  return (
    <div className="addEditProxy">
      <MyInputs
        title={"Наименование"}
        onChange={onChange}
        name={"name"}
        value={modalActionsHaProxy?.name}
        required={true}
      />

      {/* <MySelects
        list={listTypes}
        initText={"Выбрать"}
        onChange={onChangeSelect}
        nameKey={"dataCenter"}
        value={modalActionsHaProxy?.dataCenter}
        title={"Выберите дата центр"}
      /> */}

      <div className="btnBlock">
        <button className="addAction" onClick={sendData}>
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default RedirectProxy;
