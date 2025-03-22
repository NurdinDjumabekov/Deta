/////// hooks
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

/////// fns
import { getHistoryActionsReq } from "../../store/reducers/virtualMachineSlice";

///////components
import Containers from "../../components/MainPage/Containers/Containers";
import ModalsForContainers from "../../components/MainPage/ModalsForContainers/ModalsForContainers";

/////// imgs
import krestIcon from "../../assets/icons/krest.svg";

////// helpers
import { format } from "date-fns";

///////style
import "./style.scss";

const HistoryPage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { listHistoryAction } = useSelector(
    (state) => state.virtualMachineSlice
  );

  const [searchText, setSearchText] = useState("");

  const onChangeSearch = (e) => {
    setSearchText(e.target?.value);
  };

  const clearInput = (e) => {
    setSearchText("");
  };

  useEffect(() => {
    dispatch(getHistoryActionsReq());
  }, [pathname]);

  return (
    <>
      <div className="historyPage">
        <div className="header">
          <div className="searchBigData">
            <input
              type="text"
              placeholder="Поиск"
              value={searchText}
              onChange={onChangeSearch}
            />
            {/* {!!searchText && (
              <button onClick={clearInput}>
                <img src={krestIcon} alt="x" />
              </button>
            )} */}
          </div>
        </div>
        <div className="body hoverScroll">
          {listHistoryAction?.map((item, index) => (
            <div className="everyHistory" key={index}>
              <p className="time">{item?.date_system_t}</p>
              <Containers key={index} item={item} />
            </div>
          ))}
        </div>
      </div>
      <ModalsForContainers />
      {/* ///// модалки контейнеров */}
    </>
  );
};

export default HistoryPage;
