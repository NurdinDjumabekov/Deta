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
import TodosPage from "../pages/TodosPage/TodosPage";
import BazaPage from "../pages/BazaPage/BazaPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import HistoryPage from "../pages/HistoryPage/HistoryPage";

////styles
import "react-toastify/dist/ReactToastify.css";

///// fns
import { getDataCenterReq } from "../store/reducers/dataCenterSlice";
import Test from "../components/Test/Test";

const MainRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { listDataCenter } = useSelector((state) => state.dataCenterSlice);
  const { dataSave } = useSelector((state) => state.saveDataSlice);

  useEffect(() => {
    dispatch(getDataCenterReq());
  }, []);

  return (
    <Routes>
      {!!!dataSave?.token ? (
        <Route path="/" element={<LoginPage />} />
      ) : (
        <>
          <Route path="/" element={<Navigate to={`/dns`} replace />} />
          {listDataCenter?.map(({ guid }) => (
            <Route element={<MainLayouts />} key={guid}>
              <Route path={`/networks`} element={<NetworksPage />} />
              <Route path={`/ip-addres`} element={<IpAddresPage />} />
              <Route path={`/dns`} element={<DnsPage />} />
              <Route path={`/todos`} element={<TodosPage />} />
              <Route path={`/history`} element={<HistoryPage />} />
              <Route path={`/${guid}/hosts`} element={<MainPage />} />
              <Route path={`/${guid}/microtic`} element={<MicroticPage />} />
              <Route path={`/${guid}/ha-proxy`} element={<HaProxy />} />
              <Route path={`/${guid}/baza`} element={<BazaPage />} />
              <Route path={`/${guid}/vnc/:vns_key`} element={<VncPage />} />
            </Route>
          ))}
        </>
      )}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default MainRoutes;

{
  /* <Route path="/" element={<SignIn />} /> */
}
