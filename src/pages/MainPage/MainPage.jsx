/////// hooks
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// fns
import { getHosts, getProviders } from "../../store/reducers/requestSlice";
import { updatedHosts } from "../../store/reducers/requestSlice";
import { updatedProvoders } from "../../store/reducers/requestSlice";

///////style
import "./style.scss";

///////helpers
import { containers, hosts } from "../../helpers/LocalData";

///////components
import MenuInner from "../../components/Menu/MenuInner/MenuInner";
import Hosts from "../../components/MainPage/Hosts/Hosts";
import Search from "../../components/MainPage/Search/Search";
import Containers from "../../components/MainPage/Containers/Containers";
import StatusContainers from "../../components/MainPage/StatusContainers/StatusContainers";
import GraphicHosts from "../../components/MainPage/GraphicHosts/GraphicHosts";
import GraphicContainer from "../../components/MainPage/GraphicContainer/GraphicContainer";

const MainPage = () => {
  const dispatch = useDispatch();

  const { listProviders, listHosts } = useSelector(
    (state) => state.requestSlice
  );
  const { activeHost, activeContainer } = useSelector(
    (state) => state.stateSlice
  );

  useEffect(() => {
    dispatch(getProviders());
    dispatch(getHosts());

    const disconnectProv = dispatch(updatedProvoders()); /// get провайдеров
    const disconnectHost = dispatch(updatedHosts()); /// get хосты

    return () => {
      disconnectProv();
      disconnectHost();
      // Отключение сокетов при размонтировании компонента
    };
  }, [dispatch]);

  console.log(listHosts, "listHosts");

  const checkContainer = activeContainer == 0 ? "activeContainer" : "";

  return (
    <div className="mainPage">
      <div className="providers">
        <button className="addBtn">+</button>
        <div className="providers__inner">
          {listProviders?.map((item, index) => (
            <div key={index}>
              <p>{item?.provider_name}</p>
              <div
                className={
                  item?.provider_status == 1 ? "roundGreen" : "roundRed"
                }
              ></div>
              <span>{item?.provider_pingtime}</span>
            </div>
          ))}
        </div>
        <Search />
      </div>

      <div className="hostAndContainer">
        <div className={`hosts ${activeHost == 0 ? "activeHosts" : ""}`}>
          <div className="hosts__inner">
            {listHosts?.map((item, index) => (
              <Hosts key={index} item={item} />
            ))}
          </div>
          <div className="hosts__more_info">
            <GraphicHosts />
          </div>
        </div>

        <MenuInner />

        <div className={`containers ${checkContainer}`}>
          <div className="containers__inner">
            {containers?.map((item, index) => (
              <Containers key={index} item={item} />
            ))}
          </div>
          <div className="containers__more_info">
            <GraphicContainer />
          </div>
        </div>
        <StatusContainers />
      </div>
    </div>
  );
};

export default MainPage;
