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

////// imgs
import editIcon from "../../../assets/icons/edit.svg";
import krestIcon from "../../../assets/icons/krest.svg";

////// fns
import { sortSubDomen } from "../../../store/reducers/requestSlice";

////// style
import "./style.scss";

const InnerSubDns = () => {
  const dispatch = useDispatch();

  const { listDnsSubDomen } = useSelector((state) => state.requestSlice);
  const { activeDns } = useSelector((state) => state.stateSlice);

  const [guidEdit, setGuidEdit] = useState(""); // храню временный guid для редактирования
  const [guidDelete, setGuidDelete] = useState(""); // храню временный guid для удаления
  const [objEdit, setObjedit] = useState({
    record_name: "",
    host_ip: "",
    ttl: "",
    ttl_type: 1,
    comment: "",
  }); /// временные данные для редактирования

  const callEditFN = (obj) => {
    setGuidEdit(obj?.guid); //// активный guid для редактирования
    setObjedit(obj); //// временный обьект для редактирования
  };
  ///// вызов модалки для релактирования данных суб домена

  const callDeleteFn = (guid) => setGuidDelete(guid);
  ///// вызов модалки для удаления данных суб домена

  const [sort, setSort] = useState(1); // счетчик 1 или 2

  const sortList = (field_name) => {
    const newSort = sort == "1" ? "2" : "1";
    setSort(newSort);
    const data = { domen_guid: activeDns?.guid, sort: newSort };
    dispatch(sortSubDomen({ ...data, field_name }));
    ///// сортировка данных через запрос
  };

  return (
    <div className="blockSubDomen">
      <TableContainer component={Paper} className="tableEditDns">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ width: "15%" }}
                onClick={() => sortList("domen_name")}
              >
                Name
              </TableCell>
              <TableCell
                style={{ width: "10%" }}
                onClick={() => sortList("recordType")}
              >
                Types
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
                <TableCell className="text data" style={{ width: "15%" }}>
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
                  <div className="blockActions">
                    <button
                      className="actions__btns"
                      onClick={() => callEditFN(row)}
                    >
                      <img src={editIcon} alt="e" />
                    </button>
                    <button
                      className="actions__btns krest"
                      onClick={() => callDeleteFn(row?.guid)}
                    >
                      <img src={krestIcon} alt="x" />
                    </button>
                  </div>
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

      <ModalsForAllDns
        guidEdit={guidEdit}
        setGuidEdit={setGuidEdit}
        guidDelete={guidDelete}
        setGuidDelete={setGuidDelete}
        objEdit={objEdit}
        setObjedit={setObjedit}
      />
      {/* //// модалки для удвления и именения ыуб доменов  */}
    </div>
  );
};

export default InnerSubDns;
