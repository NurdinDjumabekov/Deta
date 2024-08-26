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
import "../AddSubDns/style.scss";

const AddNSChame = ({ obj }) => {
  const dispatch = useDispatch();

  const { dnsList, activeDns } = useSelector((state) => state.stateSlice);

  const onChange = (e) => {
    const { name, value } = e.target;

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
    } else {
      dispatch(setDnsEveryKey({ obj, everyObj: { [name]: value } }));
    }
  };

  const addInnerSubDomen = () => {
    const record_name = dnsList?.four?.record_name;

    if (checkSubDomainName(record_name, activeDns)) {
      return;
    }

    if (checkIP(dnsList?.four?.host_ip)) {
      myAlert("Заполните правильно поле 'Host IP address: '");
      return;
    }

    if (checkTTL(dnsList?.four?.ttl)) {
      return;
    }

    ////// добалвяю суб домен через запрос
    const obj = { ...dnsList?.four, domen_guid: activeDns?.guid, ...activeDns };
    dispatch(addSubDomen(obj));
  };

  return (
    <div className="addDns">
      <div className="second">
        <div className="mainDns">
          <MyInputs
            title={"Record name (Zone):"}
            onChange={onChange}
            name={"record_name"}
            value={dnsList?.[obj]?.record_name}
          />
          <span>.{activeDns?.name}</span>
        </div>

        <MyIPInput
          title={"DNS Server (FQDN):"}
          onChange={onChange}
          name={"host_ip"}
          value={dnsList?.[obj]?.host_ip}
        />

        <MyInputs
          title={"Record TTL :"}
          onChange={onChange}
          name={"ttl"}
          value={dnsList?.[obj]?.ttl}
        />

        <MyInputs
          title={"Record comments:"}
          onChange={onChange}
          name={"comment"}
          value={dnsList?.[obj]?.comment}
        />
        <button className="addAction" onClick={addInnerSubDomen}>
          Добавить
        </button>
      </div>
    </div>
  );
};

export default AddNSChame;
