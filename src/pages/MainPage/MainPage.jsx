import React from "react";
import { useEffect } from "react";

/////// hooks
import { useDispatch, useSelector } from "react-redux";

/////// fns
import { getHosts } from "../../store/reducers/requestSlice";

///////style
import "./style.scss";

///////helpers
import { containers, hosts, providers } from "../../helpers/LocalData";

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

  const { activeHost, activeContainer } = useSelector(
    (state) => state.stateSlice
  );

  useEffect(() => {
    dispatch(getHosts());
  }, []);

  const checkContainer = activeContainer == 0 ? "activeContainer" : "";

  return (
    <div className="mainPage">
      <div className="providers">
        <button className="addBtn">+</button>
        <div className="providers__inner">
          {providers?.map((item, index) => (
            <div key={index}>
              <p>{item?.name}</p>
              <div className="round"></div>
              <span>{item?.speed}</span>
            </div>
          ))}
        </div>
        <Search />
      </div>

      <div className="hostAndContainer">
        <div className={`hosts ${activeHost == 0 ? "activeHosts" : ""}`}>
          <div className="hosts__inner">
            {hosts?.map((item, index) => (
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
