//////// hooks
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// imgs
import CpuIcon from "@mui/icons-material/Memory";
import MemoryIcon from "@mui/icons-material/Memory";
import StorageIcon from "@mui/icons-material/Storage";
import krest from "../../../assets/icons/krest.svg";

////// fns
import { closeModalStartCont } from "../../../store/reducers/stateSlice";
import { clearOpenAddFiles } from "../../../store/reducers/stateSlice";
import { setOpenModaDelCont } from "../../../store/reducers/stateSlice";
import { setOpenModalAddGroup } from "../../../store/reducers/stateSlice";
import { setOpenModalKeyCont } from "../../../store/reducers/stateSlice";
import { setOpenModaDelGroup } from "../../../store/reducers/stateSlice";
import { setOpenOSModal } from "../../../store/reducers/stateSlice";
import { setOpenModalBackUp } from "../../../store/reducers/stateSlice";
import { clearOpenModalBackUp } from "../../../store/reducers/stateSlice";
import { setOpenModaStoppedCont } from "../../../store/reducers/stateSlice";
import { clearAddTempCont } from "../../../store/reducers/stateSlice";
import { clearTemporaryContainer } from "../../../store/reducers/stateSlice";
import { setAddTempCont } from "../../../store/reducers/stateSlice";
import { setTemporaryContainer } from "../../../store/reducers/stateSlice";
import { addGroupContFN } from "../../../store/reducers/requestSlice";
import { delContainerFN } from "../../../store/reducers/requestSlice";
import { backUpContainerFN } from "../../../store/reducers/requestSlice";
import { delGroupContainerFN } from "../../../store/reducers/requestSlice";
import { editContainers } from "../../../store/reducers/requestSlice";
import { offContainerFN } from "../../../store/reducers/requestSlice";
import { editContainerOS } from "../../../store/reducers/requestSlice";
import { addDelFileInContainer } from "../../../store/reducers/requestSlice";
import { addContainersFN } from "../../../store/reducers/requestSlice";
import { closeLookMoreInfo } from "../../../store/reducers/containersSlice";

/////// styles
import "react-dropzone-uploader/dist/styles.css";
import "./style.scss";

////// components
import SliderScroll from "../../../common/SliderScroll/SliderScroll";
import Modals from "../../../common/Modals/Modals";
import MyInputs from "../../../common/MyInput/MyInputs";
import Selects from "../../../common/Selects/Selects";
import Dropzone from "react-dropzone-uploader";
import AccessesUsers from "./AccessesUsers/AccessesUsers";
import ActionsVirtualMachine from "./ActionsVirtualMachine/ActionsVirtualMachine";

////// helpers
import { listFast } from "../../../helpers/LocalData";
import { listSnaps } from "../../../helpers/LocalData";
import { listTypes } from "../../../helpers/LocalData";
import { myAlert } from "../../../helpers/MyAlert";
import { transformLists } from "../../../helpers/transformLists";
const { REACT_APP_API_URL } = process.env;

const ModalsForContainers = () => {
  const dispatch = useDispatch();

  //////////////////////////////////______////// редактирование
  const { temporaryContainer, activeHost } = useSelector(
    (state) => state.stateSlice
  );

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(setTemporaryContainer({ ...temporaryContainer, [name]: value }));
  };

  const editContainer = () => {
    dispatch(editContainers({ activeHost, data: temporaryContainer }));
  };

  ///// редактирую через ззапрос контейнерм (инфу о контейнере)

  //////////////////////////////////______////// добавление
  const { addTempCont } = useSelector((state) => state.stateSlice);

  const onChangeAdd = (e) => {
    const { name, value } = e.target;
    dispatch(setAddTempCont({ [name]: value }));
  };

  const onChangeSlider = (obj) => dispatch(setAddTempCont(obj));

  const addContainer = () => {
    if (!!!addTempCont?.container_name) {
      return myAlert("Заполните название сервера", "error");
    }

    if (!!!addTempCont?.cpu) {
      return myAlert("Выберите CPU сервера", "error");
    }

    if (!!!addTempCont?.ram) {
      return myAlert("Выберите RAM сервера", "error");
    }

    if (!!!addTempCont?.ssd) {
      return myAlert("Выберите SSD/NVME сервера", "error");
    }

    dispatch(addContainersFN(addTempCont));
  };
  ///// добавляю контейнер через запрос

  //////////////////////////////////______////// операционные системы
  const { openOSModal } = useSelector((state) => state.stateSlice);
  const { listOS } = useSelector((state) => state.requestSlice);

  const choiceOS = (oc_guid) => {
    ///// выбираю ОС через запрос
    const data = { oc_guid, guid_vm: openOSModal, activeHost };
    dispatch(editContainerOS(data));
  };

  //////////////////////////////////______////// добавление файлов
  const { openAddFiles } = useSelector((state) => state.stateSlice);

  const handleChangeStatus = (filesList) => {
    const guid_container = openAddFiles?.guid;

    if (guid_container) {
      const data = new FormData();
      data.append("files", filesList.file);
      data.append("guid_vm", guid_container);
      data.append("status", 1); // 1 - добавление

      dispatch(addDelFileInContainer({ data, guid_container }));
      //// добавляю файлы в контейнер через зарпрос
    }
  };

  const delFilesInCont = (file_guid) => {
    const data = { status: 2, file_guid }; // 2 - добавление
    const guid_container = openAddFiles?.guid;
    // Отправка данных на сервер для удаления

    dispatch(addDelFileInContainer({ data, guid_container }));
    ///// удаление файлов с контейнера
  };

  //////////////////////////////////______////// добавление контейнера в группу
  const { openModalAddGroup } = useSelector((state) => state.stateSlice);
  const { listUsers } = useSelector((state) => state.requestSlice);

  const addContInGroup = (codeid) => {
    const data = { codeid_group: codeid, guid_vm: openModalAddGroup };
    dispatch(addGroupContFN(data));
    ///// добавление контейнера в группу
    ///// guid_vm - guid контейнера
    ///// codeid_group - guid группы(пользов-лей)
  };

  //////////////////////////////////______////// удаление контейнера c группы
  const { openModaDelGroup } = useSelector((state) => state.stateSlice);

  const delContInGroup = () => dispatch(delGroupContainerFN(openModaDelGroup));
  ///// удаление контейнера с группы через запрос (openModaDelGroup - guid контейнера)

  //////////////////////////////////______////// backUp контейнера
  const { openModalBackUp } = useSelector((state) => state.stateSlice);
  const { dataForBackUp } = useSelector((state) => state.requestSlice);

  const listFasts = transformLists(
    dataForBackUp?.storage,
    "guid",
    "storage_name"
  );

  //// и еще 2 таких же селекта

  const onChangeSelect = (nameKey, name, id) => {
    dispatch(setOpenModalBackUp({ ...openModalBackUp, [nameKey]: id }));
  };

  const backUpContainer = () => {
    //////// backUp контейнера через запрос
    if (!!!openModalBackUp?.fasts) {
      return myAlert("Выберите первое", "error");
    }
    if (!!!openModalBackUp?.type) {
      return myAlert("Выберите второе", "error");
    }
    if (!!!openModalBackUp?.snaps) {
      return myAlert("Выберите третье", "error");
    }
    dispatch(backUpContainerFN(openModalBackUp));
  };

  //////////////////////////////////______////// для доступов отображения контейнеров клиентам
  const { openModalKeyCont } = useSelector((state) => state.stateSlice);
  //// остальные действия в компоненте

  //////////////////////////////////______////// запуск контейнера
  const { openModaStartCont } = useSelector((state) => state.stateSlice);
  // setOpenModaStartCont
  // const offContainer = () => dispatch(offContainerFN(openModaStoppedCont));
  //////// запуск контейнера через запрос

  //////////////////////////////////______////// выключения контейнера
  const { openModaStoppedCont } = useSelector((state) => state.stateSlice);

  const offContainer = () => dispatch(offContainerFN(openModaStoppedCont));
  //////// выключения контейнера через запрос

  //////////////////////////////////______////// удаление контейнера
  const { openModaDelCont } = useSelector((state) => state.stateSlice);

  const delContainer = () => dispatch(delContainerFN(openModaDelCont));
  //////// удаление контейнера через запрос

  //////////////////////////////////______////// для просмотра более подробной инфы контейнера
  const { lookMoreInfo } = useSelector((state) => state.containersSlice);

  return (
    <>
      {/*/////////______//////______////// редактирование  */}
      <Modals
        openModal={!!temporaryContainer?.guid}
        setOpenModal={() => dispatch(clearTemporaryContainer())}
        title={"Редактирование"}
      >
        <div className="addDns hostsEdit contEdit">
          <div className="second">
            <div className="myInput">
              <h5>Информация</h5>
              <textarea
                name={"vm_comment"}
                onChange={onChange}
                value={temporaryContainer?.vm_comment}
              />
            </div>
          </div>
          <div className="second actions">
            <button className="addAction" onClick={editContainer}>
              Сохранить
            </button>
          </div>
        </div>
      </Modals>

      {/*/////////______//////______////// добавления контенера  */}
      <Modals
        openModal={addTempCont?.bool}
        setOpenModal={() => dispatch(clearAddTempCont())}
        title={"Создать сервер"}
      >
        <div className="addDns hostsEdit contAdd">
          <MyInputs
            title={"Название"}
            onChange={onChangeAdd}
            name={"container_name"}
            value={addTempCont?.container_name}
          />

          <SliderScroll
            max={222}
            step={1}
            type={"CPU"}
            typeEnd={"ядер"}
            img={<CpuIcon />}
            onChange={onChangeSlider}
            name={"cpu"}
            value={addTempCont?.cpu}
          />

          <SliderScroll
            max={256}
            step={1}
            type={"RAM"}
            typeEnd={"ГБ"}
            img={<MemoryIcon />}
            onChange={onChangeSlider}
            name={"ram"}
            value={addTempCont?.ram}
          />

          <SliderScroll
            max={100}
            step={1}
            type={"SSD/NVME"}
            typeEnd={"ГБ"}
            img={<StorageIcon />}
            onChange={onChangeSlider}
            name={"ssd"}
            value={addTempCont?.ssd}
          />

          <div className="second actions">
            <button className="addAction" onClick={addContainer}>
              Добавить
            </button>
          </div>
        </div>
      </Modals>

      {/*/////////______//////______////// выбор операционной системы*/}
      <Modals
        openModal={!!openOSModal}
        setOpenModal={() => dispatch(setOpenOSModal())}
        title={"Выбрать операционную систему"}
      >
        <div className="addDns hostsEdit osModal">
          <div className="listOS">
            {listOS?.map((i) => (
              <button key={i?.guid} onClick={() => choiceOS(i?.guid)}>
                <img src={`${REACT_APP_API_URL}${i?.icon_url}`} alt="os" />
              </button>
            ))}
          </div>
        </div>
      </Modals>

      {/*/////////______//////______////// добавление файлов в контейнера  */}
      <Modals
        openModal={!!openAddFiles?.guid}
        setOpenModal={() => dispatch(clearOpenAddFiles())}
        title={"Редактирование и добавление файлов"}
      >
        <div className="addDns filesAdd">
          <Dropzone
            onChangeStatus={handleChangeStatus}
            accept="*"
            inputContent={"Прикрепить файлы"}
            inputWithFilesContent={"Прикрепить файлы"}
            submitButtonContent={""}
          />
          <div className="listFiles">
            {openAddFiles?.files?.map((i) => (
              <div className="everyFile">
                <a href={`${REACT_APP_API_URL}${i?.path}`} target="_blank">
                  {i?.original_name}
                </a>
                <button onClick={() => delFilesInCont(i?.guid)}>
                  <img src={krest} alt="x" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Modals>

      {/*/////////______//////______////// добавление контейнера в группу  */}
      <Modals
        openModal={!!openModalAddGroup}
        setOpenModal={() => dispatch(setOpenModalAddGroup())}
        title={"Выберите группу"}
      >
        <div className="addDns choiceGroup">
          <div className="choiceGroup__inner">
            {listUsers?.map((item) => (
              <button
                key={item?.codeid}
                onClick={() => addContInGroup(item?.codeid)}
                className={item?.checked ? "activeGroup" : ""}
              >
                {item?.name}
              </button>
            ))}
          </div>
        </div>
      </Modals>

      {/*/////////______//////______////// удалить контейнер с группы через запрос  */}
      <Modals
        openModal={!!openModaDelGroup}
        setOpenModal={() => dispatch(setOpenModaDelGroup())}
        title={"Вы уверены, что хотите удалить?"}
      >
        <div className="addDns offContainer">
          <button onClick={delContInGroup} className="yes">
            Да
          </button>
          <button
            className="no"
            onClick={() => dispatch(setOpenModaDelGroup(""))}
          >
            Нет
          </button>
        </div>
      </Modals>

      {/*/////////______//////______////// backUp контейнера  */}
      <div className="backUp">
        <Modals
          openModal={!!openModalBackUp?.guid}
          setOpenModal={() => dispatch(clearOpenModalBackUp())}
          title={`Бэкап сервера ${openModalBackUp?.name}`}
        >
          <div className="addDns hostsEdit backUp__inner">
            <div className="backUp__main">
              <Selects
                list={listFasts}
                initText={"Выбрать"}
                onChnage={onChangeSelect}
                nameKey={"fasts"}
              />
              <Selects
                list={listTypes}
                initText={"Выбрать"}
                onChnage={onChangeSelect}
                nameKey={"type"}
              />
              <Selects
                list={listSnaps}
                initText={"Выбрать"}
                onChnage={onChangeSelect}
                nameKey={"snaps"}
              />
            </div>
            <div className="actionsBackUp">
              <button className="addAction" onClick={backUpContainer}>
                ОК
              </button>
            </div>
          </div>
        </Modals>
      </div>

      {/*/////////______//////______////// для доступов отображения контейнеров клиентам  */}
      <Modals
        openModal={!!openModalKeyCont}
        setOpenModal={() => dispatch(setOpenModalKeyCont())}
        title={"Пользователи"}
      >
        <AccessesUsers />
      </Modals>

      {/*/////////______//////______////// запуска контейнера  */}
      <div className="virtual">
        <Modals
          openModal={!!openModaStartCont?.guid}
          setOpenModal={() => dispatch(closeModalStartCont())}
          title={openModaStartCont?.vm_id}
        >
          <ActionsVirtualMachine />
        </Modals>
      </div>

      {/*/////////______//////______////// выключение контейнера  */}
      <Modals
        openModal={!!openModaStoppedCont}
        setOpenModal={() => dispatch(setOpenModaStoppedCont())}
        title={"Вы уверены, что хотите остановить виртуальную машину?"}
      >
        <div className="addDns offContainer">
          <button onClick={offContainer} className="yes">
            Да
          </button>
          <button
            className="no"
            onClick={() => dispatch(setOpenModaStoppedCont(""))}
          >
            Нет
          </button>
        </div>
      </Modals>

      {/*/////////______//////______////// удаление контейнера  */}
      <Modals
        openModal={!!openModaDelCont}
        setOpenModal={() => dispatch(setOpenModaDelCont())}
        title={"Вы уверены, что хотите удалить виртуальную машину?"}
      >
        <div className="addDns offContainer">
          <button onClick={delContainer} className="yes">
            Да
          </button>
          <button
            className="no"
            onClick={() => dispatch(setOpenModaDelCont(""))}
          >
            Нет
          </button>
        </div>
      </Modals>

      {/*/////////______//////______////// просмотр подробной инфы(глазик)  */}
      <Modals
        openModal={!!lookMoreInfo?.guid}
        setOpenModal={() => dispatch(closeLookMoreInfo())}
        title={lookMoreInfo?.vm_name}
      >
        <div className="addDns moreText">
          <pre>{formatText(lookMoreInfo?.info)}</pre>
        </div>
      </Modals>
    </>
  );
};

export default ModalsForContainers;

const formatText = (inputText) => {
  // Декодируем текст из URL-кодировки
  const decodedText = decodeURIComponent(inputText);

  // Заменяем \n на реальные переносы строк
  const formattedText = decodedText?.replace(/\\n/g, "\n");

  return formattedText;
};
