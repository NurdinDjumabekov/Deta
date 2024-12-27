/////// hooks
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// fns
import {
  createBackUpContainerReq,
  getListBackUpReq,
} from "../../../../store/reducers/virtualMachineSlice";

///////components
import Modals from "../../../../common/Modals/Modals";
import MySelects from "../../../../common/MySelects/MySelects";
import { Table, TableBody } from "@mui/material";
import { TableCell, TableContainer } from "@mui/material";
import { TableHead, TableRow } from "@mui/material";
import MyInputs from "../../../../common/MyInput/MyInputs";
import MyTextArea from "../../../../common/MyTextArea/MyTextArea";

/////// imgs

////// helpers
import { myAlert } from "../../../../helpers/MyAlert";

///////style
import "./style.scss";
import { format } from "date-fns";

const CreateContainers = (props) => {
  const dispatch = useDispatch();

  const { modalCreate, setModalCreate } = props;
  const [modalCreateConf, setModalCreateConf] = useState({});

  const { listBackUpContainers, listTypeBackUpContainers } = useSelector(
    (state) => state.virtualMachineSlice
  );
  const { listHosts } = useSelector((state) => state.requestSlice);
  const { activeHost } = useSelector((state) => state.stateSlice);

  function onChangeSelect(item) {
    setModalCreate({ ...modalCreate, storage: item });
    const { guid_node } = listHosts?.find((item) => activeHost == item?.guid);
    const send = { guid_storage: item?.guid, guid_node };
    dispatch(getListBackUpReq(send));
  }

  function onChange(e) {
    const { name, value } = e.target;
    setModalCreateConf({ ...modalCreateConf, [name]: value });
  }

  function onChangeSelectStorage(item) {
    setModalCreateConf({ ...modalCreateConf, storage: item });
  }

  const objHost = listHosts?.find((item) => activeHost == item?.guid);

  function openModalCreateCont(item) {
    //// для открытия второй модалки для создания контейнера
    const send = { actionType: 2, source: item?.volid };
    setModalCreateConf({ ...item, ...modalCreate, ...send });
  }

  async function createBackUpCont(e) {
    e.preventDefault();

    if (!!!modalCreateConf?.name) {
      return myAlert("Заполните наименование", "error");
    }
    if (!!!modalCreateConf?.description) {
      return myAlert("Заполните описание", "error");
    }
    if (!!!modalCreateConf?.source) {
      return myAlert("Заполните путь", "error");
    }

    const send = {
      name: modalCreateConf?.name,
      description: modalCreateConf?.description,
      source: modalCreateConf?.source,
      storage: modalCreateConf?.storage?.value,
      guid_host: objHost?.guid_node,
      type: modalCreateConf?.subtype,
    };
    const res = await dispatch(createBackUpContainerReq(send)).unwrap();
  }

  const objList = {
    lxc: listTypeBackUpContainers?.container,
    qemu: listTypeBackUpContainers?.vm,
  };

  return (
    <>
      <div className="modalBackUp">
        <Modals
          openModal={modalCreate?.actionType == 1}
          setOpenModal={() => setModalCreate({})}
          title={`${objHost?.host_name || ""}`}
        >
          <MySelects
            list={listTypeBackUpContainers?.hosts}
            initText={"Выбрать"}
            onChange={onChangeSelect}
            nameKey={"storage"}
            value={modalCreate?.storage}
            title={"Хранилище"}
          />
          <TableContainer className="hoverScroll">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "6%", color: "#c0c0c0" }}>
                    VMID
                  </TableCell>
                  <TableCell style={{ width: "22%", color: "#c0c0c0" }}>
                    Имя
                  </TableCell>
                  <TableCell style={{ width: "10%", color: "#c0c0c0" }}>
                    Заметки
                  </TableCell>
                  <TableCell style={{ width: "18%", color: "#c0c0c0" }}>
                    Дата
                  </TableCell>
                  <TableCell style={{ width: "8%", color: "#c0c0c0" }}>
                    Формат
                  </TableCell>
                  <TableCell style={{ width: "12%", color: "#c0c0c0" }}>
                    Размер
                  </TableCell>
                  <TableCell
                    style={{ width: "12%", color: "#c0c0c0" }}
                  ></TableCell>
                  <TableCell
                    style={{ width: "12%", color: "#c0c0c0" }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listBackUpContainers?.map((item) => (
                  <TableRow>
                    <TableCell style={{ width: "6%", textAlign: "left" }}>
                      {item?.vmid}
                    </TableCell>
                    <TableCell style={{ width: "22%" }}>
                      {item?.vmid}/
                      {new Date(+item?.ctime * 1000)?.toISOString()}
                    </TableCell>
                    <TableCell style={{ width: "10%" }}>{item?.name}</TableCell>
                    <TableCell style={{ width: "18%" }}>
                      {format(+item?.ctime, "yyyy-MM-dd HH:mm:ss")}
                    </TableCell>
                    <TableCell style={{ width: "8%" }}>
                      {item?.format}
                    </TableCell>
                    <TableCell style={{ width: "12%" }}>
                      {(+item?.size / 1048576).toFixed(2)} MB
                    </TableCell>
                    <TableCell style={{ width: "12%" }}>
                      <div
                        className="action"
                        onClick={() => openModalCreateCont(item)}
                      >
                        <button>Восстановить</button>
                      </div>
                    </TableCell>
                    <TableCell style={{ width: "12%" }}>
                      <div className="action">
                        <button>Скачать файлы</button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Modals>
      </div>
      <div className="addContainer">
        <Modals
          openModal={modalCreateConf?.actionType == 2}
          setOpenModal={() => setModalCreateConf({})}
          title={`${objHost?.host_name || ""}`}
        >
          <form onSubmit={createBackUpCont}>
            <MySelects
              list={objList?.[modalCreateConf?.subtype]}
              initText={"Выбрать"}
              onChange={onChangeSelectStorage}
              nameKey={"storage"}
              value={modalCreateConf?.storage}
              title={"Выберите хранилище"}
            />

            <MyInputs
              title={"Наименование"}
              onChange={onChange}
              name={"name"}
              value={modalCreateConf?.name}
            />

            <MyTextArea
              title={"Описание"}
              onChange={onChange}
              name={"description"}
              value={modalCreateConf?.description}
            />

            <MyInputs
              title={"Путь"}
              onChange={onChange}
              name={"source"}
              value={modalCreateConf?.source}
            />

            <div className="saveStandart" type="submit">
              <button>Сохранить</button>
            </div>
          </form>
        </Modals>
      </div>
    </>
  );
};

export default CreateContainers;
