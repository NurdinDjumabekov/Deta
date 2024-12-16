/////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// fns
import { crudFilesTodosReq } from "../../../store/reducers/todosSlice";

///////components
import Dropzone from "react-dropzone-uploader";

////// imgs
import krest from "../../../assets/icons/krest.svg";

////// helpers
import { myAlert } from "../../../helpers/MyAlert";

///////style
import "./styles.scss";

const ActionsFiles = (props) => {
  const { crudTodos, setCrudTodos, setSelectedFiles } = props;

  const dispatch = useDispatch();

  const delFilesFN = async (item) => {
    const send = { ...item, actionType: 3, file_guid: item?.guid };
    const result = await dispatch(crudFilesTodosReq(send)).unwrap();
    if (result?.res == 1) {
      setCrudTodos({ ...crudTodos, files: result?.listFiles });
    }
  };

  return (
    <div className="actionsFiles">
      <div className="listMyFiles">
        {crudTodos?.files?.map((item) => (
          <div>
            <p>{item?.file_name}</p>
            <button onClick={() => delFilesFN(item)}>
              <img src={krest} alt="x" />
            </button>
          </div>
        ))}
      </div>

      <div className="dropzone">
        <Dropzone
          onChangeStatus={(fileWithStatus, status) => {
            if (status === "done") {
              setSelectedFiles((prev) => [...prev, fileWithStatus?.file]);
            }
            if (status === "removed") {
              setSelectedFiles((prev) =>
                prev.filter((file) => file !== fileWithStatus?.file)
              );
            }
          }}
          accept="*"
          multiple={true} // Позволяет выбирать много файлов
          inputContent="Прикрепить файлы"
          inputWithFilesContent="Добавить ещё файлы"
          submitButtonContent=""
        />
      </div>
    </div>
  );
};

export default ActionsFiles;
