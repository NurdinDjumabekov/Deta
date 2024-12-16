/////// hooks
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

////// helpers
import { extractGuid } from "../../../helpers/transformLists";
import { pages, pagesAllDC } from "../../../helpers/LocalData";

////// components
import LogOut from "../../LogOut/LogOut";

////// styles
import "./style.scss";
import {
  setActiveContainer,
  setActiveHost,
} from "../../../store/reducers/stateSlice";

////// fns

const MenuBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { listDataCenter } = useSelector((state) => state.dataCenterSlice);

  const clickDataCenter = ({ guid }) => {
    navigate(`/${guid}/hosts`);
    dispatch(setActiveHost(0));
    dispatch(setActiveContainer(0));
  };

  return (
    <div className="menuBar">
      <div className="dataCenters">
        <div className="menu__list">
          {pagesAllDC?.map((item) => (
            <NavLink
              key={item.id}
              className={`every ${pathname == `${item?.path}` ? "active" : ""}`}
              to={`${item.path}`}
            >
              <div>
                <img src={item.img} alt="" />
              </div>
              <p>{item?.name}</p>
            </NavLink>
          ))}
        </div>
        <div className="dataCenters__inner">
          {listDataCenter?.map((item, index) => (
            <a
              key={item?.guid}
              className={`every ${
                pathname?.includes(item?.guid) ? "activeDC" : ""
              }`}
              onClick={() => clickDataCenter(item)}
            >
              <p>
                {index + 1}. {item?.date_center_name}
              </p>
            </a>
          ))}
        </div>
      </div>
      <div className="menu menuItems">
        <div className="menu__list menuItems__inner">
          {pages?.map((item) => (
            <NavLink
              key={item.id}
              className={`every ${
                pathname == `/${extractGuid(pathname)}${item.path}`
                  ? "active"
                  : ""
              }`}
              to={`/${
                extractGuid(pathname) || "9B26D1D4-5F84-4224-9643-03E28A57F7F1"
              }${item.path}`}
            >
              <div>
                <img src={item.img} alt="" />
              </div>
              <p>{item.name}</p>
            </NavLink>
          ))}
        </div>
        <LogOut />
      </div>
    </div>
  );
};

export default MenuBar;
