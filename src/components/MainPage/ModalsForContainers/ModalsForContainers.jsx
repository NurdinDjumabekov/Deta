import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone-uploader";

/////// imgs
import CpuIcon from "@mui/icons-material/Memory";
import MemoryIcon from "@mui/icons-material/Memory";
import StorageIcon from "@mui/icons-material/Storage";

////// fns
import {
  setOpenModalAddGroup,
  setOpenModaDelGroup,
  setOpenOSModal,
} from "../../../store/reducers/stateSlice";
import { setOpenAddFiles } from "../../../store/reducers/stateSlice";
import { clearAddTempCont } from "../../../store/reducers/stateSlice";
import { clearTemporaryContainer } from "../../../store/reducers/stateSlice";
import { setAddTempCont } from "../../../store/reducers/stateSlice";
import { setTemporaryContainer } from "../../../store/reducers/stateSlice";
import {
  addGroupContFN,
  editContainers,
  offContainerFN,
} from "../../../store/reducers/requestSlice";
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
import { listGr, listOS } from "../../../helpers/LocalData";

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

  //////////////////////////////////______////// выключения контейнера
  const { openModaDelGroup } = useSelector((state) => state.stateSlice);

  const offContainer = (guid) => dispatch(offContainerFN(guid));
  //////// выключения контейнера через запрос

  return (
    <>
      {/* редактирование  */}
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

      {/* добавления контенера  */}
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

      {/* выбор операционной системы*/}
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

      {/* добавление файлов в контейнера  */}
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

      {/* добавление контейнера в группу  */}
      <Modals
        openModal={!!openModalAddGroup}
        setOpenModal={() => dispatch(setOpenModalAddGroup())}
        title={"Выберите группу"}
      >
        <div className="addDns choiceGroup">
          <div className="choiceGroup__inner">
            {listGr?.map((item) => (
              <button onClick={() => addContInGroup(item?.guid)}>
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

      {/* выключения контейнера через запрос  */}
      <Modals
        openModal={!!openModaDelGroup}
        setOpenModal={() => dispatch(setOpenModaDelGroup())}
        title={"Вы уверены, что хотите удалить?"}
      >
        <div className="addDns offContainer">
          <button onClick={offContainer} className="yes">
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
      {/* выключения контейнера через запрос  */}
    </>
  );
};

export default ModalsForContainers;
