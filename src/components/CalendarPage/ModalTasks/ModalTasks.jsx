/////// hooks
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

////// components
import Modals from "../../../common/Modals/Modals";
import MySelects from "../../../common/MySelects/MySelects";
import MyTextArea from "../../../common/MyTextArea/MyTextArea";

////// helpers
import { myAlert } from "../../../helpers/MyAlert";
import { listActionTime } from "../../../helpers/LocalData";

////// fns
import {
  activeTimeFN,
  crudComandsTimer,
  getListTasksCalendareReq,
} from "../../../store/reducers/todosSlice";

////// icons

/////// style
import "./style.scss";

const ModalTasks = () => {
  const dispatch = useDispatch();

  const { activeTime } = useSelector((state) => state.todosSlice);
  const { lisAllComands } = useSelector((state) => state.todosSlice);
  const { activeDates } = useSelector((state) => state.todosSlice);

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

    console.log(send, "send");

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

  if ([1, 2, 3]?.includes(activeTime?.action_type)) {
    return (
      <div className="addTasks">
        <Modals
          openModal={true}
          setOpenModal={() => dispatch(activeTimeFN({}))}
          title="Задачи"
        >
          <form onSubmit={crudComands} className="addTasks__inner">
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

            <div>
              <button type="submit" className="btnAction">
                Сохранить
              </button>
            </div>
          </form>
        </Modals>
      </div>
    );
  }
};

export default ModalTasks;
