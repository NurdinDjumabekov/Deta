////hooks
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

///// igms
import logout from "../../assets/images/logout.png";

///// styles
import "./style.scss";

////// fns
import { clearDataSaveFN } from "../../store/reducers/saveDataSlice";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const closeWeb = () => {
    navigate("/");
    dispatch(clearDataSaveFN());
  };

  return (
    <div className="logout">
      <button onClick={closeWeb}>
        <img src={logout} alt="logout" />
        <p>Выйти</p>
      </button>
    </div>
  );
};

export default LogOut;
