///// hooks
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

////// components
import { Tooltip } from "@mui/material";
import AddVms from "../AddVms/AddVms";

/////// imgs
import displayIcon from "../../../assets/icons/display.svg";
import addContainer from "../../../assets/icons/addContainer.svg";
import displayRedIcon from "../../../assets/icons/displayRed.svg";
import boxRed from "../../../assets/icons/boxRed.svg";
import boxGreen from "../../../assets/icons/boxGreen.svg";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";

////// helpers
import { allSumsProvidersFN } from "../../../helpers/LocalData";
import { myAlert } from "../../../helpers/MyAlert";

/////// fns
import { getTypesBackUpReq } from "../../../store/reducers/virtualMachineSlice";
import { getListBackUpReq } from "../../../store/reducers/virtualMachineSlice";

///////style
import "./style.scss";
import { test_nurdin } from "../../../store/reducers/actionsContaiersSlice";

const CountsVM = ({ setModalCreate }) => {
  const dispatch = useDispatch();

  const { countsContainers } = useSelector((state) => state.requestSlice);
  const { listHosts } = useSelector((state) => state.requestSlice);
  const { activeHost } = useSelector((state) => state.stateSlice);

  const openModalCreateContainer = async () => {
    //// открываю модалки создания контейнера
    if (!!!activeHost) return myAlert("Выберите хост", "error");

    const { guid_node } = listHosts?.find((item) => activeHost == item?.guid);
    const res = await dispatch(getTypesBackUpReq(guid_node)).unwrap();
    if (res?.res == 1) {
      const item = res?.hosts?.[0];
      const send = { guid_storage: item?.guid, guid_node };
      await dispatch(getListBackUpReq(send)).unwrap();
      setModalCreate({ actionType: 1 });
    }
  };

  const textFn = () => {
    const host = listHosts?.find((item) => activeHost == item?.guid);

    console.log(host, "host");
    dispatch(test_nurdin({ ...host, vm_id: "333610" }));
  };

  return (
    <div className="header__counts">
      <div
        className="every addContainer addAllVm"
        // onClick={openModalCreateContainer}
      >
        {/* <Tooltip title="Создать контейнер" placement="top">
          <img src={addContainer} alt="add" />
        </Tooltip> */}
        <AddVms />
        {/* <button onClick={textFn}>asdasd</button> */}
      </div>
      <div className="every" style={{ minWidth: "60px" }}>
        <p>Всего: </p>
        <p>{allSumsProvidersFN(countsContainers) || 0}</p>
      </div>
      <div className="every">
        <img src={displayIcon} alt="" />
        <p>{countsContainers?.countVpsOn || 0}</p>
      </div>
      <div className="every">
        <img src={displayRedIcon} alt="" />
        <p>{countsContainers?.countVpsOff || 0}</p>
      </div>
      <div className="every">
        <img src={boxRed} alt="" />
        <p>{countsContainers?.countContainerOff || 0}</p>
      </div>
      <div className="every">
        <img src={boxGreen} alt="" />
        <p>{countsContainers?.countContainerOn || 0}</p>
      </div>
      <div className="every lastEvery">
        <p>{activeHost ? `GUID:  ${activeHost}` : ""}</p>
      </div>
    </div>
  );
};

export default CountsVM;
