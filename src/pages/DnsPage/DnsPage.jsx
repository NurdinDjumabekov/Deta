///// hooks
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

//////helpers

////// fns
import { deleteDomen, getDnsDomen } from "../../store/reducers/dnsSlice";
import { getProviders } from "../../store/reducers/requestSlice";

////// icons
import krestIcon from "../../assets/icons/krest.svg";
import SearchIcon from "@mui/icons-material/Search";

////// components
import InnerSubDns from "../../components/DnsPage/InnerSubDns/InnerSubDns";
import EveryDns from "../../components/DnsPage/EveryDns/EveryDns";
import AddDns from "../../components/DnsPage/AddDns/AddDns";
import { Table, TableBody } from "@mui/material";
import { TableCell, TableContainer } from "@mui/material";
import { TableHead, TableRow } from "@mui/material";
import ConfirmModal from "../../common/ConfirmModal/ConfirmModal";

////style
import "./style.scss";

const DnsPage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { activeDns } = useSelector((state) => state.stateSlice);
  const { listDnsDomen } = useSelector((state) => state.dnsSlice);

  const [searchText, setSearchText] = useState("");
  const [filteredDns, setFilteredDns] = useState([]);

  const [guidDelete, setGuidDelete] = useState(""); // храню временный guid для удаления

  function delDns() {
    ///// удаления dns через запрос
    dispatch(deleteDomen({ guidDelete, setGuidDelete, getData }));
  }

  async function getData() {
    const list = await dispatch(getDnsDomen()).unwrap();
    setFilteredDns(list);
    dispatch(getProviders());
    setSearchText("");
  }

  useEffect(() => {
    getData();
  }, [pathname]);

  function onChangeSearch(e) {
    setSearchText(e.target?.value);
  }

  function searchActionFN() {
    if (!!!searchText) {
      getData();
    } else {
      const filtered = listDnsDomen?.filter((item) =>
        item?.domen_name?.toLowerCase()?.includes(searchText?.toLowerCase())
      );
      setFilteredDns(filtered);
    }
  }

  const active = activeDns?.guid == "" ? "activeDns" : "";

  return (
    <>
      <div className="dnsMain">
        <div className="dnsMain__add">
          <div className={`dnsMain__add__inner ${active}`}>
            <AddDns />
            <div className="searchBigData">
              <div>
                <input
                  type="text"
                  placeholder="Поиск по наименованию домена"
                  value={searchText}
                  onChange={onChangeSearch}
                />
                {!!searchText && (
                  <button onClick={() => setSearchText("")} className="clear">
                    <img src={krestIcon} alt="x" />
                  </button>
                )}
              </div>
              <button className="search" onClick={searchActionFN}>
                <SearchIcon />
                <p>Поиск</p>
              </button>
            </div>
            <TableContainer className="dnsMain__table hoverScroll">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "90%", color: "#c0c0c0" }}>
                      Наименования
                    </TableCell>
                    <TableCell
                      style={{
                        width: "10%",
                        color: "#c0c0c0",
                        textAlign: "center",
                      }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredDns?.map((item) => (
                    <EveryDns
                      item={item}
                      setGuidDelete={setGuidDelete}
                      key={item?.guid}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className="dnsMain__edit">
          <InnerSubDns />
        </div>
      </div>

      {/* для удаления  */}
      <ConfirmModal
        state={!!guidDelete}
        title={"Удалить данный домен ?"}
        yes={delDns}
        no={() => setGuidDelete()}
      />
    </>
  );
};

export default DnsPage;
