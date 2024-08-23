//////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

//////// components
import MyInputs from "../../../common/MyInput/MyInputs";
import MyIPInput from "../../../common/MyIPInput/MyIPInput";

/////// fns
import { setTemporaryDNS } from "../../../store/reducers/stateSlice";
import { addDomens } from "../../../store/reducers/requestSlice";

/////// helpers
import { myAlert } from "../../../helpers/MyAlert";
import { checkDomainName, checkIP } from "../../../helpers/checkFNS";

/////// style
import "./style.scss";

const AddDns = () => {
  const dispatch = useDispatch();

  const { temporaryDNS } = useSelector((state) => state.stateSlice);

  const regex = /^[a-z0-9.-]*$/;

  const onChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "domen_name") {
      if (regex.test(value)) {
        dispatch(setTemporaryDNS({ ...temporaryDNS, [name]: value }));
      }
    } else if (name === "is_check_my_ip") {
      dispatch(setTemporaryDNS({ ...temporaryDNS, [name]: checked }));
    } else {
      dispatch(setTemporaryDNS({ ...temporaryDNS, [name]: value }));
    }
  };

  const addDomen = () => {
    if (checkDomainName(temporaryDNS?.domen_name)) {
      return;
    }

    if (!temporaryDNS?.is_check_my_ip) {
      if (checkIP(temporaryDNS?.my_ip)) {
        myAlert("Заполните правильно поле 'Your IP'");
        return;
      }
    }

    dispatch(addDomens(temporaryDNS));
    // Добавляем DNS через запрос
  };

  return (
    <div className="addDns addDnsMain">
      <div className="nameInputs">
        <MyInputs
          title={"Name domen :"}
          onChange={onChange}
          name={"domen_name"}
          value={temporaryDNS?.domen_name}
        />

        {!temporaryDNS?.is_check_my_ip && (
          <div className="my_ip">
            <MyIPInput
              onChange={onChange}
              name={"my_ip"}
              value={temporaryDNS?.my_ip}
              title={"Your ip :"}
            />
          </div>
        )}

        <button className="addAction" onClick={addDomen}>
          Добавить
        </button>
      </div>

      <div className="time">
        <div className="second actions">
          <div className="bool">
            <input
              type="checkbox"
              id="check"
              onChange={onChange}
              name="is_check_my_ip"
              checked={temporaryDNS?.is_check_my_ip}
            />
            <label htmlFor="check">Default IP</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDns;
