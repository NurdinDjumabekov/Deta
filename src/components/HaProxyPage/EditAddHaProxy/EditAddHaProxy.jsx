//////// hooks
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

///// components
import MyInputs from "../../../common/MyInput/MyInputs";
import MyIPInput from "../../../common/MyIPInput/MyIPInput";
import Selects from "../../../common/Selects/Selects";

/////// fns
import { setModalActionsHaProxy } from "../../../store/reducers/requestHaProxySlice";

/////// helpers
import { listProtocols } from "../../../helpers/LocalData";

/////// style
import "./style.scss";

const EditAddHaProxy = ({ sendData }) => {
  const dispatch = useDispatch();

  const { modalActionsHaProxy } = useSelector(
    (state) => state.requestHaProxySlice
  );

  const onChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "checkType") {
      const obj = { ...modalActionsHaProxy, [name]: checked };
      dispatch(setModalActionsHaProxy(obj));
    } else {
      const obj = { ...modalActionsHaProxy, [name]: value };
      dispatch(setModalActionsHaProxy(obj));
    }
  };

  const onChangeSelect = (nameKey, name, id) => {
    dispatch(setModalActionsHaProxy({ ...modalActionsHaProxy, [nameKey]: id }));
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
          list={listProtocols}
          initText={"Выбрать"}
          onChnage={onChangeSelect}
          nameKey={"type"}
        />
      </div>

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
          checked={modalActionsHaProxy?.checkType}
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
