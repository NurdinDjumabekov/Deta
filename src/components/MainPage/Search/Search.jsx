import React from "react";
import { useDispatch } from "react-redux";

///////style
import "./style.scss";

//////// fns
import { setAddTempCont } from "../../../store/reducers/stateSlice";

////// imgs
import loop from "../../../assets/icons/loop.svg";

const Search = () => {
  const dispatch = useDispatch();

  const openAddCont = () => dispatch(setAddTempCont({ bool: true }));
  ///// открываю модалку для добавоения контейнеров

  return (
    <div className="mainAction">
      <button onClick={openAddCont}>+</button>
      <div className="mainSearch">
        <img src={loop} alt="" />
        <input type="text" />
      </div>
    </div>
  );
};

export default Search;
