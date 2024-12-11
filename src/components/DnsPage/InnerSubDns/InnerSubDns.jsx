/////// hooks
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////// componnets
import { Table, TableBody } from "@mui/material";
import { TableCell, TableContainer } from "@mui/material";
import { TableHead, TableRow, Paper } from "@mui/material";
import TypeAddDns from "../typesSubDns/TypeAddDns/TypeAddDns";
import ModalsForAllDns from "../ModalsForAllDns/ModalsForAllDns";
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";

////// imgs
import arrowSort from "../../../assets/icons/arrowSort.svg";

////// fns
import {
  editStatusSubDomen,
  sortSubDomen,
} from "../../../store/reducers/dnsSlice";

////// style
import "./style.scss";

////// helpers
import { objTitle } from "../../../helpers/LocalData";
import InnerSubDnsActions from "../InnerSubDnsActions/InnerSubDnsActions";

const InnerSubDns = () => {
  const dispatch = useDispatch();

  const { listDnsSubDomen } = useSelector((state) => state.dnsSlice);
  const { activeDns } = useSelector((state) => state.stateSlice);

  const [guidEdit, setGuidEdit] = useState(""); // храню временный guid для редактирования
  const [guidDelete, setGuidDelete] = useState(""); // храню временный guid для удаления
  const [editStatus, setEditStatus] = useState({});

  const [objEdit, setObjedit] = useState({
    record_name: "",
    host_ip: "",
    ttl: "",
    ttl_type: 1,
    comment: "",
  }); /// временные данные для редактирования

  const [sort, setSort] = useState(1); // счетчик 1 или 2

  const sortList = (field_name) => {
    const newSort = sort == "1" ? "2" : "1";
    setSort(newSort);
    const data = { domen_guid: activeDns?.guid, sort: newSort };
    dispatch(sortSubDomen({ ...data, field_name }));
    ///// сортировка данных через запрос
  };

  const editStatusSubDnsFn = () => {
    ///// изменение статуса dns через запрос
    const { guid } = editStatus;
    const data = { guid, protected: !!!editStatus?.protected };
    const past = { data, setEditStatus, activeDns };
    dispatch(editStatusSubDomen(past));
  };

  return (
    <div className="blockSubDomen">
      <TableContainer component={Paper} className="tableEditDns hoverScroll">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ width: "15%" }}
                onClick={() => sortList("domen_name")}
              >
                Name
                <img src={arrowSort} alt=">" />
              </TableCell>
              <TableCell
                style={{ width: "10%" }}
                onClick={() => sortList("recordType")}
              >
                Types
                <img src={arrowSort} alt=">" />
              </TableCell>
              <TableCell style={{ width: "5%" }}>TTL</TableCell>
              <TableCell style={{ width: "15%" }}>Data</TableCell>
              <TableCell style={{ width: "15%" }}>Change</TableCell>
              <TableCell style={{ width: "8%" }}>Status</TableCell>
              <TableCell style={{ width: "8%" }}></TableCell>
              <TableCell style={{ width: "24%" }}>Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listDnsSubDomen?.map((row) => (
              <TableRow key={row?.guid}>
                <TableCell
                  className="text nameText"
                  style={{ margin: "10px", width: "15%" }}
                >
                  {row?.record_name}
                </TableCell>
                <TableCell className="text name" style={{ width: "10%" }}>
                  {row?.recordType}
                </TableCell>
                <TableCell className="text name" style={{ width: "5%" }}>
                  {row?.ttl}
                </TableCell>
                <TableCell
                  className="text data"
                  style={{
                    width: "15%",
                    maxWidth: 400,
                    overflow: "hidden",
                  }}
                >
                  {row?.host_ip}
                </TableCell>
                <TableCell className="text data" style={{ width: "15%" }}>
                  {row?.host_ip_insurance || ""}
                </TableCell>
                <TableCell className="text name" style={{ width: "8%" }}>
                  {!!row?.active_status ? (
                    <p className="yes">Active</p>
                  ) : (
                    <p className="no">Disactive</p>
                  )}
                </TableCell>
                <TableCell className="text actions" style={{ width: "8%" }}>
                  <InnerSubDnsActions
                    row={row}
                    setGuidEdit={setGuidEdit}
                    setGuidDelete={setGuidDelete}
                    setEditStatus={setEditStatus}
                    setObjedit={setObjedit}
                  />
                </TableCell>
                <TableCell className="text comment" style={{ maxWidth: "24%" }}>
                  {row?.comment}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TypeAddDns />

      {/* //// модалки для удвления и именения ыуб доменов  */}
      <ModalsForAllDns
        guidEdit={guidEdit}
        setGuidEdit={setGuidEdit}
        guidDelete={guidDelete}
        setGuidDelete={setGuidDelete}
        objEdit={objEdit}
        setObjedit={setObjedit}
      />

      {/* для редактирования статуса  */}
      <ConfirmModal
        state={!!editStatus?.guid}
        title={objTitle?.[editStatus?.protected || 0]}
        yes={editStatusSubDnsFn}
        no={() => setEditStatus({})}
      />
    </div>
  );
};

export default InnerSubDns;
