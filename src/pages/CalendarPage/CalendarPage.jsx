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

////// fns

////// icons

/////// style
import "./style.scss";

const CalendarPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const calendarRef = useRef(null);

  const addTodo = (selectInfo) => {};

  const handleEventDrop = (content) => {};

  // для диапазон для месяца или недели
  const updateDateRange = () => {
    if (calendarRef?.current) {
      const calendarApi = calendarRef.current?.getApi();
      const currentDate = calendarApi?.getDate(); // Получаем активную дату календаря
      const currentView = calendarApi?.view?.type; // Получаем текущее представление (день, неделя, месяц и т.д.)

      if (currentView === "dayGridMonth") {
        // Если текущее представление - это месяц
      } else {
        // Иначе - неделя
      }
    }
  };

  return (
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
          select={addTodo}
          dateClick={addTodo}
          weekends={true}
          initialEvents={[]}
          events={[]}
          eventContent={(e) => <></>}
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
          allDaySlot={true} /// отображать только у админа
          titleFormat={{ month: "long" }}
          eventResizableFromStart={false} // Отключаю возможность изменения размера с начала
          eventDurationEditable={false}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
