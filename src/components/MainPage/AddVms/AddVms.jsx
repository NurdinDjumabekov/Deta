///// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

////// components
import { Tooltip } from "@mui/material";
import Modals from "../../../common/Modals/Modals";
import MyInputs from "../../../common/MyInput/MyInputs";
import MySelects from "../../../common/MySelects/MySelects";

/////// imgs

import AddToQueueIcon from "@mui/icons-material/AddToQueue";

////// helpers
import { myAlert } from "../../../helpers/MyAlert";
import { checkChangeRecordName } from "../../../helpers/checkFNS";

/////// fns
import {
  createVmsAccess,
  getDnsDomenCreateVm,
  pastVmsAccess,
} from "../../../store/reducers/actionsContaiersSlice";

///////style
import "./style.scss";
import { extractGuid } from "../../../helpers/transformLists";
import { useLocation } from "react-router-dom";
import { getTypesBackUpReq } from "../../../store/reducers/virtualMachineSlice";
import MyIPInput from "../../../common/MyIPInput/MyIPInput";

const AddVms = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { activeHost } = useSelector((state) => state.stateSlice);
  const { listHosts } = useSelector((state) => state.requestSlice);
  const { listTypeBackUpContainers } = useSelector(
    (state) => state.virtualMachineSlice
  );

  const [actionObj, setActionObj] = useState({});
  const [filteredDns, setFilteredDns] = useState([]);

  const openModal = async () => {
    const result = await dispatch(pastVmsAccess({ activeHost })).unwrap();

    if (result?.res == 1) {
      const list = await dispatch(getDnsDomenCreateVm()).unwrap();
      const new_list = list?.map((i) => {
        return { ...i, value: i?.guid, label: i?.domen_name };
      });
      setFilteredDns(new_list);

      setActionObj({
        vmid: result?.vmid,
        ip_address: result?.network_ip?.ip_address,
        host: { value: result?.host?.guid, label: result?.host?.node_name },
        domen: { value: new_list?.[0]?.value, label: new_list?.[0]?.label },
      });
      await dispatch(getTypesBackUpReq(result?.host?.guid_node)).unwrap();
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name == "sub_domen") {
      if (checkChangeRecordName(value)) {
        setActionObj({ ...actionObj, [name]: value });
      }
    } else {
      setActionObj({ ...actionObj, [name]: value });
    }
  };

  async function onChangeSelect(item) {
    console.log(item, "item");
    const { name } = item;
    if (name == "host") {
      setActionObj({ ...actionObj, [name]: item, storage_for_vm: {} });
      await dispatch(getTypesBackUpReq(item?.guid_node)).unwrap();
    } else {
      setActionObj({ ...actionObj, [name]: item });
    }
  }

  const sendCreateVm = async (e) => {
    e.preventDefault();

    if (!!!actionObj?.host?.value) myAlert("Выберите хост", "error");
    if (!!!actionObj?.storage_for_vm?.value) myAlert("Выберите диск", "error");

    console.log(actionObj, "actionObj");

    // console.log(extractGuid(pathname), "extractGuid(pathname);");

    const send = {
      ...actionObj,
      storage_for_vm: actionObj?.storage_for_vm?.storage_name,
    };

    const result = await dispatch(createVmsAccess(send)).unwrap();
    console.log(result, "result");
    if (result?.res == 1) {
      myAlert("Контейнер скоро создастся, перейдите на страницу логов");
    } else myAlert(result?.mes, "error");
  };

  return (
    <div className="addVms">
      <Tooltip title="Создать контейнер" placement="top">
        <button onClick={openModal}>
          <AddToQueueIcon />
        </button>
      </Tooltip>

      <Modals
        openModal={!!actionObj?.ip_address}
        setOpenModal={() => setActionObj({})}
        title={"Создание контейнера"}
      >
        <form className="addVms__modal" onSubmit={sendCreateVm}>
          <MyInputs
            title={"Новый уникальный номер контейнера"}
            onChange={onChange}
            name={"vmid"}
            value={actionObj?.vmid}
            required={true}
            type={"number"}
          />

          <MySelects
            list={listHosts}
            initText={"Выбрать"}
            onChange={onChangeSelect}
            nameKey={"host"}
            value={actionObj?.host}
            title={"Хост на котором будет создан контейнер"}
          />

          <MySelects
            list={listTypeBackUpContainers?.container}
            initText={"Выбрать"}
            onChange={onChangeSelect}
            nameKey={"storage_for_vm"}
            value={actionObj?.storage_for_vm}
            title={"Целевое хранилище для востановления"}
          />

          <div className="flexBox">
            <MyInputs
              title={"Наименование"}
              onChange={onChange}
              name={"name"}
              value={actionObj?.name}
              required={true}
            />

            <MyIPInput
              title={"Ip контейнера"}
              onChange={onChange}
              name={"ip_address"}
              value={actionObj?.ip_address}
              required={true}
            />
          </div>

          <div className="flexBox">
            <MyInputs
              title={"Суб домен"}
              onChange={onChange}
              name={"sub_domen"}
              value={actionObj?.sub_domen}
            />

            <MySelects
              list={filteredDns}
              initText={"Выбрать"}
              onChange={onChangeSelect}
              nameKey={"domen"}
              value={actionObj?.domen}
              title={"Домен"}
            />
          </div>

          <MyInputs
            title={"Исходный контейнер"}
            onChange={onChange}
            name={"codeid_vm"}
            value={actionObj?.codeid_vm}
            required={true}
            type={"number"}
          />

          <button className="btnAction" type="submit">
            Создать
          </button>
        </form>
      </Modals>
    </div>
  );
};

export default AddVms;
