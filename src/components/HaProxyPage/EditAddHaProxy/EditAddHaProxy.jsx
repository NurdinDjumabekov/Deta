//////// hooks
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

///// components
import MyInputs from "../../../common/MyInput/MyInputs";
import MyIPInput from "../../../common/MyIPInput/MyIPInput";
import MySelects from "../../../common/MySelects/MySelects";

/////// fns
import { setModalActionsHaProxy } from "../../../store/reducers/haProxySlice";

/////// helpers
import { listProtocols } from "../../../helpers/LocalData";

/////// style
import "./style.scss";

const EditAddHaProxy = ({ sendData, typeAction }) => {
  const dispatch = useDispatch();

  const { modalActionsHaProxy } = useSelector((state) => state.haProxySlice);

  const onChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "checkType") {
      const obj = { ...modalActionsHaProxy, [name]: checked ? 1 : 0 };
      dispatch(setModalActionsHaProxy(obj));
      return;
    }

    if (name === "ip_addres") {
      const regex = /^[0-9.:]*$/;
      if (regex?.test(value)) {
        const obj = { ...modalActionsHaProxy, [name]: value };
        dispatch(setModalActionsHaProxy(obj));
        return;
      }
    } else {
      const obj = { ...modalActionsHaProxy, [name]: value };
      dispatch(setModalActionsHaProxy(obj));
    }
  };

  const onChangeSelect = (item) => {
    dispatch(setModalActionsHaProxy({ ...modalActionsHaProxy, type: item }));
  };

  const listHttp = typeAction == 1 ? listProtocols : listProtocols?.slice(0, 2);

  return (
    <div className="addEditProxy">
      <MyInputs
        title={"Наименование"}
        onChange={onChange}
        name={"name"}
        value={modalActionsHaProxy?.name}
        required={true}
      />

      <MyInputs
        title={"Комментарий"}
        onChange={onChange}
        name={"comment"}
        value={modalActionsHaProxy?.comment}
        required={true}
      />

      <MySelects
        list={listHttp}
        initText={"Выбрать"}
        onChange={onChangeSelect}
        nameKey={"type"}
        value={modalActionsHaProxy?.type}
        title={"Тип протокола"}
      />

      <MyIPInput
        title={"IP адрес :"}
        onChange={onChange}
        name={"ip_addres"}
        value={modalActionsHaProxy?.ip_addres}
      />

      <div className="bool">
        <input
          type="checkbox"
          id="checkbox"
          onChange={onChange}
          name="checkType"
          checked={!!modalActionsHaProxy?.checkType}
        />
        <label htmlFor="checkbox">Check</label>
      </div>
      <div className="btnBlock">
        <button className="addAction" onClick={sendData}>
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default EditAddHaProxy;
