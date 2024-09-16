//////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

//////// components
import MyInputs from "../../../../common/MyInput/MyInputs";
import MyIPInput from "../../../../common/MyIPInput/MyIPInput";

/////// helpers
import { myAlert } from "../../../../helpers/MyAlert";
import { checkChangePointToName } from "../../../../helpers/checkFNS";
import { checkChangeRecordName } from "../../../../helpers/checkFNS";
import { checkChangeTTL, checkIP } from "../../../../helpers/checkFNS";
import { checkSubDomainName, checkTTL } from "../../../../helpers/checkFNS";

/////// fns
import { setDnsEveryKey } from "../../../../store/reducers/stateSlice";
import { addSubDomen } from "../../../../store/reducers/requestSlice";

/////// style
import "../AddSubDns/style.scss";

const AddRTRChame = ({ obj }) => {
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
    } else if (dnsList?.six?.point_to_name) {
      if (checkChangePointToName(value)) {
        dispatch(setDnsEveryKey({ obj, everyObj: { [name]: value } }));
      }
    } else {
      dispatch(setDnsEveryKey({ obj, everyObj: { [name]: value } }));
    }
  };

  const addInnerSubDomen = () => {
    const record_name = dnsList?.six?.record_name;

    if (checkSubDomainName(record_name, activeDns)) {
      return;
    }

    if (dnsList?.six?.point_to_name?.length < 1) {
      myAlert("Поле 'Point to name (FQDN):' не должно быть пустым", "error");
      return;
    }

    if (checkTTL(dnsList?.six?.ttl)) {
      return;
    }

    ////// добалвяю суб домен через запрос

    const send = {
      ...dnsList?.six,
      ...activeDns,
      domen_guid: activeDns?.guid,
    };
    const obj = { record_name: `${send?.record_name}.${activeDns.name}` };
    dispatch(addSubDomen({ ...send, ...obj }));
  };

  return (
    <div className="addDns">
      <div className="second">
        <div className="mainDns">
          <MyInputs
            title={"Record name:"}
            onChange={onChange}
            name={"record_name"}
            value={dnsList?.[obj]?.record_name}
          />
          <span>.{activeDns?.name}</span>
        </div>

        <MyInputs
          title={"Point to name (FQDN):"}
          onChange={onChange}
          name={"point_to_name"}
          value={dnsList?.[obj]?.point_to_name}
        />

        <MyInputs
          title={"Record TTL:"}
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

export default AddRTRChame;
