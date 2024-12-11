//////// hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//////// components
import MyInputs from "../../../common/MyInput/MyInputs";
import MyIPInput from "../../../common/MyIPInput/MyIPInput";
import Modals from "../../../common/Modals/Modals";
import Selects from "../../../common/Selects/Selects";

/////// fns
import { setTemporaryDNS } from "../../../store/reducers/stateSlice";
import { addDomens, choiceReadySripts } from "../../../store/reducers/dnsSlice";

/////// helpers
import { myAlert } from "../../../helpers/MyAlert";
import { checkDomainName } from "../../../helpers/checkFNS";
import { checkIP } from "../../../helpers/checkFNS";

/////// imgs

/////// style
import "./style.scss";

const AddDnsModals = (props) => {
  const { setObjDomen, objDomen, modalScript, setModalScript } = props;
  const dispatch = useDispatch();

  const { temporaryDNS } = useSelector((state) => state.stateSlice);
  const { listScriptDns } = useSelector((state) => state.dnsSlice);
  const { activeDns } = useSelector((state) => state.stateSlice);

  const onChange = (e) => {
    const { name, value, checked } = e.target;

    const regex = /^[a-z0-9.-]*$/;
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
        myAlert("Заполните правильно поле 'Your IP'", "error");
        return;
      }
    }

    dispatch(addDomens({ data: temporaryDNS, setObjDomen }));
    // Добавляем DNS через запрос
  };

  const onChangeSelect = (nameKey, name, id) => {
    setModalScript({ ...modalScript, [nameKey]: id });
  };

  const onChangeCheck = (e) => {
    setModalScript({ ...modalScript, useAll: e.target.checked });
  };

  const сhoiceReadySripts = async () => {
    if (!!!modalScript?.rules_guid) {
      return myAlert("Выберите сценарий", "error");
    }
    const send = {
      rules_guid: modalScript?.rules_guid,
      useAll: modalScript?.useAll || false,
      domen_guid: activeDns?.guid,
    };
    const data = await dispatch(choiceReadySripts(send)).unwrap();
    if (data?.res == 1) {
      myAlert("Изменения применены");
      setModalScript({});
    }
  };

  //// добавление домена
  if (!!objDomen) {
    return (
      <Modals
        openModal={true}
        setOpenModal={() => setObjDomen("")}
        title={"Добавить домен?"}
      >
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
          <button className="addAction" onClick={addDomen}>
            Добавить
          </button>
        </div>
      </Modals>
    );
  }

  //// добавление сценарий
  if (!!modalScript?.guid) {
    return (
      <Modals
        openModal={true}
        setOpenModal={() => setModalScript({})}
        title={"Выберите сценарий"}
      >
        <div className="scriptDns">
          <div className="everyInput">
            <h5>Готовые сценарии</h5>
            <Selects
              list={listScriptDns}
              initText={"Выбрать"}
              onChnage={onChangeSelect}
              nameKey={"rules_guid"}
            />
          </div>

          <div className="checkBoxDns">
            <input
              type="checkbox"
              id="check"
              onChange={onChangeCheck}
              name="useAll"
              checked={modalScript?.useAll}
            />
            <label htmlFor="check">Применить изменения для всех доменов</label>
          </div>

          <div className="addAction">
            <button onClick={сhoiceReadySripts}>Применить</button>
          </div>
        </div>
      </Modals>
    );
  }
};

export default AddDnsModals;
