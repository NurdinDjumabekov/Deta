///// hooks
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////style
import "./style.scss";

//////helpers

////// fns
import { deleteDomen, getDnsDomen } from "../../store/reducers/requestSlice";

////// components
import InnerSubDns from "../../components/DnsPage/InnerSubDns/InnerSubDns";
import EveryDns from "../../components/DnsPage/EveryDns/EveryDns";
import AddDns from "../../components/DnsPage/AddDns/AddDns";
import Modals from "../../common/Modals/Modals";
import { Table, TableBody } from "@mui/material";
import { TableCell, TableContainer } from "@mui/material";
import { TableHead, TableRow } from "@mui/material";

const DnsPage = () => {
  const dispatch = useDispatch();

  const { activeDns } = useSelector((state) => state.stateSlice);
  const { listDnsDomen } = useSelector((state) => state.requestSlice);

  const [guidDelete, setGuidDelete] = useState(""); // храню временный guid для удаления

  const delDns = () => dispatch(deleteDomen({ guidDelete, setGuidDelete }));
  ///// удаления dns через запрос

  useEffect(() => {
    dispatch(getDnsDomen());
  }, []);

  const active = activeDns === "" ? "activeDns" : "";

  return (
    <>
      <div className="dnsMain">
        <div className="dnsMain__add">
          <div className={`dnsMain__add__inner ${active}`}>
            <TableContainer className="dnsMain__table">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "40%", color: "#c0c0c0" }}>
                      Наименования
                    </TableCell>
                    <TableCell style={{ width: "12%", color: "#c0c0c0" }}>
                      Expire
                    </TableCell>
                    <TableCell style={{ width: "12%", color: "#c0c0c0" }}>
                      Negative
                    </TableCell>
                    <TableCell style={{ width: "12%", color: "#c0c0c0" }}>
                      Refresh
                    </TableCell>
                    <TableCell style={{ width: "12%", color: "#c0c0c0" }}>
                      Retry
                    </TableCell>
                    <TableCell
                      style={{
                        width: "12%",
                        color: "#c0c0c0",
                        textAlign: "center",
                      }}
                    >
                      ...
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listDnsDomen?.map((item) => (
                    <EveryDns
                      item={item}
                      setGuidDelete={setGuidDelete}
                      key={item?.guid}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="actionDns">
              <AddDns />
            </div>
          </div>
        </div>
        <div className="dnsMain__edit">
          <InnerSubDns />
        </div>
      </div>

      {/* для удаления  */}
      <Modals
        openModal={!!guidDelete}
        setOpenModal={() => setGuidDelete()}
        title={"Удалить данный домен ?"}
      >
        <div className="modalDel">
          <button className="yes" onClick={delDns}>
            Да
          </button>
          <button className="no" onClick={() => setGuidDelete("")}>
            Нет
          </button>
        </div>
      </Modals>
    </>
  );
};

export default DnsPage;
