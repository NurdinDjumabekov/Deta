/////// hooks
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

/////// fns
import { getOS, getProviders } from "../../store/reducers/requestSlice";
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
import Containers from "../../components/MainPage/Containers/Containers";
import Volns from "../../components/MainPage/Volns/Volns";
import GraphicHosts from "../../components/MainPage/GraphicHosts/GraphicHosts";
import GraphicContainer from "../../components/MainPage/GraphicContainer/GraphicContainer";
import ModalsForContainers from "../../components/MainPage/ModalsForContainers/ModalsForContainers";
import ModalsForHosts from "../../components/MainPage/ModalsForHosts/ModalsForHosts";

/////// imgs
import displayIcon from "../../assets/icons/display.svg";
import displayRedIcon from "../../assets/icons/displayRed.svg";
import boxRed from "../../assets/icons/boxRed.svg";
import boxGreen from "../../assets/icons/boxGreen.svg";

const MainPage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { listProviders, listHosts, listContainers, countsContainers } =
    useSelector((state) => state.requestSlice);
  const { activeHost, activeContainer } = useSelector(
    (state) => state.stateSlice
  );

  useEffect(() => {
    dispatch(getProviders());
    dispatch(getHosts());
    dispatch(getGroup());
    dispatch(getOS());

    /// для получения данных для процесса бэкапа

    const disconnectProv = dispatch(updatedProvoders()); /// get провайдеров
    const disconnectHost = dispatch(updatedHosts()); /// get хосты

    return () => {
      disconnectProv();
      disconnectHost();
      // Отключение сокетов при размонтировании компонента
    };
  }, [pathname]);

  const checkContainer = activeContainer == 0 ? "activeContainer" : "";

  const addHost = () => dispatch(setAddHost({ bool: true }));
  //// открываю модалку для добавления хоста

  console.log(countsContainers, "countsContainers");

  const allCount =
    +countsContainers?.countContainerOff +
    +countsContainers?.countVpsOff +
    +countsContainers?.countVpsOn +
    +countsContainers?.countContainerOn;

  return (
    <>
      <div className="mainPage">
        <div className="providers">
          <div className="providers__main">
            <button className="addBtn" onClick={addHost}>
              +
            </button>
            <div className="providers__main__inner">
              {listProviders?.map((item, index) => (
                <div key={index}>
                  <div className="title">{item?.provider_name}</div>
                  <span>({item?.provider_pingtime})</span>
                  <div
                    className="pingtime"
                    style={{ background: pingtimeFN(item) }}
                  />
                </div>
              ))}
            </div>
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
                <div className="every">
                  <p>Всего: </p>
                  <p>{allCount}</p>
                </div>
                <div className="every">
                  <img src={displayIcon} alt="" />
                  <p>{countsContainers?.countVpsOn}</p>
                </div>
                <div className="every">
                  <img src={displayRedIcon} alt="" />
                  <p>{countsContainers?.countVpsOff}</p>
                </div>
                <div className="every">
                  <img src={boxRed} alt="" />
                  <p>{countsContainers?.countContainerOff}</p>
                </div>
                <div className="every">
                  <img src={boxGreen} alt="" />
                  <p>{countsContainers?.countContainerOn}</p>
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
      {/* ///// модалки контейнеров */}
    </>
  );
};

export default MainPage;

const pingtimeFN = ({ provider_pingtime }) => {
  if (+provider_pingtime < 5) {
    return "green";
  } else if (+provider_pingtime > 5 && +provider_pingtime < 40) {
    return "orange";
  } else {
    return "red";
  }
};
