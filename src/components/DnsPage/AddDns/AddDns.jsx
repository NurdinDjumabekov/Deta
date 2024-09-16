//////// hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//////// components
import MyInputs from "../../../common/MyInput/MyInputs";
import MyIPInput from "../../../common/MyIPInput/MyIPInput";
import Selects from "../../../common/Selects/Selects";

/////// fns
import {
  setDistributeIpModal,
  setTemporaryDNS,
} from "../../../store/reducers/stateSlice";
import { addDomens } from "../../../store/reducers/requestSlice";
import { changeIpProviders } from "../../../store/reducers/requestSlice";
import { returnIpProviders } from "../../../store/reducers/requestSlice";

/////// helpers
import { myAlert } from "../../../helpers/MyAlert";
import { checkChangeIP } from "../../../helpers/checkFNS";
import { checkDomainName } from "../../../helpers/checkFNS";
import { checkIP } from "../../../helpers/checkFNS";
import { listIp } from "../../../helpers/LocalData";

/////// imgs
import resturn from "../../../assets/icons/repeat.svg";
import distribution from "../../../assets/icons/distribution.svg";

/////// style
import "./style.scss";
import { tranformDataProviders } from "../../../helpers/transformListNetwork";

const AddDns = () => {
  const dispatch = useDispatch();

  const { temporaryDNS, activeDns } = useSelector((state) => state.stateSlice);
  const { listProviders } = useSelector((state) => state.requestSlice);

  const [objIP, setObjIP] = useState({ from: "", to: "" });

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

  const onChangeSelect = (nameKey, name, id) => {
    setObjIP({ ...objIP, [nameKey]: id });
  };

  const addDomen = () => {
    if (checkDomainName(temporaryDNS?.domen_name)) {
      return;
    }

    if (!temporaryDNS?.is_check_my_ip) {
      if (checkIP(temporaryDNS?.my_ip)) {
        myAlert("Заполните правильно поле 'Your IP'", "error");
        return;
      }
    }

    dispatch(addDomens(temporaryDNS));
    // Добавляем DNS через запрос
  };

  const changeIPs = () => {
    if (objIP.from === "") {
      myAlert("Заполните поле 'From'!", "error");
      return;
    }
    if (objIP.to === "") {
      myAlert("Заполните поле 'To'!", "error");
      return;
    }

    if (objIP.to === objIP.from) {
      myAlert("У вас похожие провайдеры!", "error");
      return;
    }

    dispatch(changeIpProviders({ objIP, setObjIP, activeDns }));
    ///// запрос для смены провайдер0в
  };

  const returnIpAddres = () => dispatch(returnIpProviders(activeDns));
  ////// возвращаю api провайдера

  const distributeIpAddres = () => dispatch(setDistributeIpModal(true));
  //// для подтверждения распределения нагрузки субднс

  return (
    <div className="actionDns">
      <div className="changeIpAddres">
        <div>
          <div className="everyInput">
            <h5>From</h5>
            <Selects
              list={tranformDataProviders(listProviders)}
              initText={"Выбрать"}
              onChnage={onChangeSelect}
              nameKey={"from"}
            />
          </div>
          <div className="everyInput">
            <h5>To</h5>
            <Selects
              list={tranformDataProviders(listProviders)}
              initText={"Выбрать"}
              onChnage={onChangeSelect}
              nameKey={"to"}
            />
          </div>
          <button className="changeBtn" onClick={changeIPs}>
            Изменить
          </button>
        </div>
        <div className="returnsIp">
          <button className="returnsIp__btn" onClick={returnIpAddres}>
            {/* Перебить возврат */}
            <img src={resturn} alt="[]" />
            <span className="moreInfoLeft">Возврат предыдущего провайдера</span>
          </button>
          <button className="returnsIp__btn" onClick={distributeIpAddres}>
            {/* Распределить нагрузку */}
            <img src={distribution} alt="[]" />
            <span className="moreInfoLeft">Распределить нагрузку</span>
          </button>
        </div>
      </div>

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
                title={"IP address :"}
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
    </div>
  );
};

export default AddDns;
