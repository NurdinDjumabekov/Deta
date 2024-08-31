///// hooks
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//////helpers

////// fns
import {
  deleteDomen,
  getDnsDomen,
  getProviders,
} from "../../store/reducers/requestSlice";

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

  const { activeDns } = useSelector((state) => state.stateSlice);
  const { listDnsDomen } = useSelector((state) => state.requestSlice);

  const [guidDelete, setGuidDelete] = useState(""); // храню временный guid для удаления

  const delDns = () => dispatch(deleteDomen({ guidDelete, setGuidDelete }));
  ///// удаления dns через запрос

  useEffect(() => {
    dispatch(getDnsDomen());
    dispatch(getProviders());
  }, []);

  const active = activeDns?.guid === "" ? "activeDns" : "";

  return (
    <>
      <div className="dnsMain">
        <div className="dnsMain__add">
          <div className={`dnsMain__add__inner ${active}`}>
            <AddDns />
            <TableContainer className="dnsMain__table">
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
