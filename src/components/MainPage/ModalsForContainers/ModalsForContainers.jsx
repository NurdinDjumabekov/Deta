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
import { setOpenModalKeyCont } from "../../../store/reducers/stateSlice";
import { setOpenOSModal } from "../../../store/reducers/stateSlice";
import { clearAddTempCont } from "../../../store/reducers/stateSlice";
import { clearTemporaryContainer } from "../../../store/reducers/stateSlice";
import { setAddTempCont } from "../../../store/reducers/stateSlice";
import { setTemporaryContainer } from "../../../store/reducers/stateSlice";
import { editContainers } from "../../../store/reducers/requestSlice";
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
import Dropzone from "react-dropzone-uploader";
import AccessesUsers from "./AccessesUsers/AccessesUsers";
import ActionsVirtualMachine from "./ActionsVirtualMachine/ActionsVirtualMachine";
import debounce from "debounce";

////// helpers
import { myAlert } from "../../../helpers/MyAlert";

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

  const handleChangeStatus = debounce((filesList, status) => {
    if (status === "done" && openAddFiles?.guid) {
      const data = new FormData();
      data.append("files", filesList.file);
      data.append("guid_vm", openAddFiles.guid);
      data.append("status", 1); // 1 - добавление

      const send = { data, guid_container: openAddFiles.guid };
      dispatch(addDelFileInContainer(send));
    }
  }, 300);

  const delFilesInCont = (file_guid) => {
    const data = { status: 2, file_guid }; // 2 - добавление
    const guid_container = openAddFiles?.guid;
    // Отправка данных на сервер для удаления

    dispatch(addDelFileInContainer({ data, guid_container }));
    ///// удаление файлов с контейнера
  };

  //////////////////////////////////______////// для доступов отображения контейнеров клиентам
  const { openModalKeyCont } = useSelector((state) => state.stateSlice);
  //// остальные действия в компоненте

  //////////////////////////////////______////// запуск контейнера
  const { openModaStartCont } = useSelector((state) => state.stateSlice);

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
                <a href={i?.path} target="_blank">
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
