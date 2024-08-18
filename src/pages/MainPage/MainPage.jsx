/////// hooks
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// fns
import {
  getProviders,
  getServices,
  getUsers,
} from "../../store/reducers/requestSlice";
import { getGroup, getHosts } from "../../store/reducers/requestSlice";
import { updatedHosts } from "../../store/reducers/requestSlice";
import { updatedProvoders } from "../../store/reducers/requestSlice";

///////style
import "./style.scss";

///////fns
import { setAddHost } from "../../store/reducers/stateSlice";

///////components
import MenuInner from "../../components/Menu/MenuInner/MenuInner";
import Hosts from "../../components/MainPage/Hosts/Hosts";
import Search from "../../components/MainPage/Search/Search";
import Containers from "../../components/MainPage/Containers/Containers";
import StatusContainers from "../../components/MainPage/StatusContainers/StatusContainers";
import GraphicHosts from "../../components/MainPage/GraphicHosts/GraphicHosts";
import GraphicContainer from "../../components/MainPage/GraphicContainer/GraphicContainer";
import ModalsForContainers from "../../components/MainPage/ModalsForContainers/ModalsForContainers";
import ModalsForHosts from "../../components/MainPage/ModalsForHosts/ModalsForHosts";

const MainPage = () => {
  const dispatch = useDispatch();

  const { listProviders, listHosts, listContainers } = useSelector(
    (state) => state.requestSlice
  );
  const { activeHost, activeContainer } = useSelector(
    (state) => state.stateSlice
  );

  useEffect(() => {
    dispatch(getProviders());
    dispatch(getHosts());
    dispatch(getGroup());
    dispatch(getUsers());
    dispatch(getServices());

    const disconnectProv = dispatch(updatedProvoders()); /// get провайдеров
    const disconnectHost = dispatch(updatedHosts()); /// get хосты

    return () => {
      disconnectProv();
      disconnectHost();
      // Отключение сокетов при размонтировании компонента
    };
  }, [dispatch]);

  const checkContainer = activeContainer == 0 ? "activeContainer" : "";

  const addHost = () => dispatch(setAddHost({ bool: true }));
  //// открываю модалку для добавления хоста

  // console.log(listContainers, "listContainers");
  console.log(listProviders, "listProviders");

  return (
    <div className="mainPage">
      <div className="providers">
        <div className="providers__main">
          <button className="addBtn" onClick={addHost}>
            +
          </button>
          <div className="providers__main__inner">
            {listProviders?.map((item, index) => (
              <div key={index}>
                <p>{item?.provider_name}</p>
                <div
                  className={
                    item?.provider_status == 1 ? "roundGreen" : "roundRed"
                  }
                />
                <span>{item?.provider_pingtime}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hostAndContainer">
        <div className={`hosts ${activeHost == 0 ? "activeHosts" : ""}`}>
          <div className="hosts__inner">
            {listHosts?.map((item) => (
              <Hosts key={item?.guid} item={item} />
            ))}
          </div>
          <div className="hosts__more_info">
            <GraphicHosts />
          </div>
          <ModalsForHosts />
        </div>

        <MenuInner />
        <div className={`containers ${checkContainer}`}>
          <div className="containers__inner">
            {listContainers?.map((item, index) => (
              <Containers key={index} item={item} />
            ))}
          </div>
          <div className="containers__more_info">
            <GraphicContainer />
          </div>
          <ModalsForContainers />
          {/* ///// модалки контейнеров */}
        </div>
        <StatusContainers />
      </div>
    </div>
  );
};

export default MainPage;
