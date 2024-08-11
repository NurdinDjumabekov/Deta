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

const AddChame = ({ obj }) => {
  const dispatch = useDispatch();

  const { dnsList } = useSelector((state) => state.stateSlice);

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(setDnsEveryKey({ obj, everyObj: { [name]: value } }));
  };

  const onChangeSelect = (nameKey, name, id) => {
    dispatch(setDnsEveryKey({ obj, everyObj: { [nameKey]: id } }));
  };

  console.log(dnsList?.[obj], "dnsList?.[obj]");

  return (
    <div className="addDns">
      <div className="second">
        <MyInputs
          title={"Record name (alias name) : "}
          onChange={onChange}
          name={"name2"}
          value={dnsList?.[obj]?.name2}
        />

        <MyInputs
          title={"Alias for domain (FQDN) :"}
          onChange={onChange}
          name={"addres2"}
          value={dnsList?.[obj]?.addres2}
        />
      </div>

      <div className="time">
        <MyInputs
          title={"Alias for domain (FQDN) :"}
          onChange={onChange}
          name={"record2"}
          value={dnsList?.[obj]?.record2}
        />

        <Selects
          list={listSel}
          initText={"Выбрать"}
          onChnage={onChangeSelect}
          nameKey={"time2"}
        />
      </div>

      <div className="second">
        <MyInputs
          title={"Record comments :"}
          onChange={onChange}
          name={"comment2"}
          value={dnsList?.[obj]?.comment2}
        />
      </div>

      <div className="second actions rigth">
        <button className="addAction">Добавить</button>
      </div>
    </div>
  );
};

export default AddChame;
