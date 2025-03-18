//////// hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//////// components
import AddDnsModals from "../AddDnsModals/AddDnsModals";
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";
import MySelects from "../../../common/MySelects/MySelects";
import { Tooltip } from "@mui/material";

/////// fns
import { setDistributeIpModal } from "../../../store/reducers/stateSlice";
import {
  changeIpProviders,
  getScriptDns,
  returnIpProviders,
} from "../../../store/reducers/dnsSlice";

/////// helpers
import { myAlert } from "../../../helpers/MyAlert";

/////// imgs
import resturn from "../../../assets/icons/repeat.svg";
import distribution from "../../../assets/icons/distribution.svg";
import ChecklistIcon from "@mui/icons-material/Checklist";
import LockClockIcon from "@mui/icons-material/LockClock";

/////// style
import "./style.scss";
import EditAccess from "../EditAccess/EditAccess";

const AddDns = () => {
  const dispatch = useDispatch();

  const { activeDns } = useSelector((state) => state.stateSlice);
  const { listProviders } = useSelector((state) => state.requestSlice);

  const [objIP, setObjIP] = useState({ useAll: false });
  const [objDomen, setObjDomen] = useState("");
  const [modalScript, setModalScript] = useState({});
  const [returnProv, setReturnProv] = useState(false);
  const [nagruzka, setNagruzka] = useState(false);
  const [access, setAccess] = useState(false);

  const onChangeSelect = (item) => setObjIP({ ...objIP, [item?.name]: item });

  const changeIPs = () => {
    if (!!!objIP?.from?.value) {
      return myAlert("Заполните поле 'From'!", "error");
    }

    if (!!!objIP?.to?.value) {
      return myAlert("Заполните поле 'To'!", "error");
    }

    if (objIP?.to?.value === objIP?.from?.value) {
      return myAlert("У вас похожие провайдеры!", "error");
    }

    const send = { ...objIP, from: objIP?.from?.value, to: objIP?.to?.value };

    dispatch(changeIpProviders({ send, setObjIP, activeDns }));
    ///// запрос для смены провайдер0в
  };

  const onChangeCheck = (e) => setObjIP({ ...objIP, useAll: e.target.checked });

  const openModalScriptDns = async () => {
    const data = await dispatch(getScriptDns()).unwrap();
    if (data?.res == 1) setModalScript({ guid: "open" });
  };

  const returnIpAddres = () => dispatch(returnIpProviders(activeDns));
  ////// возвращаю api провайдера

  const distributeIpAddres = () => dispatch(setDistributeIpModal(true));
  //// для подтверждения распределения нагрузки субднс

  const openModalAccess = async () => {
    setAccess(true);
  };

  return (
    <>
      <div className="actionDns">
        <div className="changeIpAddres">
          <div>
            <div>
              <MySelects
                list={listProviders}
                initText={"Выбрать"}
                onChange={onChangeSelect}
                nameKey={"from"}
                value={objIP?.from}
                title={"From"}
              />

              <MySelects
                list={listProviders}
                initText={"Выбрать"}
                onChange={onChangeSelect}
                nameKey={"to"}
                value={objIP?.to}
                title={"To"}
              />

              <button className="changeBtn" onClick={changeIPs}>
                Изменить
              </button>

              <Tooltip title={"Возврат предыдущего провайдера"} placement="top">
                <button className="return" onClick={() => setReturnProv(true)}>
                  <img src={resturn} alt="[]" />
                </button>
              </Tooltip>

              <Tooltip title={"Распределить нагрузку"} placement="top">
                <button
                  className="return raspr"
                  onClick={() => setNagruzka(true)}
                >
                  <img src={distribution} alt="[]" />
                </button>
              </Tooltip>

              <Tooltip title={"Выбрать сценарий"} placement="top">
                <button className="return" onClick={openModalScriptDns}>
                  <ChecklistIcon sx={{ width: 21, height: 21 }} />
                </button>
              </Tooltip>

              <EditAccess />
            </div>
            <div className="checkBoxDns">
              <input
                type="checkbox"
                id="check"
                onChange={onChangeCheck}
                name="useAll"
                checked={modalScript?.useAll}
              />
              <label htmlFor="check">
                Применить изменения для всех доменов
              </label>
            </div>
          </div>
          <button className="addDomen" onClick={() => setObjDomen("open")}>
            + Добавить домен
          </button>
        </div>
      </div>

      <AddDnsModals
        setObjDomen={setObjDomen}
        objDomen={objDomen}
        modalScript={modalScript}
        setModalScript={setModalScript}
      />

      <ConfirmModal
        state={returnProv}
        title={"Вернуть предыдущего провайдера?"}
        yes={returnIpAddres}
        no={() => setReturnProv(false)}
      />

      <ConfirmModal
        state={nagruzka}
        title={"Распределить нагрузку?"}
        yes={distributeIpAddres}
        no={() => setNagruzka(false)}
      />
    </>
  );
};

export default AddDns;
