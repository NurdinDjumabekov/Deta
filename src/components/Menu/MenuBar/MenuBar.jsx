/////// hooks
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

////// helpers
import { pages } from "../../../helpers/LocalData";

////// components
import LogOut from "../../LogOut/LogOut";

////// styles
import "./style.scss";

const MenuBar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="menuBar">
      <div className="menuBar__inner">
        {pages?.map((item) => (
          <NavLink
            key={item?.id}
            className={`every ${pathname === item?.path ? "active" : ""}`}
            to={item?.path}
          >
            <div>
              <img src={item?.img} alt="" />
            </div>
            <p>{item?.name}</p>
          </NavLink>
        ))}
      </div>
      <LogOut />
    </div>
  );
};

export default MenuBar;
