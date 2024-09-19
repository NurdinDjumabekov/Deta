//////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

//////// components
import MyInputs from "../../../../common/MyInput/MyInputs";

/////// helpers
import { myAlert } from "../../../../helpers/MyAlert";
import { checkChangeRecordName } from "../../../../helpers/checkFNS";
import { checkChangeTTL } from "../../../../helpers/checkFNS";
import { checkSubDomainName, checkTTL } from "../../../../helpers/checkFNS";

/////// fns
import { setDnsEveryKey } from "../../../../store/reducers/stateSlice";
import { addSubDomen } from "../../../../store/reducers/requestSlice";

/////// style
import "../AddSubDns/style.scss";

const AddSPFChame = ({ obj }) => {
  const dispatch = useDispatch();

  const { dnsList, activeDns } = useSelector((state) => state.stateSlice);

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "ttl") {
      if (checkChangeTTL(value)) {
        dispatch(setDnsEveryKey({ obj, everyObj: { [name]: value } }));
      }
    } else if (name === "record_name" || name === "sdf_string") {
      if (checkChangeRecordName(value)) {
        dispatch(setDnsEveryKey({ obj, everyObj: { [name]: value } }));
      }
    } else {
      dispatch(setDnsEveryKey({ obj, everyObj: { [name]: value } }));
    }
  };

  const addInnerSubDomen = () => {
    const record_name = dnsList?.seven?.record_name;

    if (checkSubDomainName(record_name, activeDns)) {
      return;
    }

    if (!!!dnsList?.seven?.sdf_string) {
      myAlert("Поле 'SPF string:' не должно быть пустым", "error");
      return;
    }

    if (checkTTL(dnsList?.seven?.ttl)) {
      return;
    }

    ////// добалвяю суб домен через запрос
    const send = {
      ...dnsList?.seven,
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
            title={"Record name (e-mail domain):"}
            onChange={onChange}
            name={"record_name"}
            value={dnsList?.[obj]?.record_name}
          />
          <span>.{activeDns?.name}</span>
        </div>

        <MyInputs
          title={"SPF string:"}
          onChange={onChange}
          name={"sdf_string"}
          value={dnsList?.[obj]?.sdf_string}
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

      {/* <div className="time">
        <div className="second actions">
          <div className="bool">
            <input type="checkbox" id="check" />
            <label htmlFor="check">Update Reverse Zone</label>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AddSPFChame;
