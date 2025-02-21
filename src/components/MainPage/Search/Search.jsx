/////// hooks
import React from "react";
import { useDispatch } from "react-redux";
import debounce from "debounce";
import { useCallback, useState } from "react";

///////style
import "./style.scss";

//////// fns
import {
  setActiveContainer,
  setActiveHost,
} from "../../../store/reducers/stateSlice";
import { searchContainers } from "../../../store/reducers/requestSlice";
import { getHosts } from "../../../store/reducers/requestSlice";

////// imgs
import loop from "../../../assets/icons/loop.svg";
import SearchIcon from "@mui/icons-material/Search";
import { myAlert } from "../../../helpers/MyAlert";

const Search = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  // const searchData = useCallback();
  // debounce((text) => {
  //   if (text?.length > 1) {
  //     dispatch(searchContainers(text));
  //     // Выполнение поиска с заданными параметрами

  //     dispatch(setActiveHost(0)); //// активный хост
  //     dispatch(setActiveContainer(0)); //// активный контейнер
  //     /////// сброс все автивных состояний
  //   }
  // }, 500),
  // []

  const searchData = (e) => {
    e.preventDefault();
    const error = "Введите текст в поисковую строку";
    if (input == "") return myAlert(error, "error");
    dispatch(searchContainers(input));
    dispatch(setActiveHost(0)); //// активный хост
    dispatch(setActiveContainer(0)); // активный контейнер
    /////// сброс все автивных состояний
  };

  const onChange = (e) => {
    ///// поиск контейнеров
    const text = e?.target?.value;
    setInput(text);
    // text?.length == 0 && dispatch(getHosts());
  };

  return (
    <form className="mainAction" onSubmit={searchData}>
      <div className="mainSearch">
        <input onChange={onChange} value={input} />
      </div>
      <button type="submit">
        <img src={loop} alt="" />
      </button>
    </form>
  );
};

export default Search;
