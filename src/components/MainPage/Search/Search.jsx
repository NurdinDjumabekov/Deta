import React from "react";

///////style
import "./style.scss";

////// imgs
import loop from "../../../assets/icons/loop.svg";

const Search = () => {
  return (
    <div className="mainSearch">
      <img src={loop} alt="" />
      <input type="text" />
    </div>
  );
};

export default Search;
