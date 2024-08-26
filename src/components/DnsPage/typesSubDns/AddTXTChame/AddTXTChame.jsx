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

const AddTXTChame = ({ obj }) => {
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
    } else {
      dispatch(setDnsEveryKey({ obj, everyObj: { [name]: value } }));
    }
  };

  const addInnerSubDomen = () => {
    const record_name = dnsList?.five?.record_name;

    if (checkSubDomainName(record_name, activeDns)) {
      return;
    }

    if (dnsList?.five?.txt_string?.length < 1) {
      myAlert("Поле 'Text strings' не должно быть пустым");
      return;
    }

    if (checkTTL(dnsList?.five?.ttl)) {
      return;
    }

    ////// добалвяю суб домен через запрос
    const obj = { ...dnsList?.five, domen_guid: activeDns?.guid, ...activeDns };
    dispatch(addSubDomen(obj));
  };

  return (
    <div className="addDns">
      <div className="second">
        <div className="mainDns">
          <MyInputs
            title={"Record name (host) :"}
            onChange={onChange}
            name={"record_name"}
            value={dnsList?.[obj]?.record_name}
          />
          <span>.{activeDns?.name}</span>
        </div>

        <div className="widthBig">
          <MyInputs
            title={"Text strings :"}
            onChange={onChange}
            name={"txt_string"}
            value={dnsList?.[obj]?.txt_string}
          />
        </div>

        <MyInputs
          title={"Record TTL :"}
          onChange={onChange}
          name={"ttl"}
          value={dnsList?.[obj]?.ttl}
        />

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
    </div>
  );
};

export default AddTXTChame;
