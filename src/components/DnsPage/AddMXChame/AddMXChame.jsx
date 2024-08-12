//////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

//////// components
import MyInputs from "../../../common/MyInput/MyInputs";
import Selects from "../../../common/Selects/Selects";

/////// helpers
import { listSel } from "../../../helpers/LocalData";

/////// fns
import { setDnsEveryKey } from "../../../store/reducers/stateSlice";

/////// style
import "../AddDns/style.scss";

const AddMXChame = ({ obj }) => {
  const dispatch = useDispatch();

  const { dnsList } = useSelector((state) => state.stateSlice);

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(setDnsEveryKey({ obj, everyObj: { [name]: value } }));
  };

  const onChangeSelect = (nameKey, name, id) => {
    dispatch(setDnsEveryKey({ obj, everyObj: { [nameKey]: id } }));
  };

  return (
    <div className="addDns">
      <div className="second">
        <MyInputs
          title={"Record name (e-mail address domain name) : "}
          onChange={onChange}
          name={"name3"}
          value={dnsList?.[obj]?.name3}
        />

        <MyInputs
          title={"Perference :"}
          onChange={onChange}
          name={"addres3"}
          value={dnsList?.[obj]?.perference3}
        />

        <MyInputs
          title={"Mail server host (FQDN) : "}
          onChange={onChange}
          name={"addres3"}
          value={dnsList?.[obj]?.addres3}
        />
      </div>

      <div className="time">
        <MyInputs
          title={"Record TTL : "}
          onChange={onChange}
          name={"record3"}
          value={dnsList?.[obj]?.record3}
        />

        <Selects
          list={listSel}
          initText={"Выбрать"}
          onChnage={onChangeSelect}
          nameKey={"time3"}
        />
      </div>

      <div className="second">
        <MyInputs
          title={"Record comments : "}
          onChange={onChange}
          name={"comment3"}
          value={dnsList?.[obj]?.comment3}
        />
      </div>

      <div className="second actions rigth">
        <button className="addAction">Добавить</button>
      </div>
    </div>
  );
};

export default AddMXChame;
