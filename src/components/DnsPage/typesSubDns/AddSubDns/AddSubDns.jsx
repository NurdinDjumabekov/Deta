//////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

//////// components
import MyInputs from "../../../../common/MyInput/MyInputs";
import MyIPInput from "../../../../common/MyIPInput/MyIPInput";

/////// helpers
import { myAlert } from "../../../../helpers/MyAlert";
import { checkChangeRecordName } from "../../../../helpers/checkFNS";
import { checkChangeIP } from "../../../../helpers/checkFNS";
import { checkChangeTTL, checkIP } from "../../../../helpers/checkFNS";
import { checkSubDomainName, checkTTL } from "../../../../helpers/checkFNS";

/////// fns
import { setDnsEveryKey } from "../../../../store/reducers/stateSlice";
import { addSubDomen } from "../../../../store/reducers/requestSlice";

/////// style
import "./style.scss";

const AddSubDns = ({ obj }) => {
  const dispatch = useDispatch();

  const { dnsList, activeDns } = useSelector((state) => state.stateSlice);

  const onChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "ttl") {
      if (checkChangeTTL(value)) {
        dispatch(setDnsEveryKey({ obj, everyObj: { [name]: value } }));
      }
    } else if (name === "record_name") {
      if (checkChangeRecordName(value)) {
        dispatch(setDnsEveryKey({ obj, everyObj: { [name]: value } }));
      }
    } else if (name === "host_ip") {
      if (checkChangeIP(value)) {
        dispatch(setDnsEveryKey({ obj, everyObj: { [name]: value } }));
      }
    } else if (name === "is_check_my_ip") {
      dispatch(setDnsEveryKey({ obj, everyObj: { [name]: checked } }));
    } else {
      dispatch(setDnsEveryKey({ obj, everyObj: { [name]: value } }));
    }
  };

  const addInnerSubDomen = () => {
    const record_name = dnsList?.one?.record_name;

    if (checkSubDomainName(record_name, activeDns)) {
      return;
    }

    if (!dnsList?.one?.is_check_my_ip) {
      if (checkIP(dnsList?.one?.host_ip)) {
        myAlert("Заполните правильно поле 'Host IP address: '", "error");
        return;
      }
    }

    if (checkTTL(dnsList?.one?.ttl)) {
      return;
    }

    ////// добалвяю суб домен через запрос
    const send = { ...dnsList?.one, domen_guid: activeDns?.guid, ...activeDns };
    const obj = { record_name: `${send?.record_name}.${activeDns.name}` };
    dispatch(addSubDomen({ ...send, ...obj }));
  };

  return (
    <div className="addDns">
      <div className="second">
        <div className="mainDns">
          <MyInputs
            title={"Record name (host):"}
            onChange={onChange}
            name={"record_name"}
            value={dnsList?.[obj]?.record_name}
          />
          <span>.{activeDns?.name}</span>
        </div>

        {!dnsList?.[obj]?.is_check_my_ip && (
          <MyIPInput
            title={"Host IP address:"}
            onChange={onChange}
            name={"host_ip"}
            value={dnsList?.[obj]?.host_ip}
          />
        )}

        <MyInputs
          title={"Record TTL:"}
          onChange={onChange}
          name={"ttl"}
          value={dnsList?.[obj]?.ttl}
        />

        <div className="widthBig">
          <MyInputs
            title={"Record comments:"}
            onChange={onChange}
            name={"comment"}
            value={dnsList?.[obj]?.comment}
          />
        </div>

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
