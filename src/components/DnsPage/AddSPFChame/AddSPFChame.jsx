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

const AddSPFChame = ({ obj }) => {
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
          title={"Record name (e-mail domain) : "}
          onChange={onChange}
          name={"name7"}
          value={dnsList?.[obj]?.name7}
        />

        <MyInputs
          title={"SPF string : "}
          onChange={onChange}
          name={"addres7"}
          value={dnsList?.[obj]?.addres7}
        />
      </div>

      <div className="time">
        <MyInputs
          title={"Record TTL : "}
          onChange={onChange}
          name={"record7"}
          value={dnsList?.[obj]?.record7}
        />

        <Selects
          list={listSel}
          initText={"Выбрать"}
          onChnage={onChangeSelect}
          nameKey={"time7"}
        />
      </div>

      <div className="second">
        <MyInputs
          title={"Record comments :"}
          onChange={onChange}
          name={"comment7"}
          value={dnsList?.[obj]?.comment7}
        />
      </div>

      <div className="second actions">
        <div className="bool">
          <input type="checkbox" id="check" />
          <label htmlFor="check">Synchronize TXT-record</label>
        </div>
        <button className="addAction">Добавить</button>
      </div>
    </div>
  );
};

export default AddSPFChame;
