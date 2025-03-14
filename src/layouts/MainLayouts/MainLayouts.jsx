/////// hooks
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MenuBar from "../../components/Menu/MenuBar/MenuBar";

/////// style
import "./style.scss";

/////// fns
import { getOS } from "../../store/reducers/requestSlice";
import { getUsersServiceReq } from "../../store/reducers/usersSlice";

const MainLayouts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {}, [pathname]);

  useEffect(() => {
    dispatch(getOS());
    dispatch(getUsersServiceReq({}));
  }, []);

  document.addEventListener("gesturestart", function (event) {
    event.preventDefault();
  });

  return (
    <div className="mainLayouts">
      <MenuBar />
      <Outlet />
    </div>
  );
};

export default MainLayouts;
