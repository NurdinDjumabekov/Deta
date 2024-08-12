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
import "./style.scss";

const AddDns = ({ obj }) => {
  const dispatch = useDispatch();

  const { dnsList } = useSelector((state) => state.stateSlice);

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(setDnsEveryKey({ obj, everyObj: { [name]: value } }));
  };

  const onChangeSelect = (nameKey, name, id) => {
    console.log(nameKey, name, id);
    dispatch(setDnsEveryKey({ obj, everyObj: { [nameKey]: id } }));
  };

  return (
    <div className="addDns">
      <div className="second">
        <MyInputs
          title={"Record name (host) :"}
          onChange={onChange}
          name={"name"}
          value={dnsList?.[obj]?.name}
        />

        <MyInputs
          title={"Host IP address :"}
          onChange={onChange}
          name={"addres"}
          value={dnsList?.[obj]?.addres}
        />
      </div>

      <div className="time">
        <MyInputs
          title={"Record TTL :"}
          onChange={onChange}
          name={"record"}
          value={dnsList?.[obj]?.record}
        />

        <Selects
          list={listSel}
          initText={"Выбрать"}
          onChnage={onChangeSelect}
          nameKey={"time"}
        />
      </div>

      <div className="second">
        <MyInputs
          title={"Record comments :"}
          onChange={onChange}
          name={"comment"}
          value={dnsList?.[obj]?.comment}
        />
      </div>

      <div className="second actions">
        <div className="bool">
          <input type="checkbox" id="check" />
          <label htmlFor="check">Update Reverse Zone</label>
        </div>
        <button className="addAction">Добавить</button>
      </div>
    </div>
  );
};

export default AddDns;
