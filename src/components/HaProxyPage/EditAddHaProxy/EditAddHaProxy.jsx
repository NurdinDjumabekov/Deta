//////// hooks
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

///// components
import MyInputs from "../../../common/MyInput/MyInputs";
import MyIPInput from "../../../common/MyIPInput/MyIPInput";
import Selects from "../../../common/Selects/Selects";

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
      console.log(checked, "checked");
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

  const onChangeSelect = (nameKey, name, id) => {
    dispatch(setModalActionsHaProxy({ ...modalActionsHaProxy, [nameKey]: id }));
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

      <div className="protocols">
        <h6>Тип протокола</h6>
        <Selects
          list={listHttp}
          initText={"Выбрать"}
          onChnage={onChangeSelect}
          nameKey={"type"}
        />
      </div>

      <MyInputs
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
      <div className="btnBlock" onClick={() => sendData()}>
        <button className="addAction">Сохранить</button>
      </div>
    </div>
  );
};

export default EditAddHaProxy;
