/////// hooks
import React from "react";
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

////// imgs
import editIcon from "../../../assets/icons/edit.svg";
import krestIcon from "../../../assets/icons/krest.svg";

////// style
import "./style.scss";

////// helpers
import { innerDns, listSel } from "../../../helpers/LocalData";
import { useState } from "react";
import Modals from "../../../common/Modals/Modals";

////// fns
import { deleteSubDomen } from "../../../store/reducers/requestSlice";
import { editSubDomen } from "../../../store/reducers/requestSlice";
import MyInputs from "../../../common/MyInput/MyInputs";
import Selects from "../../../common/Selects/Selects";

const InnerDns = () => {
  const dispatch = useDispatch();

  const { listDnsSubDomen } = useSelector((state) => state.requestSlice);
  const { activeDns } = useSelector((state) => state.stateSlice);

  const [guidEdit, setGuidEdit] = useState(""); // храню временный guid для редактирования
  const [guidDelete, setGuidDelete] = useState(""); // храню временный guid для удаления
  const [objEdit, detObjedit] = useState({
    record_name: "",
    host_ip: "",
    ttl: "",
    ttl_type: 1,
    comment: "",
  }); /// временные данные для редактирования

  const callEditFN = (obj) => {
    setGuidEdit(obj?.guid); //// активный guid для редактирования
    detObjedit(obj); //// временный обьект для редактирования
  };
  ///// вызов модалки для релактирования данных суб домена

  const callDeleteFn = (guid) => setGuidDelete(guid);
  ///// вызов модалки для удаления данных суб домена

  const delDns = () => {
    ///// удаления суб домена через запрос
    dispatch(deleteSubDomen({ guidDelete, setGuidDelete, activeDns }));
  };

  console.log(objEdit, "objEdit");

  ////// редактирование

  const editDns = () => {
    ///// редактирование суб домена через запрос
    dispatch(editSubDomen({ setGuidEdit, detObjedit, objEdit, activeDns }));
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    // Если поле "ttl", проверяем, чтобы вводились только цифры
    if (name === "ttl") {
      if (/^\d*$/.test(value)) {
        detObjedit({ ...objEdit, [name]: value });
      }
    } else {
      detObjedit({ ...objEdit, [name]: value });
    }
  };

  const onChangeSelect = (nameKey, name, id) => {
    detObjedit({ ...objEdit, [nameKey]: id });
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
            {listDnsSubDomen?.map((row) => (
              <TableRow key={row?.guid}>
                <TableCell className="text nameText" style={{ margin: "10px" }}>
                  {row?.domen_name}
                </TableCell>
                <TableCell className="text name">{row?.recordType} </TableCell>
                <TableCell className="text name">{row?.record_ttl}</TableCell>
                <TableCell className="text data">{row?.record_name}</TableCell>
                <TableCell className="text actions">
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

            <Selects
              list={listSel}
              initText={"Выбрать"}
              onChnage={onChangeSelect}
              nameKey={"ttl_type"}
            />
          </div>

          <div className="second">
            <MyInputs
              title={"Record comments :"}
              onChange={onChange}
              name={"comment"}
              value={objEdit?.comment}
            />
          </div>

          <div className="second actions">
            <button className="addAction" onClick={editDns}>
              Редактировать
            </button>
          </div>
        </div>
      </Modals>
      {/* ///// для удаления редактирования */}
    </>
  );
};

export default InnerDns;
