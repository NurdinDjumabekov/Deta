/////// hooks
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

/////// fns
import {
  clearListHostsFN,
  clearMainPage,
  getProviders,
} from "../../store/reducers/requestSlice";
import { getHosts } from "../../store/reducers/requestSlice";
import { updatedHosts } from "../../store/reducers/requestSlice";
import { setAddHost } from "../../store/reducers/stateSlice";

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
import ModalForProviders from "../../components/ModalForProviders/ModalForProviders";
import CloneModal from "../../components/CloneModal/CloneModal";
import MigrateHostModal from "../../components/MigrateHostModal/MigrateHostModal";
import CountsVM from "../../components/MainPage/CountsVM/CountsVM";

///////style
import "./style.scss";
import { Tooltip } from "@mui/material";

const MainPage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [modalCreate, setModalCreate] = useState({}); /// для модалки создания контейнера

  const { listHosts, listContainers } = useSelector(
    (state) => state.requestSlice
  );
  const { activeHost, activeContainer } = useSelector(
    (state) => state.stateSlice
  );

  async function getData() {
    dispatch(clearListHostsFN([]));
    const res = await dispatch(getHosts()).unwrap();
    // if (res?.length > 0) {
    //   const guid_host = res?.data?.[2]?.guid;
    //   const chart = res?.data?.[2]?.chart;
    //   const node_ram_mb = res?.data?.[0]?.node_ram_mb;
    //   dispatch(getContainers(guid_host));
    //   /// подставляю первый хост чтобы он был активный
    //   dispatch(setListDiagrams({ list: chart, node_ram_mb }));
    //   //// для диаграммы хостов
    // }
  }

  useEffect(() => {
    getData();
    dispatch(getProviders());

    /// для получения данных для процесса бэкапа
    const disconnectHost = dispatch(updatedHosts()); /// get хосты

    return () => {
      disconnectHost();
      // Отключение сокетов при размонтировании компонента
      dispatch(clearMainPage());
    };
  }, [pathname]);

  const checkContainer = activeContainer == 0 ? "activeContainer" : "";

  function addHost() {
    //// открываю модалку для добавления хоста
    dispatch(setAddHost({ bool: true }));
  }

  const fliter = listHosts?.filter((i) => {
    if (i?.host_ip == "10.10.10.158" || i?.host_ip == "11.12.100.3") {
      return i;
    }
  });

  return (
    <>
      <div className="mainPage">
        <div className="providers">
          <div className="providers__main">
            <Tooltip title="Добавить хост" placement="right">
              <button className="addBtn" onClick={addHost}>
                +
              </button>
            </Tooltip>
            <ViewProviders setModalCreate={setModalCreate} />
          </div>
        </div>

        <div className="hostAndContainer">
          <div className={`hosts ${activeHost == 0 ? "activeHosts" : ""}`}>
            <div className="hosts__inner hoverScroll">
              {fliter?.map((item) => (
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
              <CountsVM />
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

      <CloneModal />
      <MigrateHostModal />
      <ModalForProviders />
      {/* ///// модалки контейнеров перезагрузка, удаление откл и т.д. */}
    </>
  );
};

export default MainPage;
