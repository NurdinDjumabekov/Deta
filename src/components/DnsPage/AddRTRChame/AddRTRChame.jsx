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
import "../AddSubDns/style.scss";

const AddRTRChame = ({ obj }) => {
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
          title={"Record name : "}
          onChange={onChange}
          name={"name6"}
          value={dnsList?.[obj]?.name6}
        />

        <MyInputs
          title={"Point to name (FQDN) : "}
          onChange={onChange}
          name={"addres6"}
          value={dnsList?.[obj]?.addres6}
        />
      </div>

      <div className="time">
        <MyInputs
          title={"Record TTL : "}
          onChange={onChange}
          name={"record6"}
          value={dnsList?.[obj]?.record6}
        />

        <Selects
          list={listSel}
          initText={"Выбрать"}
          onChnage={onChangeSelect}
          nameKey={"time6"}
        />
      </div>

      <div className="second">
        <MyInputs
          title={"Record comments :"}
          onChange={onChange}
          name={"comment6"}
          value={dnsList?.[obj]?.comment6}
        />
      </div>

      <div className="second actions rigth">
        <button className="addAction">Добавить</button>
      </div>
    </div>
  );
};

export default AddRTRChame;
