/////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// fns
import { getListUsersReq, getTodosReq } from "../../store/reducers/todosSlice";

///////components
import { Tooltip } from "@mui/material";
import ModalsCrudTodos from "../../components/TodosPage/ModalsCrudTodos/ModalsCrudTodos";
import ModalsCrudFolders from "../../components/TodosPage/ModalsCrudFolders/ModalsCrudFolders";
import ViewEveryTodos from "../../components/TodosPage/ViewEveryTodos/ViewEveryTodos";

////// imgs
import delIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import view from "../../assets/icons/eye.svg";
import krest from "../../assets/icons/krest.svg";

////// helpers

///////style
import "./style.scss";

const TodosPage = () => {
  const dispatch = useDispatch();

  const [crudFolders, setCrudFolders] = useState({});
  const [crudTodos, setCrudTodos] = useState({});
  const [viewTodos, setViewTodos] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);

  const { listTodos } = useSelector((state) => state.todosSlice);

  const getData = async () => {
    dispatch(getTodosReq());
    dispatch(getListUsersReq());
  };

  useEffect(() => {
    getData();
  }, []);

  const openModalFolder = (actionType, obj) => {
    if (actionType == 1) {
      setCrudFolders({ actionType });
    }
    if (actionType == 2) {
      setCrudFolders({ ...obj, actionType });
    }
    if (actionType == 3) {
      setCrudFolders({ ...obj, actionType });
    }
  };

  const openModalTodos = (actionType, obj) => {
    if (actionType == 1) {
      setCrudTodos({ folder_guid: obj?.guid, actionType });
    }
    if (actionType == 2) {
      setCrudTodos({ ...obj, actionType });
    }
    if (actionType == 3) {
      setCrudTodos({ guid: obj?.guid, actionType });
    }
  };

  return (
    <>
      <div className="todosPage">
        <div className="header">
          <div className="create" onClick={() => openModalFolder(1, {})}>
            <button>+ Создать</button>
          </div>
        </div>

        <div className="list">
          {listTodos?.map((item) => (
            <div className="every" key={item?.guid}>
              <div className="title">
                <h3>{item?.name}</h3>
                <div>
                  <Tooltip title="Добавить" placement="top">
                    <button onClick={() => openModalTodos(1, item)}>+</button>
                  </Tooltip>
                  <Tooltip title="Редактировать" placement="top">
                    <button onClick={() => openModalFolder(2, item)}>
                      <img src={editIcon} alt="" />
                    </button>
                  </Tooltip>
                  <Tooltip title="Удалить" placement="top">
                    <button onClick={() => openModalFolder(3, item)}>
                      <img src={delIcon} alt="" />
                    </button>
                  </Tooltip>
                </div>
              </div>
              <div className="body">
                {item?.tasks?.map((i) => (
                  <div className="every_task" key={i?.guid}>
                    <div className="titleInner">
                      <h5 onClick={() => setViewTodos(i)}>{i?.title}</h5>
                      <div className="actionsInner">
                        <Tooltip title="Посмотреть подробнее" placement="top">
                          <button onClick={() => setViewTodos(i)}>
                            <img src={view} alt="" />
                          </button>
                        </Tooltip>
                        <Tooltip title="Редактировать" placement="top">
                          <button onClick={() => openModalTodos(2, i)}>
                            <img src={editIcon} alt="" />
                          </button>
                        </Tooltip>
                        <Tooltip title="Удалить" placement="top">
                          <button onClick={() => openModalTodos(3, i)}>
                            <img src={delIcon} alt="" />
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                    <p className="decr" onClick={() => setViewTodos(i)}>
                      {i?.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalsCrudTodos
        setCrudTodos={setCrudTodos}
        crudTodos={crudTodos}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />

      <ModalsCrudFolders
        setCrudFolders={setCrudFolders}
        crudFolders={crudFolders}
      />

      <ViewEveryTodos setViewTodos={setViewTodos} viewTodos={viewTodos} />
    </>
  );
};

export default TodosPage;
