/////// hooks
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import Modals from "../../../common/Modals/Modals";
import TypeAddDns from "../TypeAddDns/TypeAddDns";

////// imgs
import editIcon from "../../../assets/icons/edit.svg";
import krestIcon from "../../../assets/icons/krest.svg";

////// style
import "./style.scss";

////// helpers

////// fns
import { deleteSubDomen } from "../../../store/reducers/requestSlice";
import { editSubDomen } from "../../../store/reducers/requestSlice";
import MyInputs from "../../../common/MyInput/MyInputs";

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

  const delDns = () => {
    ///// удаления суб домена через запрос
    dispatch(deleteSubDomen({ guidDelete, setGuidDelete, activeDns }));
  };

  ////// редактирование

  const editDns = () => {
    ///// редактирование суб домена через запрос
    dispatch(editSubDomen({ setGuidEdit, setObjedit, objEdit, activeDns }));
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    // Если поле "ttl", проверяем, чтобы вводились только цифры
    if (name === "ttl") {
      if (/^\d*$/.test(value)) {
        setObjedit({ ...objEdit, [name]: value });
      }
    } else {
      setObjedit({ ...objEdit, [name]: value });
    }
  };

  return (
    <>
      <div className={`blockSubDomen`}>
        <TableContainer component={Paper} className="tableEditDns">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="title name" style={{ width: "15%" }}>
                  Наименования
                </TableCell>
                <TableCell className="title type" style={{ width: "20%" }}>
                  Типы
                </TableCell>
                <TableCell className="title ttl" style={{ width: "10%" }}>
                  TTL
                </TableCell>
                <TableCell className="title dta" style={{ width: "15%" }}>
                  Data
                </TableCell>
                <TableCell className="title action" style={{ width: "10%" }}>
                  ...
                </TableCell>
                <TableCell className="title comment" style={{ width: "30%" }}>
                  Комментарии
                </TableCell>
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
                  <TableCell className="text name" style={{ width: "20%" }}>
                    {row?.recordType}
                  </TableCell>
                  <TableCell className="text name" style={{ width: "10%" }}>
                    {row?.ttl}
                  </TableCell>
                  <TableCell className="text data" style={{ width: "15%" }}>
                    {row?.host_ip}
                  </TableCell>
                  <TableCell className="text actions" style={{ width: "10%" }}>
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
                  <TableCell
                    className="text comment"
                    style={{ maxWidth: "30%" }}
                  >
                    {row?.comment}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TypeAddDns />
      </div>

      {/* для удаления  */}
      <Modals
        openModal={!!guidDelete}
        setOpenModal={() => setGuidDelete()}
        title={"Удалить данный элемент ?"}
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
      {/* для удаления  */}

      {/* ///// для редактирования */}
      <Modals
        openModal={!!guidEdit}
        setOpenModal={() => setGuidEdit()}
        title={"Редактировать ?"}
      >
        <div className="addDns modalEdit">
          <div className="second">
            <MyInputs
              title={"Record name (host) :"}
              onChange={onChange}
              name={"record_name"}
              value={objEdit?.record_name}
            />

            <MyInputs
              title={"Host IP address :"}
              onChange={onChange}
              name={"host_ip"}
              value={objEdit?.host_ip}
            />
          </div>

          <div className="time">
            <MyInputs
              title={"Record TTL :"}
              onChange={onChange}
              name={"ttl"}
              value={objEdit?.ttl}
            />

            <div className="comments">
              <MyInputs
                title={"Record comments :"}
                onChange={onChange}
                name={"comment"}
                value={objEdit?.comment}
              />
            </div>
          </div>

          <div className="second actions">
            <button className="addAction" onClick={editDns}>
              Редактировать
            </button>
          </div>
        </div>
      </Modals>
      {/* ///// для редактирования */}
    </>
  );
};

export default InnerSubDns;
