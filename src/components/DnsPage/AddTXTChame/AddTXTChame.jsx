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

const AddTXTChame = ({ obj }) => {
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
          title={"Record name (host) : "}
          onChange={onChange}
          name={"name5"}
          value={dnsList?.[obj]?.name5}
        />

        <MyInputs
          title={"Text strings : "}
          onChange={onChange}
          name={"addres5"}
          value={dnsList?.[obj]?.addres5}
        />
      </div>

      <div className="time">
        <MyInputs
          title={"Record TTL : "}
          onChange={onChange}
          name={"record5"}
          value={dnsList?.[obj]?.record5}
        />

        <Selects
          list={listSel}
          initText={"Выбрать"}
          onChnage={onChangeSelect}
          nameKey={"time5"}
        />
      </div>

      <div className="second">
        <MyInputs
          title={"Record comments :"}
          onChange={onChange}
          name={"comment5"}
          value={dnsList?.[obj]?.comment5}
        />
      </div>

      <div className="second actions rigth">
        <button className="addAction">Добавить</button>
      </div>
    </div>
  );
};

export default AddTXTChame;
