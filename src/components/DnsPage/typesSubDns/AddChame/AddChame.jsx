//////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

//////// components
import MyInputs from "../../../../common/MyInput/MyInputs";

/////// helpers
import { myAlert } from "../../../../helpers/MyAlert";
import { checkChangeRecordName } from "../../../../helpers/checkFNS";
import { checkChangeTTL, checkIP } from "../../../../helpers/checkFNS";
import { checkSubDomainName, checkTTL } from "../../../../helpers/checkFNS";

/////// fns
import { setDnsEveryKey } from "../../../../store/reducers/stateSlice";
import { addSubDomen } from "../../../../store/reducers/requestSlice";

/////// style
import "../AddSubDns/style.scss";

const AddChame = ({ obj }) => {
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
    const record_name = dnsList?.two?.record_name;

    // if (checkSubDomainName(record_name, activeDns)) {
    //   return;
    // }

    if (!!!dnsList?.two?.host_ip) {
      myAlert("Заполните поле 'Alias for domain (FQDN)'", "error");
      return;
    }

    if (checkTTL(dnsList?.two?.ttl)) {
      return;
    }

    ////// добалвяю суб домен через запрос
    const send = { ...dnsList?.two, domen_guid: activeDns?.guid, ...activeDns };
    const obj = { record_name: `${activeDns.name}` };
    dispatch(addSubDomen({ ...send, ...obj }));
  };

  return (
    <div className="addDns">
      <div className="second">
        <div className="mainDns">
          <MyInputs
            title={"Record name (alias name) : "}
            onChange={onChange}
            name={"record_name"}
            value={activeDns?.name}
          />
          {/* <span>.{activeDns?.name}</span> */}
        </div>

        <div className="widthMiddle">
          <MyInputs
            onChange={onChange}
            name={"host_ip"}
            value={dnsList?.two?.host_ip}
            title={"Alias for domain (FQDN) :"}
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

export default AddChame;
