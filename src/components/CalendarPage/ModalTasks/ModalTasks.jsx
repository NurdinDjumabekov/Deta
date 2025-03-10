/////// hooks
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

////// components
import Modals from "../../../common/Modals/Modals";
import MySelects from "../../../common/MySelects/MySelects";
import MyTextArea from "../../../common/MyTextArea/MyTextArea";
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";

////// helpers
import { myAlert } from "../../../helpers/MyAlert";
import { listActionTime } from "../../../helpers/LocalData";

////// fns
import {
  activeTimeFN,
  crudComandsTimer,
  getListTasksCalendareReq,
} from "../../../store/reducers/todosSlice";

/////// style
import "./style.scss";

const ModalTasks = () => {
  const dispatch = useDispatch();

  const { activeTime } = useSelector((state) => state.todosSlice);
  const { lisAllComands } = useSelector((state) => state.todosSlice);
  const { activeDates } = useSelector((state) => state.todosSlice);

  const [del, setDel] = useState(false);

  const crudComands = async (e) => {
    e.preventDefault();
    if (!!!activeTime?.interval_type?.value) {
      return myAlert("Выберите период", "error");
    }
    if (!!!activeTime?.comand?.value) {
      return myAlert("Выберите команду", "error");
    }

    const send = {
      guid: !!activeTime?.guid ? activeTime?.guid : "",
      action_type: activeTime?.action_type,
      guid_task: activeTime?.comand?.value,
      interval_type: activeTime?.interval_type?.value,
      next_run: activeTime?.time,
      comment: activeTime?.comment,
    };

    const res = await dispatch(crudComandsTimer(send)).unwrap();
    if (res == 1) {
      myAlert("Данные успешно сохранены");
      dispatch(activeTimeFN({}));
      dispatch(getListTasksCalendareReq(activeDates));
    }
  };

  function onChangeSelect(item) {
    const { name, label, value } = item;
    dispatch(activeTimeFN({ ...activeTime, [name]: { label, value } }));
  }

  function onChange(e) {
    const { name, value } = e.target;
    dispatch(activeTimeFN({ ...activeTime, [name]: value }));
  }

  const delComands = async (e) => {
    e.preventDefault();

    const send = {
      guid: !!activeTime?.guid ? activeTime?.guid : "",
      action_type: 3,
      guid_task: activeTime?.comand?.value,
      interval_type: activeTime?.interval_type?.value,
      next_run: activeTime?.time,
      comment: activeTime?.comment,
    };

    const res = await dispatch(crudComandsTimer(send)).unwrap();
    if (res == 1) {
      myAlert("Данные успешно сохранены");
      dispatch(activeTimeFN({}));
      dispatch(getListTasksCalendareReq(activeDates));
      setDel(false);
    }
  };

  if (del) {
    return (
      <ConfirmModal
        state={true}
        title={"Удалить команды ?"}
        yes={delComands}
        no={() => setDel(false)}
      />
    );
  }

  if ([1, 2]?.includes(activeTime?.action_type)) {
    return (
      <div className="addTasks">
        <Modals
          openModal={true}
          setOpenModal={() => dispatch(activeTimeFN({}))}
          title="Задачи"
        >
          <div onSubmit={crudComands} className="addTasks__inner">
            <MySelects
              list={listActionTime}
              initText={"Выбрать"}
              onChange={onChangeSelect}
              nameKey={"interval_type"}
              value={activeTime?.interval_type}
              title={"Выберите период"}
            />
            <MySelects
              list={lisAllComands}
              initText={"Выбрать"}
              onChange={onChangeSelect}
              nameKey={"comand"}
              value={activeTime?.comand}
              title={"Выберите команду"}
            />
            <MyTextArea
              title={`Комментарий`}
              onChange={onChange}
              name={"comment"}
              value={activeTime?.comment}
              required={false}
            />

            <div className="action">
              {activeTime?.action_type == 2 ? (
                <button className="del btnAction" onClick={() => setDel(true)}>
                  Удалить
                </button>
              ) : (
                <div />
              )}
              <button className="btnAction" onClick={crudComands}>
                Сохранить
              </button>
            </div>
          </div>
        </Modals>
      </div>
    );
  }
};

export default ModalTasks;
