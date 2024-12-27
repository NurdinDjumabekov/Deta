////hooks
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

///// igms
import logout from "../../assets/images/logout.png";

///// styles
import "./style.scss";

////// fns
import { clearDataSaveFN } from "../../store/reducers/saveDataSlice";

////// components
import ConfirmModal from "../../common/ConfirmModal/ConfirmModal";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [close, setClose] = useState(false);

  const closeWeb = () => {
    navigate("/");
    dispatch(clearDataSaveFN());
  };

  const checkMainPage = location?.pathname?.includes("hosts");

  return (
    <>
      <div className={`logout ${checkMainPage ? "checkMainPage" : ""}`}>
        <button onClick={() => setClose(true)}>
          <img src={logout} alt="logout" />
          <p>Выйти</p>
        </button>
      </div>
      <ConfirmModal
        state={close}
        title={"Выйти ?"}
        yes={closeWeb}
        no={() => setClose(false)}
      />
    </>
  );
};

export default LogOut;
