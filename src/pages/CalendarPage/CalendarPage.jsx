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
import ViewEveryTasks from "../../components/CalendarPage/ViewEveryTasks/ViewEveryTasks";
import ModalTasks from "../../components/CalendarPage/ModalTasks/ModalTasks";

////// helpers
import { format } from "date-fns";
import { ru } from "date-fns/locale";

////// fns
import {
  activeDatesFN,
  activeTimeFN,
  getListAllComandsReq,
  getListTasksCalendareReq,
} from "../../store/reducers/todosSlice";

////// icons

/////// style
import "./style.scss";

const CalendarPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { activeDates } = useSelector((state) => state.todosSlice);
  const { activeTime } = useSelector((state) => state.todosSlice);
  const { listTasksCalendar } = useSelector((state) => state.todosSlice);

  const calendarRef = useRef(null);

  const addTasks = async (selectInfo) => {
    const res = await dispatch(getListAllComandsReq()).unwrap();
    if (res?.length > 0) {
      const t = selectInfo?.start;
      const time = format(t, "yyyy-MM-dd HH:mm", { locale: ru });
      dispatch(activeTimeFN({ time, action_type: 1 }));
    }
  };

  const handleEventDrop = (content) => {
    console.log(content, "content");
  };

  // для диапазон для месяца или недели
  const updateDateRange = () => {
    if (calendarRef?.current) {
      const cur = calendarRef?.current;

      const start = cur?.calendar?.currentData?.dateProfile?.renderRange?.start;
      const end = cur?.calendar?.currentData?.dateProfile?.renderRange?.end;

      const partStart = format(start, "yyyy-MM-dd HH:mm", {
        locale: ru,
      });
      const partEnd = format(end, "yyyy-MM-dd HH:mm", {
        locale: ru,
      });

      dispatch(activeDatesFN({ start: partStart, end: partEnd }));
    }
  };

  const getData = async (date) => dispatch(getListTasksCalendareReq(date));

  useEffect(() => {
    getData(activeDates);
    return () => dispatch(activeTimeFN({}));
  }, [activeDates?.start]);

  return (
    <>
      <div className="calendarPage">
        <div className="calendarPage__inner">
          <FullCalendar
            ref={calendarRef}
            height="100%"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={calT}
            initialView="timeGridWeek"
            editable={false} // Отключает возможность редактирования всех событий
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={addTasks}
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
            eventResizableFromStart={false} // Запрещает изменение размера с начала
            eventDurationEditable={false} // Запрещает изменение продолжительности
            eventStartEditable={false} // Запрещает перемещение событий
            droppable={false} // Запрещает перенос событий
          />
        </div>
      </div>
      <ModalTasks />
    </>
  );
};

export default CalendarPage;

const calT = {
  left: "timeGridWeek,prev,next today",
  center: "title",
  right: "",
};
