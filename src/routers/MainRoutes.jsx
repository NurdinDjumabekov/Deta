////hooks
import { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//// pages
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import MainLayouts from "../layouts/MainLayouts/MainLayouts";
import MainPage from "../pages/MainPage/MainPage";
import MicroticPage from "../pages/MicroticPage/MicroticPage";
import NetworksPage from "../pages/NetworksPage/NetworksPage";
import HaProxy from "../pages/HaProxyPage/HaProxyPage";
import IpAddresPage from "../pages/IpAddresPage/IpAddresPage";
import DnsPage from "../pages/DnsPage/DnsPage";
import VncPage from "../pages/VncPage/VncPage";

////styles
import "react-toastify/dist/ReactToastify.css";

///// fns
import { getDataCenterReq } from "../store/reducers/dataCenterSlice";

const MainRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { listDataCenter } = useSelector((state) => state.dataCenterSlice);

  useEffect(() => {
    dispatch(getDataCenterReq());
  }, []);

  return (
    <Routes>
      {/* Переадресация на первый центр данных */}
      <Route
        path="/"
        element={
          listDataCenter?.[0]?.guid ? (
            <Navigate to={`/${listDataCenter[0].guid}`} replace />
          ) : (
            <div>Loading...</div>
          )
        }
      />
      {listDataCenter?.map(({ guid }) => (
        <Route element={<MainLayouts />} key={guid}>
          <Route path={`/${guid}`} element={<MainPage />} />
          <Route path={`/${guid}/microtic`} element={<MicroticPage />} />
          <Route path={`/${guid}/networks`} element={<NetworksPage />} />
          <Route path={`/${guid}/ha-proxy`} element={<HaProxy />} />
          <Route path={`/${guid}/ip-addres`} element={<IpAddresPage />} />
          <Route path={`/${guid}/dns`} element={<DnsPage />} />
          <Route path={`/${guid}/vnc/:vns_key`} element={<VncPage />} />
        </Route>
      ))}
      {/* Обработка неверных путей */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default MainRoutes;

{
  /* <Route path="/" element={<SignIn />} /> */
}
