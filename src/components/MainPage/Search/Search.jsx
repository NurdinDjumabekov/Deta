/////// hooks
import React from "react";
import { useDispatch } from "react-redux";
import debounce from "debounce";
import { useCallback, useState } from "react";

///////style
import "./style.scss";

//////// fns
import {
  clearMenuInner,
  setActiveContainer,
  setActiveHost,
  setAddTempCont,
} from "../../../store/reducers/stateSlice";
import { searchContainers } from "../../../store/reducers/requestSlice";
import { getHosts } from "../../../store/reducers/requestSlice";

////// imgs
import loop from "../../../assets/icons/loop.svg";

const Search = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const openAddCont = () => dispatch(setAddTempCont({ bool: true }));
  ///// открываю модалку для добавоения контейнеров

  const searchData = useCallback(
    debounce((text) => {
      if (text?.length > 1) {
        dispatch(searchContainers(text));
        // Выполнение поиска с заданными параметрами

        dispatch(clearMenuInner()); /// активное меню
        dispatch(setActiveHost(0)); //// активный хост
        dispatch(setActiveContainer(0)); //// активный контейнер
        /////// сброс все автивных состояний
      }
    }, 500),
    []
  );

  const onChange = (e) => {
    ///// поиск контейнеров
    const text = e?.target?.value;
    setInput(text);
    searchData(text);
    text?.length === 0 ? dispatch(getHosts()) : searchData(text);
  };

  return (
    <div className="mainAction">
      {/* <button onClick={openAddCont}>+</button> */}
      <div className="mainSearch">
        <img src={loop} alt="" />
        <input type="search" onChange={onChange} value={input} />
      </div>
    </div>
  );
};

export default Search;
