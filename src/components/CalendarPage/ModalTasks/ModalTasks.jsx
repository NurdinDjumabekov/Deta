/////// hooks
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

////// components

////// helpers
import { ru } from "date-fns/locale";

////// fns

////// icons

/////// style
import "./style.scss";
import Modals from "../../../common/Modals/Modals";
import {
  activeTimeFN,
  crudComandsTimer,
  getListTasksCalendareReq,
} from "../../../store/reducers/todosSlice";
import MySelects from "../../../common/MySelects/MySelects";
import MyTextArea from "../../../common/MyTextArea/MyTextArea";
import { myAlert } from "../../../helpers/MyAlert";

const ModalTasks = () => {
  const dispatch = useDispatch();

  const { activeTime } = useSelector((state) => state.todosSlice);
  const { lisAllComands } = useSelector((state) => state.todosSlice);
  const { activeDates } = useSelector((state) => state.todosSlice);

  //   console.log(lisAllComands, "lisAllComands");

  const listActionTime = [
    { label: "Каждый день", value: "day", type: 1 },
    { label: "Каждую неделю", value: "week", type: 1 },
    { label: "Каждые 15 дней", value: "15days", type: 1 },
    { label: "Каждый месяц", value: "month", type: 1 },
    { label: "Каждые 2 месяца", value: "2months", type: 1 },
  ];

  const crudComands = async (e) => {
    e.preventDefault();
    if (!!!activeTime?.interval_type?.value) {
      return myAlert("Выберите период", "error");
    }
    if (!!!activeTime?.comand?.value) {
      return myAlert("Выберите команду", "error");
    }

    const send = {
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

  if (activeTime?.action_type == 1) {
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
