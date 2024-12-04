/////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////style
import "./style.scss";

//////// components
import Modals from "../../../common/Modals/Modals";
import MyInputs from "../../../common/MyInput/MyInputs";
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";
import Selects from "../../../common/Selects/Selects";

//////helpers
import { myAlert } from "../../../helpers/MyAlert";
import { checkChangeIP, checkIP } from "../../../helpers/checkFNS";
import {
  listColorStatics,
  listColorVitual,
  objGroup,
  objStaticsIP,
  objSubGroup,
} from "../../../helpers/LocalData";

/////// fns
import {
  actionGroupIPreq,
  actionStaticsIPreq,
  actionSubGroupIPreq,
  getStaticsIpAddresReq,
} from "../../../store/reducers/networkSlice";

const ModalsIpAddres = (props) => {
  const { setGroup, group } = props;
  const { setSubGroup, subGroup } = props;
  const { setStaticsIp, staticsIp } = props;

  const dispatch = useDispatch();

  /* //// группы */
  const onChangeGroup = (e) => {
    const { name, value } = e.target;
    setGroup({ ...group, [name]: value });
  };

  const addGroupFN = async (e) => {
    e.preventDefault();

    if (!!!group?.group_name && group?.action != 2) {
      return myAlert("Заполните поле 'Наименование группы'", "error");
    }

    const send = { ...group };
    const res = await dispatch(actionGroupIPreq(send)).unwrap();
    if (res == 1) {
      dispatch(getStaticsIpAddresReq()); //// обноваляю весь список
      setGroup({});
    }
  };

  /* //// подгруппы */
  const onChangeSubGroup = (e) => {
    const { name, value } = e.target;
    if (name == "subgroup_gateway") {
      if (checkChangeIP(value)) {
        setSubGroup({ ...subGroup, [name]: value });
      }
    } else {
      setSubGroup({ ...subGroup, [name]: value });
    }
  };

  const addSubGroupFN = async (e) => {
    e.preventDefault();

    if (!!!subGroup?.subgroup_name && [1, 2].includes(subGroup?.action)) {
      myAlert("Заполните поле 'Наименование подгруппы'", "error");
      return;
    }

    if (
      checkIP(subGroup?.subgroup_gateway) &&
      [1, 2].includes(subGroup?.action)
    ) {
      myAlert("Некорректные данные в поле 'Gateway' ", "error");
      return;
    }

    const res = await dispatch(actionSubGroupIPreq(subGroup)).unwrap();
    if (res == 1) {
      dispatch(getStaticsIpAddresReq()); //// обноваляю весь список
      setSubGroup({});
    }
  };

  /* //// статические ip адреса */
  const onChangeStaticsIP = (e) => {
    const { name, value } = e.target;
    if (name == "static_ip") {
      if (checkChangeIP(value)) {
        setStaticsIp({ ...staticsIp, [name]: value });
      }
    } else {
      setStaticsIp({ ...staticsIp, [name]: value });
    }
  };

  const onChangeSelect = (nameKey, name, id) => {
    setStaticsIp({ ...staticsIp, [nameKey]: id });
  };

  const addStaticsIpFN = async (e) => {
    e.preventDefault();

    if (checkIP(staticsIp?.static_ip) && [1, 2].includes(staticsIp?.action)) {
      if (!!!staticsIp?.static_ip) {
        return myAlert("Некорректные данные в поле 'IP Адрес' ", "error");
      }
      return myAlert("Некорректные данные в поле 'IP Адрес' ", "error");
    }

    if (!!!staticsIp?.static_comment && [1, 2].includes(staticsIp?.action)) {
      return myAlert("Заполните поле 'Комментарий'", "error");
    }

    if (!!!staticsIp?.number_ip && [1, 2].includes(staticsIp?.action)) {
      return myAlert("Заполните поле 'Номер'", "error");
    }

    if (!!!staticsIp?.name_ip && [1, 2].includes(staticsIp?.action)) {
      return myAlert("Заполните поле 'Наименование'", "error");
    }

    const res = await dispatch(actionStaticsIPreq(staticsIp)).unwrap();
    if (res == 1) {
      dispatch(getStaticsIpAddresReq()); //// обноваляю весь список
      setStaticsIp({});
    }
  };

  return (
    <div className="modalsIpAddres">
      {/* //// группы */}
      <Modals
        openModal={group.action == 1 || group.action == 2}
        setOpenModal={() => setGroup({})}
        title={objGroup?.[group?.action]}
      >
        <form onSubmit={addGroupFN}>
          <MyInputs
            title={"Введите наименование группы:"}
            onChange={onChangeGroup}
            name={"group_name"}
            value={group?.group_name}
            required={false}
          />
          <div className="actions">
            <button className="addActionBtn" type="submit">
              Сохранить
            </button>
          </div>
        </form>
      </Modals>

      <ConfirmModal
        state={group.action == 3}
        title={`Удалить группу?`}
        yes={addGroupFN}
        no={() => setGroup({})}
      />

      {/* //// подгруппы */}
      <Modals
        openModal={subGroup.action == 1 || subGroup.action == 2}
        setOpenModal={() => setSubGroup({})}
        title={objSubGroup?.[subGroup?.action]}
      >
        <form onSubmit={addSubGroupFN}>
          <MyInputs
            title={"Наименование: "}
            onChange={onChangeSubGroup}
            name={"subgroup_name"}
            value={subGroup?.subgroup_name}
            required={false}
          />
          <MyInputs
            title={"Gateway: "}
            onChange={onChangeSubGroup}
            name={"subgroup_gateway"}
            value={subGroup?.subgroup_gateway}
            required={false}
          />
          <MyInputs
            title={"Комментарий: "}
            onChange={onChangeSubGroup}
            name={"subgroup_comment"}
            value={subGroup?.subgroup_comment}
            required={false}
          />
          <div className="actions">
            <button className="addActionBtn" type="submit">
              Сохранить
            </button>
          </div>
        </form>
      </Modals>

      {/* //// статические ip адреса */}
      <Modals
        openModal={staticsIp.action == 1 || staticsIp.action == 2}
        setOpenModal={() => setStaticsIp({})}
        title={objStaticsIP?.[staticsIp?.action]}
      >
        <form onSubmit={addStaticsIpFN} className="staticsModal">
          <MyInputs
            title={"IP Адрес: "}
            onChange={onChangeStaticsIP}
            name={"static_ip"}
            value={staticsIp?.static_ip}
            required={false}
          />
          <MyInputs
            title={"Комментарий: "}
            onChange={onChangeStaticsIP}
            name={"static_comment"}
            value={staticsIp?.static_comment}
            required={false}
          />
          <div className="myInput colors">
            <h5>Цвет</h5>
            <Selects
              list={listColorStatics}
              initText={"Выбрать"}
              onChnage={onChangeSelect}
              nameKey={"type_ip"}
            />
          </div>
          <div className="myInput">
            <h5>Контейнер/Виртуалка</h5>
            <Selects
              list={listColorVitual}
              initText={"Выбрать"}
              onChnage={onChangeSelect}
              nameKey={"static_type_color"}
            />
          </div>
          <MyInputs
            title={"Номер: "}
            onChange={onChangeStaticsIP}
            name={"number_ip"}
            value={staticsIp?.number_ip}
            required={false}
            type={"number"}
          />
          <MyInputs
            title={"Наименование: "}
            onChange={onChangeStaticsIP}
            name={"name_ip"}
            value={staticsIp?.name_ip}
            required={false}
          />
          <div className="actions">
            <button className="addActionBtn" type="submit">
              Сохранить
            </button>
          </div>
        </form>
      </Modals>
    </div>
  );
};

export default ModalsIpAddres;
