//////// hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//////// components
import AddDnsModals from "../AddDnsModals/AddDnsModals";
import Selects from "../../../common/Selects/Selects";

/////// fns
import { setDistributeIpModal } from "../../../store/reducers/stateSlice";
import {
  changeIpProviders,
  getScriptDns,
  returnIpProviders,
} from "../../../store/reducers/dnsSlice";

/////// helpers
import { myAlert } from "../../../helpers/MyAlert";
import { tranformDataProviders } from "../../../helpers/transformListNetwork";

/////// imgs
import resturn from "../../../assets/icons/repeat.svg";
import distribution from "../../../assets/icons/distribution.svg";
import ChecklistIcon from "@mui/icons-material/Checklist";

/////// style
import "./style.scss";

const AddDns = () => {
  const dispatch = useDispatch();

  const { activeDns } = useSelector((state) => state.stateSlice);
  const { listProviders } = useSelector((state) => state.requestSlice);

  const [objIP, setObjIP] = useState({ from: "", to: "", useAll: false });
  const [objDomen, setObjDomen] = useState("");
  const [modalScript, setModalScript] = useState({});

  const onChangeSelect = (nameKey, name, id) => {
    setObjIP({ ...objIP, [nameKey]: id });
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

  const onChangeCheck = (e) => {
    setObjIP({ ...objIP, useAll: e.target.checked });
  };

  const openModalScriptDns = async () => {
    const data = await dispatch(getScriptDns()).unwrap();
    if (data?.res == 1) {
      setModalScript({ guid: "open" });
    }
  };

  const returnIpAddres = () => dispatch(returnIpProviders(activeDns));
  ////// возвращаю api провайдера

  const distributeIpAddres = () => dispatch(setDistributeIpModal(true));
  //// для подтверждения распределения нагрузки субднс

  return (
    <>
      <div className="actionDns">
        <div className="changeIpAddres">
          <div>
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
              <button className="return" onClick={returnIpAddres}>
                {/* Перебить возврат */}
                <img src={resturn} alt="[]" />
                <span className="moreInfoLeft">
                  Возврат предыдущего провайдера
                </span>
              </button>
              <button className="return raspr" onClick={distributeIpAddres}>
                {/* Распределить нагрузку */}
                <img src={distribution} alt="[]" />
                <span className="moreInfoLeft">Распределить нагрузку</span>
              </button>
              <button className="return role" onClick={openModalScriptDns}>
                <ChecklistIcon sx={{ width: 21, height: 21 }} />
                <span className="moreInfoLeft">Выбрать сценарий</span>
              </button>
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
    </>
  );
};

export default AddDns;
