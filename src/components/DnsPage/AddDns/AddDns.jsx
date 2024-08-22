//////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

//////// components
import MyInputs from "../../../common/MyInput/MyInputs";

/////// fns
import { setTemporaryDNS } from "../../../store/reducers/stateSlice";
import { addDomens } from "../../../store/reducers/requestSlice";

/////// style
import "./style.scss";

/////// helpers
import { myAlert } from "../../../helpers/MyAlert";

const AddDns = () => {
  const dispatch = useDispatch();

  const { temporaryDNS } = useSelector((state) => state.stateSlice);

  const onChange = (e) => {
    const { name, value, checked } = e.target;

    const check = ["expire", "negative", "refresh", "retry"].includes(name);

    const validText = /^[a-zA-Z0-9._-]*$/.test(value.trim());
    const validNums = /^[0-9]*$/.test(value.trim());
    const validIp = /^[0-9.]*$/.test(value.trim());

    if (name === "domen_name") {
      if (validText) {
        dispatch(setTemporaryDNS({ ...temporaryDNS, [name]: value }));
      }
    } else if (check) {
      if (validNums) {
        dispatch(setTemporaryDNS({ ...temporaryDNS, [name]: value }));
      }
    } else if (name === "is_check_my_ip") {
      dispatch(setTemporaryDNS({ ...temporaryDNS, [name]: checked }));
    } else if (name === "my_ip") {
      if (validIp) {
        dispatch(setTemporaryDNS({ ...temporaryDNS, [name]: value }));
      }
    } else {
      dispatch(setTemporaryDNS({ ...temporaryDNS, [name]: value }));
    }
  };

  const addDomen = () => {
    if (temporaryDNS?.domen_name === "") {
      myAlert("Заполните 'Name domen'");
      return;
    }

    if (temporaryDNS?.comment === "") {
      myAlert("Заполните 'comment'");
      return;
    }

    if (temporaryDNS?.expire === "" || temporaryDNS?.expire == "0") {
      myAlert("Заполните 'expire'");
      return;
    }

    if (temporaryDNS?.negative === "" || temporaryDNS?.negative == "0") {
      myAlert("Заполните 'negative'");
      return;
    }

    if (temporaryDNS?.refresh === "" || temporaryDNS?.refresh == "0") {
      myAlert("Заполните 'refresh'");
      return;
    }

    if (!temporaryDNS?.is_check_my_ip) {
      if (temporaryDNS?.my_ip === "" || temporaryDNS?.my_ip == "0") {
        myAlert("Заполните 'Your IP'");
        return;
      }
    }

    if (temporaryDNS?.retry === "" || temporaryDNS?.retry == "0") {
      myAlert("Заполните 'retry'");
      return;
    }

    dispatch(addDomens(temporaryDNS));
    ////// добалвяю dns через запрос
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

        <div className="timeInputs">
          <MyInputs
            title={"Expire :"}
            onChange={onChange}
            name={"expire"}
            value={temporaryDNS?.expire}
          />
          <MyInputs
            title={"Negative :"}
            onChange={onChange}
            name={"negative"}
            value={temporaryDNS?.negative}
          />
          <MyInputs
            title={"Refresh :"}
            onChange={onChange}
            name={"refresh"}
            value={temporaryDNS?.refresh}
          />
          <MyInputs
            title={"Retry :"}
            onChange={onChange}
            name={"retry"}
            value={temporaryDNS?.retry}
          />
        </div>
      </div>

      <div className="comment">
        <MyInputs
          title={"Comments for domen :"}
          onChange={onChange}
          name={"comment"}
          value={temporaryDNS?.comment}
        />
        {!temporaryDNS?.is_check_my_ip && (
          <div className="my_ip">
            <MyInputs
              title={"Your ip :"}
              onChange={onChange}
              name={"my_ip"}
              value={temporaryDNS?.my_ip}
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
