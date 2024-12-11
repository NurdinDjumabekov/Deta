//////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

//////// compthreents
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

const AddMXChame = ({ obj }) => {
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
    const record_name = dnsList?.three?.record_name;

    // if (checkSubDomainName(record_name, activeDns)) {
    //   return;
    // }

    if (!!!dnsList?.three?.host_ip) {
      myAlert("Заполните правильно поле 'Mail server host (FQDN)'", "error");
      return;
    }

    if (checkTTL(dnsList?.three?.ttl)) {
      return;
    }

    ////// добалвяю суб домен через запрос
    const send = {
      ...dnsList?.three,
      ...activeDns,
      domen_guid: activeDns?.guid,
    };
    const obj = { record_name: `${activeDns.name}` };
    dispatch(addSubDomen({ ...send, ...obj }));
  };

  return (
    <div className="addDns">
      <div className="second">
        <div className="mainDns">
          <MyInputs
            title={"Record name(e-mail address) :"}
            onChange={onChange}
            name={"record_name"}
            value={activeDns?.name}
          />
          {/* <span>.{activeDns?.name}</span> */}
        </div>

        {/* <div className="widthMiddle">
          <MyInputs
            title={"Perference :"}
            onChange={onChange}
            name={"host_ip"}
            value={dnsList?.[obj]?.host_ip}
          />
        </div> */}

        <div className="widthMiddle">
          <MyInputs
            title={"Mail server host (FQDN) :"}
            onChange={onChange}
            name={"host_ip"}
            value={dnsList?.[obj]?.host_ip}
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
