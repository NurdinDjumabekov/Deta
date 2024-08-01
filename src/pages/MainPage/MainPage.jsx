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

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHosts());
  }, []);

  return (
    <div className="mainPage">
      <div className="providers">
        <button className="addBtn">+ Добавить</button>
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
        <div className="hosts">
          {hosts?.map((item, index) => (
            <Hosts key={index} item={item} />
          ))}
        </div>

        <MenuInner />

        <div className="containers">
          {containers?.map((item, index) => (
            <Containers key={index} item={item} />
          ))}
        </div>
        <StatusContainers />
      </div>
    </div>
  );
};

export default MainPage;
