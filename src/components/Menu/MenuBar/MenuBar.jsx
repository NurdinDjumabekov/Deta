/////// hooks
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

////// helpers
import { extractGuid } from "../../../helpers/transformLists";
import { pages } from "../../../helpers/LocalData";

////// components
import LogOut from "../../LogOut/LogOut";

////// styles
import "./style.scss";

////// fns

const MenuBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname, state } = useLocation();

  const { listDataCenter } = useSelector((state) => state.dataCenterSlice);

  const clickDataCenter = ({ guid }) => navigate(`/${guid}`);

  return (
    <>
      <div className="dataCenters">
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
      <div className="menuBar">
        <div className="menuBar__inner">
          {pages?.map((item) => (
            <NavLink
              key={item.id}
              className={`every ${
                pathname == `/${extractGuid(pathname)}${item.path}`
                  ? "active"
                  : ""
              }`}
              to={`/${extractGuid(pathname)}${item.path}`}
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
    </>
  );
};

export default MenuBar;
