/////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// fns
import { crudCommentTodosReq } from "../../../store/reducers/todosSlice";

///////components
import Modals from "../../../common/Modals/Modals";
import MyTextArea from "../../../common/MyTextArea/MyTextArea";
import ActionsFiles from "../ActionsFiles/ActionsFiles";

////// imgs
import krest from "../../../assets/icons/krest.svg";
import delIcon from "../../../assets/icons/delete.svg";

////// helpers
import { myAlert } from "../../../helpers/MyAlert";

///////style
import "./style.scss";

const ViewEveryTodos = (props) => {
  const { setViewTodos, viewTodos } = props;

  const dispatch = useDispatch();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [comment, setComment] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setViewTodos({ ...viewTodos, [name]: value });
  };

  const addComment = async () => {
    if (!!!comment) {
      return myAlert("Заполните текст", "error");
    }
    const send = { text: comment, actionType: 1, task_guid: viewTodos?.guid };
    const res = await dispatch(crudCommentTodosReq(send)).unwrap();

    if (!!res?.success) {
      setViewTodos({
        ...viewTodos,
        comments: [...viewTodos?.comments, res?.obj],
      });
      setComment("");
    }
  };

  const delComment = async (obj) => {
    const send = { ...obj, actionType: 3 };
    const res = await dispatch(crudCommentTodosReq(send)).unwrap();

    if (!!res?.success) {
      const comments = viewTodos?.comments.filter((i) => i?.guid != obj?.guid);
      setViewTodos({ ...viewTodos, comments });
    }
  };

  const objStatus = {
    1: { color: "rgb(24, 135, 204)" },
    2: { color: "orange" },
    3: { color: "green" },
  };

  if (!!viewTodos?.guid) {
    return (
      <Modals
        openModal={true}
        setOpenModal={() => setViewTodos({})}
        title={viewTodos?.title}
      >
        <div className="viewTodos">
          <div className="header">
            {!!viewTodos?.fio && (
              <h5 className="">Задача назначена: "{viewTodos?.fio}"</h5>
            )}
            {!!viewTodos?.fio && (
              <h5 className="">Задачу создал: "{viewTodos?.fio}"</h5>
            )}
            {!!viewTodos?.task_status && (
              <h5 style={{ color: objStatus?.[viewTodos?.task_status_type] }}>
                Статус: {viewTodos?.task_status}
              </h5>
            )}
          </div>
          <div className="header">
            <MyTextArea
              title={"Описание"}
              onChange={onChange}
              name={"description"}
              value={viewTodos?.description}
            />
          </div>

          <div className="viewCommentsFiles">
            <div className="listComments">
              <div className="hoverScroll">
                {viewTodos?.comments?.map((i, index) => (
                  <div>
                    <p>
                      {index + 1}. {i?.text}
                    </p>
                    <button onClick={() => delComment(i)}>
                      <img src={delIcon} alt="" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="save">
                <MyTextArea
                  title={""}
                  onChange={(e) => setComment(e.target.value)}
                  name={"comment"}
                  value={comment}
                />

                <div className="saveStandart" onClick={addComment}>
                  <button>Добавить</button>
                </div>
              </div>
            </div>
            <ActionsFiles
              setCrudTodos={setViewTodos}
              crudTodos={viewTodos}
              setSelectedFiles={setSelectedFiles}
            />
          </div>
        </div>
      </Modals>
    );
  }
};

export default ViewEveryTodos;
