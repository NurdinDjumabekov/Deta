/////// hooks
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// fns
import { getProviders } from "../../store/reducers/requestSlice";
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
import aknet from "../../assets/images/providers/aknet.jpg";
import saima from "../../assets/images/providers/saima.jpg";
import megaline from "../../assets/images/providers/megaline.jpg";

const MainPage = () => {
  const dispatch = useDispatch();

  const { listProviders, listHosts, listContainers } = useSelector(
    (state) => state.requestSlice
  );
  const { activeHost, activeContainer } = useSelector(
    (state) => state.stateSlice
  );

  // const listImgsProv = [aknet, saima, saima, megaline];

  useEffect(() => {
    dispatch(getProviders());
    dispatch(getHosts());
    dispatch(getGroup());

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
                  {/* <img src={listImgsProv?.[index]} alt="" /> */}
                  {/* <div className="moreInfo">{item?.provider_name}</div> */}
                  <div className="title">{item?.provider_name}</div>
                  <span>{item?.provider_pingtime}</span>
                  <div
                    className={
                      item?.provider_status == 1 ? "roundGreen" : "roundRed"
                    }
                  />
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
