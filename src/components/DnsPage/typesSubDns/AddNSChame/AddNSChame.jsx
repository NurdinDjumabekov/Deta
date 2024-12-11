//////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

//////// components
import MyInputs from "../../../../common/MyInput/MyInputs";

/////// helpers
import { myAlert } from "../../../../helpers/MyAlert";
import { checkChangeRecordName } from "../../../../helpers/checkFNS";
import { checkChangeTTL } from "../../../../helpers/checkFNS";
import { checkTTL } from "../../../../helpers/checkFNS";

/////// fns
import { setDnsEveryKey } from "../../../../store/reducers/stateSlice";
import { addSubDomen } from "../../../../store/reducers/dnsSlice";

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
    } else if (name === "record_name" || name === "host_ip") {
      if (checkChangeRecordName(value)) {
        dispatch(setDnsEveryKey({ obj, everyObj: { [name]: value } }));
      }
    } else {
      dispatch(setDnsEveryKey({ obj, everyObj: { [name]: value } }));
    }
  };

  const addInnerSubDomen = () => {
    if (!!!dnsList?.four?.host_ip) {
      myAlert("Заполните правильно поле 'Host IP address: '", "error");
      return;
    }

    if (checkTTL(dnsList?.four?.ttl)) {
      return;
    }

    ////// добалвяю суб домен через запрос

    const send = {
      ...dnsList?.four,
      ...activeDns,
      domen_guid: activeDns?.guid,
    };
    const obj = {
      record_name: `${!!send?.record_name ? send?.record_name : ""}${
        activeDns.name
      }`,
    };
    dispatch(addSubDomen({ ...send, ...obj }));
  };

  return (
    <div className="addDns">
      <div className="second">
        <div className="mainDns emptyInput">
          <MyInputs
            title={"Record name (Zone):"}
            onChange={onChange}
            name={"record_name"}
            value={dnsList?.[obj]?.record_name}
          />
          <span>{activeDns?.name}</span>
        </div>

        <MyInputs
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
