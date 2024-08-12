/////// hooks
import React from "react";
import { useSelector } from "react-redux";

////// componnets
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

////// imgs
import editIcon from "../../../assets/icons/edit.svg";
import krestIcon from "../../../assets/icons/krest.svg";

////// style
import "./style.scss";

////// helpers
import { innerDns } from "../../../helpers/LocalData";
import { useState } from "react";
import Modals from "../../../common/Modals/Modals";

const InnerDns = () => {
  const { listDnsSubDomen } = useSelector((state) => state.requestSlice);

  const [guidEdit, setGuidEdit] = useState("");

  const edit = (guid) => {
    console.log(guid, "guid");
    setGuidEdit(guid);
  };

  return (
    <>
      <TableContainer component={Paper} className="tableEditDns">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="title name">Наименования</TableCell>
              <TableCell className="title type">Типы</TableCell>
              <TableCell className="title ttl">TTL</TableCell>
              <TableCell className="title dta">Data</TableCell>
              <TableCell className="title action">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {innerDns?.map((row) => (
              <TableRow key={row?.guid}>
                <TableCell className="text nameText">
                  {row.name} asda da sdas d asdasdsa
                </TableCell>
                <TableCell className="text name">
                  {row.type}a sda sdasd asd asd asd a sdaasd asd asd asdasd as
                </TableCell>
                <TableCell className="text name">{row.ttl}</TableCell>
                <TableCell className="text data">{row.data}</TableCell>
                <TableCell className="text actions">
                  <div className="blockActions">
                    <button
                      className="actions__btns"
                      onClick={() => edit("row?.guid")}
                    >
                      <img src={editIcon} alt="e" />
                    </button>
                    <button className="actions__btns krest">
                      <img src={krestIcon} alt="x" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modals openModal={!!guidEdit} setOpenModal={() => setGuidEdit()}>
        asdasdasd
      </Modals>
    </>
  );
};

export default InnerDns;
