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
import { myAlert } from "../../../helpers/MyAlert";

const AddSubDns = ({ obj }) => {
  const dispatch = useDispatch();

  const { dnsList, activeDns } = useSelector((state) => state.stateSlice);

  const onChange = (e) => {
    const { name, value, checked } = e.target;

    const validText = /^[a-zA-Z0-9._-]*$/.test(value?.trim());
    const validTtl = /^\d*$/.test(value);
    const validIp = /^[0-9.]*$/.test(value?.trim());

    // Если поле "ttl", проверяем, чтобы вводились только цифры
    if (name === "ttl") {
      if (validTtl) {
        dispatch(setDnsEveryKey({ obj, everyObj: { [name]: value } }));
      }
    } else if (name === "record_name") {
      if (validText) {
        dispatch(setDnsEveryKey({ obj, everyObj: { [name]: value } }));
      }
    } else if (name === "host_ip") {
      if (validIp) {
        dispatch(setDnsEveryKey({ obj, everyObj: { [name]: value } }));
      }
    } else if (name === "is_check_my_ip") {
      dispatch(setDnsEveryKey({ obj, everyObj: { [name]: checked } }));
    } else {
      dispatch(setDnsEveryKey({ obj, everyObj: { [name]: value } }));
    }
  };

  const addInnerSubDomen = () => {
    if (dnsList?.one?.record_name === "") {
      myAlert("Заполните 'Record name (host)'");
      return;
    }

    if (!dnsList?.one?.is_check_my_ip) {
      if (dnsList?.one?.host_ip == 0 || dnsList?.one?.host_ip == "") {
        myAlert("Заполните 'Host IP address'");
        return;
      }
    }

    if (dnsList?.one?.ttl === "" || dnsList?.one?.ttl == "0") {
      myAlert("Заполните 'Record TTL'");
      return;
    }

    if (!dnsList?.one?.is_check_my_ip) {
      if (dnsList?.one?.my_ip === "" || dnsList?.one?.my_ip == "0") {
        myAlert("Заполните 'Default IP'");
        return;
      }
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

        {!dnsList?.[obj]?.is_check_my_ip && (
          <MyInputs
            title={"Host IP address :"}
            onChange={onChange}
            name={"host_ip"}
            value={dnsList?.[obj]?.host_ip}
          />
        )}

        <MyInputs
          title={"Record TTL"}
          onChange={onChange}
          name={"ttl"}
          value={dnsList?.[obj]?.ttl}
        />
      </div>

      <div className="second">
        <MyInputs
          title={"Record comments :"}
          onChange={onChange}
          name={"comment"}
          value={dnsList?.[obj]?.comment}
        />

        <button className="addAction" onClick={addInnerSubDomen}>
          Добавить
        </button>
      </div>

      <div className="time">
        <div className="second actions">
          <div className="bool">
            <input
              type="checkbox"
              id="checkSubDomen"
              onChange={onChange}
              name="is_check_my_ip"
              checked={dnsList?.[obj]?.is_check_my_ip}
            />
            <label htmlFor="checkSubDomen">Default IP</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubDns;
