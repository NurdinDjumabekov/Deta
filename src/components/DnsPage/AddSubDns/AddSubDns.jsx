//////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

//////// components
import MyInputs from "../../../common/MyInput/MyInputs";

/////// helpers

/////// fns
import { setDnsEveryKey } from "../../../store/reducers/stateSlice";
import { addSubDomen } from "../../../store/reducers/requestSlice";

/////// style
import "./style.scss";

const AddSubDns = ({ obj }) => {
  const dispatch = useDispatch();

  const { dnsList, activeDns } = useSelector((state) => state.stateSlice);

  const onChange = (e) => {
    const { name, value } = e.target;

    // Если поле "ttl", проверяем, чтобы вводились только цифры
    if (name === "ttl") {
      if (/^\d*$/.test(value)) {
        dispatch(setDnsEveryKey({ obj, everyObj: { [name]: value } }));
      }
    } else {
      dispatch(setDnsEveryKey({ obj, everyObj: { [name]: value } }));
    }
  };

  const addInnerSubDomen = () => {
    if (dnsList?.one?.record_name === "") {
      alert("Заполните 'Record name (host)'");
      return;
    }

    if (dnsList?.one?.host_ip === 0) {
      alert("Заполните 'Record name (host)'");
      return;
    }

    if (dnsList?.one?.ttl === "") {
      alert("Заполните 'Record TTL'");
      return;
    }

    if (dnsList?.one?.host_ip === 0) {
      alert("Заполните 'Record name (host)'");
      return;
    }

    ////// добалвяю суб домен через запрос
    const obj = { domen_guid: activeDns, ...dnsList?.one };
    dispatch(addSubDomen(obj));
  };

  return (
    <div className="addDns">
      <div className="second">
        <MyInputs
          title={"Record name (host) :"}
          onChange={onChange}
          name={"record_name"}
          value={dnsList?.[obj]?.record_name}
        />

        <MyInputs
          title={"Host IP address :"}
          onChange={onChange}
          name={"host_ip"}
          value={dnsList?.[obj]?.host_ip}
        />
      </div>

      <div className="time">
        <MyInputs
          title={"Record TTL :"}
          onChange={onChange}
          name={"ttl"}
          value={dnsList?.[obj]?.ttl}
        />

        <div className="comment">
          <MyInputs
            title={"Record comments :"}
            onChange={onChange}
            name={"comment"}
            value={dnsList?.[obj]?.comment}
          />
        </div>
      </div>

      <div className="second actions">
        <div className="bool">
          <input type="checkbox" id="check" />
          <label htmlFor="check">Update Reverse Zone</label>
        </div>
        <button className="addAction" onClick={addInnerSubDomen}>
          Добавить
        </button>
      </div>
    </div>
  );
};

export default AddSubDns;