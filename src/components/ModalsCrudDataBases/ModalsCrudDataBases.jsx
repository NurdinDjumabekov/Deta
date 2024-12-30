/////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// fns
import { crudDataBasesReq } from "../../store/reducers/bazaSaveSlice";

////// imgs
import krest from "../../assets/icons/krest.svg";

///////components
import Modals from "../../common/Modals/Modals";
import MySelects from "../../common/MySelects/MySelects";
import MyInputs from "../../common/MyInput/MyInputs";
import MyIPInput from "../../common/MyIPInput/MyIPInput";
import MyTextArea from "../../common/MyTextArea/MyTextArea";
import ConfirmModal from "../../common/ConfirmModal/ConfirmModal";

////// helpers
import { myAlert } from "../../helpers/MyAlert";
import { checkIP } from "../../helpers/checkFNS";
import { listDataBases } from "../../helpers/LocalData";

///////style
import "./style.scss";

const ModalsCrudDataBases = (props) => {
  const { crudAction, setCrudAction, getData } = props;

  const dispatch = useDispatch();

  const [crudIP, setCrudIP] = useState("");

  const onChangeSelect = (item) => {
    setCrudAction({ ...crudAction, dataBases: item });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setCrudAction({ ...crudAction, [name]: value });
  };

  const crudBasesData = async (e) => {
    e.preventDefault();

    if (crudAction?.actionType == 1 || crudAction?.actionType == 2) {
      if (!!!crudAction?.dataBases?.value) {
        return myAlert("Выберите тип", "error");
      }

      if (!!!crudAction?.database_name) {
        return myAlert("Заполните наименование базы", "error");
      }

      if (checkIP(crudAction?.main_ip)) {
        return myAlert("Некорректный IP", "error");
      }

      if (!!!crudAction?.login) {
        return myAlert("Заполните логин", "error");
      }

      if (!!!crudAction?.password) {
        return myAlert("Заполните пароль", "error");
      }
    }

    const send = { ...crudAction, dataBases: crudAction?.dataBases?.value };

    const result = await dispatch(crudDataBasesReq(send)).unwrap();

    if (result?.res === 1) {
      myAlert("Операция выполнена успешно");
      getData();
      setCrudAction({});
    }
  };

  const addInnerIpAddres = async (e) => {
    e.preventDefault();

    if (crudAction?.actionType == 5 && checkIP(crudIP)) {
      return myAlert("Некорректный IP", "error");
    }

    const send = { ...crudAction, everyIp: crudIP };

    const res = await dispatch(crudDataBasesReq(send)).unwrap();

    if (res?.res == 1) {
      myAlert("IP добавлен");
      setCrudIP("");
      getData();
      setCrudAction({ ...crudAction, ipAddresses: res?.ipAddresses });
    }
  };

  const delInnerIpAddres = async (item) => {
    var send = {
      guid: item?.data_base_guid,
      guidInner: item?.guid,
      actionType: 4,
    };

    const res = await dispatch(crudDataBasesReq(send)).unwrap();

    if (res?.res == 1) {
      myAlert("IP адрес удалён");
      getData();
      setCrudAction({ ...crudAction, ipAddresses: res?.ipAddresses });
    }
  };

  if (crudAction?.actionType == 1 || crudAction?.actionType == 2) {
    return (
      <Modals
        openModal={true}
        setOpenModal={() => setCrudAction({})}
        title={"Добавление базы"}
      >
        <form className="crudsDataBases" onSubmit={crudBasesData}>
          <MySelects
            list={listDataBases}
            initText={"Выбрать"}
            onChange={onChangeSelect}
            nameKey={"dataBases"}
            value={crudAction?.dataBases}
            title={"Выберите тип"}
          />

          <MyInputs
            title={"Наименование базы"}
            onChange={onChange}
            name={"database_name"}
            value={crudAction?.database_name}
          />

          <MyIPInput
            title={"Ip базы"}
            onChange={onChange}
            name={"main_ip"}
            value={crudAction?.main_ip}
          />

          <MyInputs
            title={"Логин"}
            onChange={onChange}
            name={"login"}
            value={crudAction?.login}
          />

          <MyInputs
            title={"Пароль"}
            onChange={onChange}
            name={"password"}
            value={crudAction?.password}
          />

          <MyTextArea
            title={"Описание"}
            onChange={onChange}
            name={"descr"}
            value={crudAction?.descr}
          />

          <div className="saveStandart" type="submit">
            <button>Сохранить</button>
          </div>
        </form>
      </Modals>
    );
  }

  if (crudAction?.actionType == 3) {
    return (
      <ConfirmModal
        state={true}
        title={"Удалить ?"}
        yes={crudBasesData}
        no={() => setCrudAction({})}
      />
    );
  }

  if (crudAction?.actionType == 4) {
    return (
      <ConfirmModal
        state={true}
        title={"Удалить ?"}
        yes={crudBasesData}
        no={() => setCrudAction({})}
      />
    );
  }

  if (crudAction?.actionType == 5) {
    return (
      <Modals
        openModal={true}
        setOpenModal={() => setCrudAction({})}
        title={"Добавление базы"}
      >
        <form className="crudsDataBases" onSubmit={addInnerIpAddres}>
          <div className="list">
            {crudAction?.ipAddresses?.map((item, index) => (
              <div key={item?.guid}>
                <p>
                  vmbr{index + 1}: {item?.ip_adres}
                </p>
                <div onClick={() => delInnerIpAddres(item)}>
                  <img src={krest} alt="" />
                </div>
              </div>
            ))}
          </div>

          <MyIPInput
            title={"Ip адрес"}
            onChange={(e) => setCrudIP(e.target.value)}
            name={""}
            value={crudIP}
          />

          <div className="saveStandart">
            <button type="submit">Добавить</button>
          </div>
        </form>
      </Modals>
    );
  }
};

export default ModalsCrudDataBases;
