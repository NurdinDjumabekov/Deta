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

const AddNSChame = ({ obj }) => {
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
          title={"Record name (Zone) : "}
          onChange={onChange}
          name={"name4"}
          value={dnsList?.[obj]?.name4}
        />

        <MyInputs
          title={"DNS Server (FQDN) : "}
          onChange={onChange}
          name={"addres4"}
          value={dnsList?.[obj]?.addres4}
        />
      </div>

      <div className="time">
        <MyInputs
          title={"Record TTL : "}
          onChange={onChange}
          name={"record4"}
          value={dnsList?.[obj]?.record4}
        />

        <Selects
          list={listSel}
          initText={"Выбрать"}
          onChnage={onChangeSelect}
          nameKey={"time4"}
        />
      </div>

      <div className="second">
        <MyInputs
          title={"Record comments :"}
          onChange={onChange}
          name={"comment4"}
          value={dnsList?.[obj]?.comment4}
        />
      </div>

      <div className="second actions rigth">
        <button className="addAction">Добавить</button>
      </div>
    </div>
  );
};

export default AddNSChame;
