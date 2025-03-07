/////// hooks
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

////// components
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ruLocale from "@fullcalendar/core/locales/ru";

////// helpers
import { ru } from "date-fns/locale";

////// fns

////// icons

/////// style
import "./style.scss";
import ViewEveryTasks from "../../components/CalendarPage/ViewEveryTasks/ViewEveryTasks";
import { format } from "date-fns";
import {
  activeTimeFN,
  getListAllComandsReq,
  getListTasksCalendareReq,
} from "../../store/reducers/todosSlice";
import ModalTasks from "../../components/CalendarPage/ModalTasks/ModalTasks";

const CalendarPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { activeDates } = useSelector((state) => state.todosSlice);
  const { listTasksCalendar } = useSelector((state) => state.todosSlice);

  // console.log(listTasksCalendar, "listTasksCalendar");

  const calendarRef = useRef(null);

  const addTasks = async (selectInfo) => {
    const res = await dispatch(getListAllComandsReq()).unwrap();
    if (res?.length > 0) {
      const time = format(selectInfo?.start, "yyyy-MM-dd HH:mm", {
        locale: ru,
      });
      console.log(time, "time");
      dispatch(activeTimeFN({ time, action_type: 1 }));
    }
  };

  const handleEventDrop = (content) => {};

  // для диапазон для месяца или недели
  const updateDateRange = () => {
    if (calendarRef?.current) {
      const calendarApi = calendarRef.current?.getApi();
      const currentDate = calendarApi?.getDate(); // Получаем активную дату календаря
      const currentView = calendarApi?.view?.type; // Получаем текущее представление (день, неделя, месяц и т.д.)

      // console.log(calendarApi, "calendarApi");
      // console.log(currentDate, "currentDate");
      // console.log(currentView, "currentView");
      if (currentView === "dayGridMonth") {
        // Если текущее представление - это месяц
      } else {
        // Иначе - неделя
      }
    }
  };

  useEffect(() => {
    dispatch(getListTasksCalendareReq(activeDates));
    return () => dispatch(activeTimeFN({}));
  }, []);

  return (
    <>
      <div className="calendarPage">
        <div className="calendarPage__inner">
          <FullCalendar
            ref={calendarRef}
            height="100%"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "dayGridMonth,timeGridWeek,prev,next today",
              center: "title",
              right: "",
            }}
            initialView="timeGridWeek"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={addTasks}
            // dateClick={addTasks}
            weekends={true}
            initialEvents={listTasksCalendar}
            events={listTasksCalendar}
            eventContent={(e) => (
              <ViewEveryTasks content={e?.event?._def?.extendedProps} />
            )}
            eventDrop={handleEventDrop}
            eventsSet={updateDateRange}
            slotMinTime="00:00:00"
            slotMaxTime="24:00:00"
            slotLabelInterval="01:00"
            slotDuration="01:00"
            slotLabelFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            locale={ruLocale}
            expandRows={true}
            allDaySlot={false}
            titleFormat={{ month: "long" }}
            eventResizableFromStart={false} // Отключаю возможность изменения размера с начала
            eventDurationEditable={false}
          />
        </div>
      </div>
      <ModalTasks />
    </>
  );
};

export default CalendarPage;
