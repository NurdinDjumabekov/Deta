import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone-uploader";

/////// imgs
import CpuIcon from "@mui/icons-material/Memory";
import MemoryIcon from "@mui/icons-material/Memory";
import StorageIcon from "@mui/icons-material/Storage";

////// fns
import {
  setOpenModaDelCont,
  setOpenModalAddGroup,
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

////// helpers
import { listFast, listGr } from "../../../helpers/LocalData";
import { listOS, listSnaps } from "../../../helpers/LocalData";
import { listTypes } from "../../../helpers/LocalData";
import Selects from "../../../common/Selects/Selects";
import { myAlert } from "../../../helpers/MyAlert";

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
    const obj = { activeHost, data: temporaryContainer };
    dispatch(editContainers(obj));
  };
  ///// редактирую через ззапрос контейнерм (инфу о контейнере)

  //////////////////////////////////______////// добавление
  const { addTempCont } = useSelector((state) => state.stateSlice);
  const onChangeAdd = (e) => {
    const { name, value } = e.target;
    dispatch(setAddTempCont({ [name]: value }));
  };

  const onChangeSlider = (obj) => {
    dispatch(setAddTempCont(obj));
  };

  const addContainer = () => {
    dispatch(addContainersFN(addTempCont));
    ///// добавляю контейнер через запрос
  };

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
    ///// добавление контейнера в группу
    ///// guid - guid контейнера
    ///// guid_group - guid группы
    dispatch(addGroupContFN({ guid_group: guid, guid: openModalAddGroup }));
  };

  //////////////////////////////////______////// удаление контейнера c группы
  const { openModaDelGroup } = useSelector((state) => state.stateSlice);

  const delContInGroup = () => dispatch(delGroupContainerFN(openModaDelGroup));
  ///// удаление контейнера с группы через запрос

  //////////////////////////////////______////// выключения контейнера
  const { openModaStoppedCont } = useSelector((state) => state.stateSlice);

  const offContainer = () => dispatch(offContainerFN(openModaStoppedCont));
  //////// выключения контейнера через запрос

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

  //////////////////////////////////______////// удаление контейнера
  const { openModaDelCont } = useSelector((state) => state.stateSlice);

  const delContainer = () => dispatch(delContainerFN(openModaDelCont));
  //////// удаление контейнера через запрос

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
            <MyInputs
              title={"Информация"}
              onChange={onChange}
              name={"vm_comment"}
              value={temporaryContainer?.vm_comment}
            />
          </div>

          <div className="second actions">
            <button className="addAction" onClick={editContainer}>
              Сохранить
            </button>
          </div>
        </div>
      </Modals>
      {/* редактирование  */}

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
      {/*  добавления контенера  */}

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
      {/* выбор операционной системы*/}

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
      {/* добавление файлов в контейнера  */}

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
      {/* добавление контейнера в группу  */}

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
      {/* удалить контейнер с группы через запрос  */}

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
      {/*  backUp контейнера  */}

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
      {/* выключение контейнера    */}

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
      {/* удаление контейнера    */}
    </>
  );
};

export default ModalsForContainers;
