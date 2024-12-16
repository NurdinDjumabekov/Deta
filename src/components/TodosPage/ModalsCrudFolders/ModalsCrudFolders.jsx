/////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// fns
import { crudFolderReq, getTodosReq } from "../../../store/reducers/todosSlice";

///////components
import Modals from "../../../common/Modals/Modals";
import MyTextArea from "../../../common/MyTextArea/MyTextArea";
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";

////// imgs

////// helpers

///////style
import "./style.scss";

const ModalsCrudFolders = (props) => {
  const { crudFolders, setCrudFolders } = props;

  const dispatch = useDispatch();

  const onChange = (e) => {
    const { name, value } = e.target;
    setCrudFolders({ ...crudFolders, [name]: value });
  };

  const onChangeCheck = (e) => {
    const { checked, name } = e.target;
    setCrudFolders({ ...crudFolders, [name]: checked });
  };

  const crudFoldersFN = async (e) => {
    e.preventDefault();

    const res = await dispatch(crudFolderReq(crudFolders)).unwrap();

    if (!!res?.success) {
      dispatch(getTodosReq());
      setCrudFolders({});
    }
  };

  if (crudFolders?.actionType == 1 || crudFolders?.actionType == 2) {
    return (
      <Modals
        openModal={true}
        setOpenModal={() => setCrudFolders({})}
        title={"Добавление папки"}
      >
        <form className="modalsCrudFolders" onSubmit={crudFoldersFN}>
          <MyTextArea
            title={"Наименование"}
            onChange={onChange}
            name={"name"}
            value={crudFolders?.name}
          />

          <div className="standartCheckbox">
            <input
              type="checkbox"
              id="check"
              onChange={onChangeCheck}
              name="position"
              checked={crudFolders?.position}
            />
            <label htmlFor="check">Добавить в начало списка</label>
          </div>

          <div className="saveStandart" type="submit">
            <button>Сохранить</button>
          </div>
        </form>
      </Modals>
    );
  }

  if (crudFolders?.actionType == 3) {
    return (
      <ConfirmModal
        state={true}
        title={"Удалить ?"}
        yes={crudFoldersFN}
        no={() => setCrudFolders({})}
      />
    );
  }
};

export default ModalsCrudFolders;
