/////// hooks
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

/////// fns
import {
  clearListHostsFN,
  getContainers,
  getProviders,
} from "../../store/reducers/requestSlice";
import { getHosts } from "../../store/reducers/requestSlice";
import { updatedHosts } from "../../store/reducers/requestSlice";
import { setAddHost, setListDiagrams } from "../../store/reducers/stateSlice";
import { updatedProvoders } from "../../store/reducers/requestSlice";
import {
  getListBackUpReq,
  getTypesBackUpReq,
} from "../../store/reducers/virtualMachineSlice";

///////components
import MenuInner from "../../components/Menu/MenuInner/MenuInner";
import Hosts from "../../components/MainPage/Hosts/Hosts";
import Containers from "../../components/MainPage/Containers/Containers";
import Volns from "../../components/MainPage/Volns/Volns";
import GraphicHosts from "../../components/MainPage/GraphicHosts/GraphicHosts";
import GraphicContainer from "../../components/MainPage/GraphicContainer/GraphicContainer";
import ModalsForContainers from "../../components/MainPage/ModalsForContainers/ModalsForContainers";
import ModalsForHosts from "../../components/MainPage/ModalsForHosts/ModalsForHosts";
import ViewProviders from "../../common/ViewProviders/ViewProviders";
import CreateContainers from "../../components/MainPage/ModalsForContainers/CreateContainers/CreateContainers";
import { Tooltip } from "@mui/material";

/////// imgs
import displayIcon from "../../assets/icons/display.svg";
import addContainer from "../../assets/icons/addContainer.svg";
import displayRedIcon from "../../assets/icons/displayRed.svg";
import boxRed from "../../assets/icons/boxRed.svg";
import boxGreen from "../../assets/icons/boxGreen.svg";

////// helpers
import { allSumsProvidersFN } from "../../helpers/LocalData";
import { myAlert } from "../../helpers/MyAlert";

///////style
import "./style.scss";

const MainPage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [modalCreate, setModalCreate] = useState({}); /// для модалки создания контейнера

  const { listHosts, listContainers, countsContainers } = useSelector(
    (state) => state.requestSlice
  );
  const { activeHost, activeContainer } = useSelector(
    (state) => state.stateSlice
  );

  async function getData() {
    dispatch(clearListHostsFN([]));
    const res = await dispatch(getHosts()).unwrap();
    if (res?.length > 0) {
      const guid_host = res?.data?.[0]?.guid;
      const chart = res?.data?.[0]?.chart;
      const node_ram_mb = res?.data?.[0]?.node_ram_mb;
      dispatch(getContainers(guid_host));
      /// подставляю первый хост чтобы он был активный
      dispatch(setListDiagrams({ list: chart, node_ram_mb }));
      //// для диаграммы хостов
    }
  }

  useEffect(() => {
    getData();
    dispatch(getProviders());

    /// для получения данных для процесса бэкапа
    const disconnectHost = dispatch(updatedHosts()); /// get хосты

    return () => {
      disconnectHost();
      // Отключение сокетов при размонтировании компонента
    };
  }, [pathname]);

  const checkContainer = activeContainer == 0 ? "activeContainer" : "";

  function addHost() {
    //// открываю модалку для добавления хоста
    dispatch(setAddHost({ bool: true }));
  }

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
    <>
      <div className="mainPage">
        <div className="providers">
          <div className="providers__main">
            <button className="addBtn" onClick={addHost}>
              +
            </button>
            <ViewProviders />
          </div>
        </div>

        <div className="hostAndContainer">
          <div className={`hosts ${activeHost == 0 ? "activeHosts" : ""}`}>
            <div className="hosts__inner hoverScroll">
              {listHosts?.map((item) => (
                <Hosts key={item?.guid} item={item} />
              ))}
            </div>
            <div className="hosts__more_info">
              <GraphicHosts />
            </div>
          </div>

          <MenuInner />

          <div className={`containers ${checkContainer}`}>
            <div className="containers__inner">
              <div className="header__counts">
                <div
                  className="every addContainer"
                  onClick={openModalCreateContainer}
                >
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
              <div className="list hoverScroll">
                {listContainers?.map((item, index) => (
                  <Containers key={index} item={item} />
                ))}
              </div>
            </div>
            <div className="containers__more_info">
              <GraphicContainer />
            </div>
          </div>

          <Volns />
        </div>
      </div>

      <ModalsForHosts />
      {/* ///// модалки хостов */}

      <ModalsForContainers />
      {/* ///// модалки контейнеров перезагрузка, удаление откл и т.д. */}

      <CreateContainers
        modalCreate={modalCreate}
        setModalCreate={setModalCreate}
      />
      {/* ///// модалки контейнеров перезагрузка, удаление откл и т.д. */}
    </>
  );
};

export default MainPage;
