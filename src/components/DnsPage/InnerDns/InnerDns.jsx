import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./style.scss";
import { innerDns } from "../../../helpers/LocalData";

const InnerDns = () => {
  return (
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
          {innerDns?.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="text nameText">
                {row.name} asda da sdas d asdasdsa
              </TableCell>
              <TableCell className="text name">
                {row.type}a sda sdasd asd asd asd a sdaasd asd asd asdasd as
              </TableCell>
              <TableCell className="text name">{row.ttl}</TableCell>
              <TableCell className="text data">{row.data}</TableCell>
              <TableCell className="text name">
                <IconButton>
                  <EditIcon style={{ color: "brown" }} />
                </IconButton>
                <IconButton>
                  <DeleteIcon style={{ color: "red" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InnerDns;
