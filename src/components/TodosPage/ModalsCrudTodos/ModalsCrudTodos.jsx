/////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// fns
import { crudTodosReq, getTodosReq } from "../../../store/reducers/todosSlice";

///////components
import Modals from "../../../common/Modals/Modals";
import MyTextArea from "../../../common/MyTextArea/MyTextArea";
import MyInputs from "../../../common/MyInput/MyInputs";
import MySelects from "../../../common/MySelects/MySelects";
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";
import Dropzone from "react-dropzone-uploader";

////// imgs
import krest from "../../../assets/icons/krest.svg";

////// helpers
import { myAlert } from "../../../helpers/MyAlert";

///////style
import "./style.scss";
import ActionsFiles from "../ActionsFiles/ActionsFiles";

const ModalsCrudTodos = (props) => {
  const { crudTodos, setCrudTodos } = props;
  const { selectedFiles, setSelectedFiles } = props;

  const dispatch = useDispatch();

  const { listUsers } = useSelector((state) => state.todosSlice);

  const onChange = (e) => {
    const { name, value } = e.target;
    setCrudTodos({ ...crudTodos, [name]: value });
  };

  const onChangeSelect = (item) => {
    const { name } = item;
    setCrudTodos({ ...crudTodos, [name]: item });
  };

  const addTodosFN = async (e) => {
    e.preventDefault();

    if (crudTodos?.actionType == 1 || crudTodos?.actionType == 2) {
      if (!!!crudTodos?.title) {
        return myAlert("Заполните наименование", "error");
      }
    }

    const formData = new FormData();

    selectedFiles?.forEach(async (file) => {
      formData.append(`files`, file);
    });

    formData.append(
      `responsive_user_guid`,
      crudTodos?.responsive_user_guid?.value || ""
    );
    formData.append(`status`, crudTodos?.status?.value || "");
    formData.append(`title`, crudTodos?.title);
    formData.append(`folder_guid`, crudTodos?.folder_guid);
    formData.append(`description`, crudTodos?.description);
    formData.append(`actionType`, crudTodos?.actionType);

    const res = await dispatch(crudTodosReq(formData)).unwrap();

    if (!!res?.success) {
      dispatch(getTodosReq());
      setCrudTodos({});
      setSelectedFiles([]);
    }
  };

  const delTodosFN = async (e) => {
    e.preventDefault();

    const res = await dispatch(crudTodosReq(crudTodos)).unwrap();

    if (!!res?.success) {
      dispatch(getTodosReq());
      setCrudTodos({});
    }
  };

  const listStatus = [
    { value: 1, label: "Ожидание" },
    { value: 2, label: "Выполнено" },
    { value: 3, label: "В процессе выполнения" },
  ];

  if (crudTodos?.actionType == 1 || crudTodos?.actionType == 2) {
    return (
      <Modals
        openModal={true}
        setOpenModal={() => setCrudTodos({})}
        title={"Добавление задачи"}
      >
        <div className="modalsCrudTodos">
          <MySelects
            list={listUsers}
            initText={"Выбрать"}
            onChange={onChangeSelect}
            nameKey={"responsive_user_guid"}
            value={crudTodos?.responsive_user_guid}
            title={"Выберите ответственное лицо"}
          />

          <MySelects
            list={listStatus}
            initText={"Выбрать"}
            onChange={onChangeSelect}
            nameKey={"status"}
            value={crudTodos?.status}
            title={"Выберите статус задачи"}
          />

          <MyInputs
            title={"Наименование"}
            onChange={onChange}
            name={"title"}
            value={crudTodos?.title}
          />

          <MyTextArea
            title={"Описание"}
            onChange={onChange}
            name={"description"}
            value={crudTodos?.description}
          />

          <ActionsFiles
            setCrudTodos={setCrudTodos}
            crudTodos={crudTodos}
            setSelectedFiles={setSelectedFiles}
          />

          <div className="saveStandart" onClick={addTodosFN}>
            <button>Сохранить</button>
          </div>
        </div>
      </Modals>
    );
  }

  if (crudTodos?.actionType == 3) {
    return (
      <ConfirmModal
        state={true}
        title={"Удалить ?"}
        yes={delTodosFN}
        no={() => setCrudTodos({})}
      />
    );
  }
};

export default ModalsCrudTodos;
