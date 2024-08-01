////hooks
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MenuBar from "../../components/Menu/MenuBar/MenuBar";

///////style
import "./style.scss";

const MainLayouts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <div className="mainLayouts">
      <MenuBar />
      <Outlet />
    </div>
  );
};

export default MainLayouts;
