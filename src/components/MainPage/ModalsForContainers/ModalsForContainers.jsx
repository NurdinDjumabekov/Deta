import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone-uploader";

/////// imgs
import CpuIcon from "@mui/icons-material/Memory";
import MemoryIcon from "@mui/icons-material/Memory";
import StorageIcon from "@mui/icons-material/Storage";

////// fns
import {
  closeModalStartCont,
  setOpenModaDelCont,
  setOpenModaStartCont,
  setOpenModalAddGroup,
  setOpenModalKeyCont,
} from "../../../store/reducers/stateSlice";
import { setOpenModaDelGroup } from "../../../store/reducers/stateSlice";
import { setOpenOSModal } from "../../../store/reducers/stateSlice";
import { setOpenModalBackUp } from "../../../store/reducers/stateSlice";
import { clearOpenModalBackUp } from "../../../store/reducers/stateSlice";
import { setOpenModaStoppedCont } from "../../../store/reducers/stateSlice";
import { setOpenAddFiles } from "../../../store/reducers/stateSlice";
import { clearAddTempCont } from "../../../store/reducers/stateSlice";
import { clearTemporaryContainer } from "../../../store/reducers/stateSlice";
import { setAddTempCont } from "../../../store/reducers/stateSlice";
import { setTemporaryContainer } from "../../../store/reducers/stateSlice";
import {
  addGroupContFN,
  delContainerFN,
  editAccessesUsersFN,
} from "../../../store/reducers/requestSlice";
import { backUpContainerFN } from "../../../store/reducers/requestSlice";
import { delGroupContainerFN } from "../../../store/reducers/requestSlice";
import { editContainers } from "../../../store/reducers/requestSlice";
import { offContainerFN } from "../../../store/reducers/requestSlice";
import { editContainerOS } from "../../../store/reducers/requestSlice";
import { addFileInContainer } from "../../../store/reducers/requestSlice";
import { addContainersFN } from "../../../store/reducers/requestSlice";

/////// styles
import "react-dropzone-uploader/dist/styles.css";
import "./style.scss";

////// components
import SliderScroll from "../../../common/SliderScroll/SliderScroll";
import Modals from "../../../common/Modals/Modals";
import MyInputs from "../../../common/MyInput/MyInputs";
import Selects from "../../../common/Selects/Selects";

////// helpers
import { listFast, listGr } from "../../../helpers/LocalData";
import { listOS, listSnaps } from "../../../helpers/LocalData";
import { listTypes } from "../../../helpers/LocalData";
import { myAlert } from "../../../helpers/MyAlert";
import AccessesUsers from "./AccessesUsers/AccessesUsers";
import ActionsVirtualMachine from "./ActionsVirtualMachine/ActionsVirtualMachine";
import { closeLookMoreInfo } from "../../../store/reducers/containersSlice";

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

  const addContainer = () => dispatch(addContainersFN(addTempCont));
  ///// добавляю контейнер через запрос

  //////////////////////////////////______////// операционные системы
  const { openOSModal } = useSelector((state) => state.stateSlice);

  const choiceOS = (id_os) => {
    ///// выбираю ОС через запрос
    dispatch(editContainerOS({ id_os, guid: openOSModal }));
  };

  //////////////////////////////////______////// добавление файлов
  const { openAddFiles } = useSelector((state) => state.stateSlice);

  const addFilesInCont = (files) => {
    ///// добавление файлов в контейнера
    dispatch(addFileInContainer({ openAddFiles, files }));
  };

  //////////////////////////////////______////// добавление контейнера в группу
  const { openModalAddGroup } = useSelector((state) => state.stateSlice);

  const addContInGroup = (guid) => {
    dispatch(addGroupContFN({ guid_group: guid, guid: openModalAddGroup }));
    ///// добавление контейнера в группу
    ///// guid - guid контейнера
    ///// guid_group - guid группы
  };

  //////////////////////////////////______////// удаление контейнера c группы
  const { openModaDelGroup } = useSelector((state) => state.stateSlice);

  const delContInGroup = () => dispatch(delGroupContainerFN(openModaDelGroup));
  ///// удаление контейнера с группы через запрос

  //////////////////////////////////______////// backUp контейнера
  const { openModalBackUp } = useSelector((state) => state.stateSlice);

  const onChangeSelect = (nameKey, name, id) => {
    dispatch(setOpenModalBackUp({ ...openModalBackUp, [nameKey]: id }));
  };

  const backUpContainer = () => {
    //////// backUp контейнера через запрос
    if (!!!openModalBackUp?.fasts) {
      return myAlert("Выберите первое");
    }
    if (!!!openModalBackUp?.type) {
      return myAlert("Выберите второе");
    }
    if (!!!openModalBackUp?.snaps) {
      return myAlert("Выберите третье");
    }
    dispatch(backUpContainerFN(openModalBackUp));
  };

  //////////////////////////////////______////// для доступов отображения контейнеров клиентам
  const { openModalKeyCont } = useSelector((state) => state.stateSlice);

  const editAccesses = () => dispatch(editAccessesUsersFN(openModaStoppedCont));
  //////// смена доступов отображения контейнеров клиентам

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

  // console.log(lookMoreInfo, "lookMoreInfo");

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
              <button key={i?.id} onClick={() => choiceOS(i?.id)}>
                <img src={i?.img} alt="os" />
              </button>
            ))}
          </div>
        </div>
      </Modals>

      {/*/////////______//////______////// добавление файлов в контейнера  */}
      <Modals
        openModal={!!openAddFiles}
        setOpenModal={() => dispatch(setOpenAddFiles())}
        title={"Редактирование"}
      >
        <div className="addDns filesAdd">
          <Dropzone
            onSubmit={addFilesInCont}
            accept="*"
            inputContent={"Прикрепить файл"}
            inputWithFilesContent={"Добавить файл"}
            submitButtonContent={"Сохранить"}
          />
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
            {listGr?.map((item, index) => (
              <button onClick={() => addContInGroup(item?.guid)} key={index}>
                {item?.name}
              </button>
            ))}
          </div>
          {/* <div className="second groups">
            <button className="addAction" onClick={addContainer}>
              Добавить
            </button>
          </div> */}
        </div>
      </Modals>

      {/*/////////______//////______////// удалить контейнер с группы через запрос  */}
      <Modals
        openModal={!!openModaDelGroup}
        setOpenModal={() => dispatch(setOpenModaDelGroup())}
        title={"Вы уверены, что хотите удалить контейнер с группы?"}
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
                list={listFast}
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
        <AccessesUsers editAccesses={editAccesses} />
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
        title={"Вы уверены, что хотите удалить контейнер?"}
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

      {/*/////////______//////______////// удаление контейнера  */}
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
