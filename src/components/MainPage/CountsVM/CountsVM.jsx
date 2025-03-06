///// hooks
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

////// components
import { Tooltip } from "@mui/material";

/////// imgs
import displayIcon from "../../../assets/icons/display.svg";
import addContainer from "../../../assets/icons/addContainer.svg";
import displayRedIcon from "../../../assets/icons/displayRed.svg";
import boxRed from "../../../assets/icons/boxRed.svg";
import boxGreen from "../../../assets/icons/boxGreen.svg";

////// helpers
import { allSumsProvidersFN } from "../../../helpers/LocalData";
import { myAlert } from "../../../helpers/MyAlert";

/////// fns
import { getTypesBackUpReq } from "../../../store/reducers/virtualMachineSlice";
import { getListBackUpReq } from "../../../store/reducers/virtualMachineSlice";

const CountsVM = ({ setModalCreate }) => {
  const dispatch = useDispatch();

  const { countsContainers } = useSelector((state) => state.requestSlice);
  const { listHosts } = useSelector((state) => state.requestSlice);
  const { activeHost } = useSelector((state) => state.stateSlice);

  async function openModalCreateContainer() {
    //// открываю модалки создания контейнера
    if (!!!activeHost) {
      return myAlert("Выберите хост", "error");
    }
    const { guid_node } = listHosts?.find((item) => activeHost == item?.guid);
    const res = await dispatch(getTypesBackUpReq(guid_node)).unwrap();
    if (res?.res == 1) {
      const item = res?.hosts?.[0];
      const send = { guid_storage: item?.guid, guid_node };
      await dispatch(getListBackUpReq(send)).unwrap();
      setModalCreate({ actionType: 1 });
    }
  }

  return (
    <div className="header__counts">
      <div className="every addContainer" onClick={openModalCreateContainer}>
        <Tooltip title="Создать контейнер" placement="top">
          <img src={addContainer} alt="add" />
        </Tooltip>
      </div>
      <div className="every">
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
      <div className="every">
        <p>{activeHost ? `GUID:  ${activeHost}` : ""}</p>
      </div>
    </div>
  );
};

export default CountsVM;
