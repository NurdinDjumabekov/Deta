//////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

//////// components
import MyInputs from "../../../common/MyInput/MyInputs";

/////// helpers
import { myAlert } from "../../../helpers/MyAlert";
import { checkChangeRecordName } from "../../../helpers/checkFNS";
import { checkChangeIP } from "../../../helpers/checkFNS";
import { checkChangeTTL, checkIP } from "../../../helpers/checkFNS";
import { checkSubDomainName, checkTTL } from "../../../helpers/checkFNS";

/////// fns
import { addSubDomen } from "../../../store/reducers/requestSlice";
import { setDnsEveryKey } from "../../../store/reducers/stateSlice";

/////// style
import "../AddSubDns/style.scss";

const AddMXChame = ({ obj }) => {
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
    const record_name = dnsList?.one?.record_name;

    if (checkSubDomainName(record_name, activeDns)) {
      return;
    }

    if (!dnsList?.one?.is_check_my_ip) {
      if (checkIP(dnsList?.one?.host_ip)) {
        myAlert("Заполните правильно поле 'Host IP address: '");
        return;
      }
    }

    if (checkTTL(dnsList?.one?.ttl)) {
      return;
    }

    ////// добалвяю суб домен через запрос
    const obj = { ...dnsList?.one, domen_guid: activeDns?.guid, ...activeDns };
    dispatch(addSubDomen(obj));
  };

  return (
    <div className="addDns">
      <div className="second">
        <div className="widthBig">
          <MyInputs
            title={"Record name(e-mail address):"}
            onChange={onChange}
            name={"record_name"}
            value={dnsList?.[obj]?.record_name}
          />
        </div>

        <div className="widthMini">
          <MyInputs
            title={"Perference :"}
            onChange={onChange}
            name={"host_ip"}
            value={dnsList?.[obj]?.host_ip}
          />
        </div>

        <div className="widthMiddle">
          <MyInputs
            title={"Mail server host (FQDN) :"}
            onChange={onChange}
            name={"ttl"}
            value={dnsList?.[obj]?.ttl}
          />
        </div>

        <div className="widthMini">
          <MyInputs
            title={"Record TTL :"}
            onChange={onChange}
            name={"ttl"}
            value={dnsList?.[obj]?.ttl}
          />
        </div>

        <div className="widthBig">
          <MyInputs
            title={"Record comments :"}
            onChange={onChange}
            name={"comment"}
            value={dnsList?.[obj]?.comment}
          />
        </div>
        <button className="addAction" onClick={addInnerSubDomen}>
          Добавить
        </button>
      </div>
    </div>
  );
};

export default AddMXChame;
