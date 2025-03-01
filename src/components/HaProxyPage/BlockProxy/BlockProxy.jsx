//////// hooks
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

///// components
import MyInputs from "../../../common/MyInput/MyInputs";

/////// fns
import { setModalActionsHaProxy } from "../../../store/reducers/haProxySlice";

/////// style
import "./style.scss";

const BlockProxy = ({ sendData }) => {
  const dispatch = useDispatch();

  const { modalActionsHaProxy } = useSelector((state) => state.haProxySlice);

  const onChange = (e) => {
    const { name, value } = e.target;
    const obj = { ...modalActionsHaProxy, [name]: value };
    dispatch(setModalActionsHaProxy(obj));
  };

  return (
    <div className="addEditProxy">
      <MyInputs
        title={"Введите IP"}
        onChange={onChange}
        name={"ip_addres"}
        value={modalActionsHaProxy?.ip_addres}
        required={true}
      />

      <div className="btnBlock">
        <button className="addAction" onClick={sendData}>
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default BlockProxy;
