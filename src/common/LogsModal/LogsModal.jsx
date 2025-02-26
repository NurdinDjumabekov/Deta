import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client"; // Подключаем socket.io-client
import Modals from "../Modals/Modals";

//// styles
import "./style.scss";
import { getLogBackUp } from "../../store/reducers/actionsContaiersSlice";

const url_socket = "https://dd-api.ibm.kg";

const LogsModal = ({ guid, setViewLog, viewLog }) => {
  const dispatch = useDispatch();
  const [logs, setLogs] = useState([]); // Состояние для логов
  const [socket, setSocket] = useState(null); // Состояние для сокета

  useEffect(() => {
    if (!viewLog) return; // Если окно закрыто, не подключаем сокет

    // 1. Подключаемся к серверу
    const newSocket = io(url_socket);
    setSocket(newSocket);

    const room = `vm-${guid}-backup`; // Генерируем имя комнаты

    newSocket.emit("join_room", room); // Присоединяемся к комнате

    // 2. Слушаем события от сервера
    newSocket.on("backup_update", (data) => {
      console.log("🔄 Лог обновления:", data);
      setLogs((prevLogs) => [...prevLogs, data]); // Добавляем новые логи в массив
    });

    return () => {
      newSocket.emit("leave_room", room); // Отключаемся от комнаты
      newSocket.disconnect(); // Закрываем соединение
      setSocket(null);
    };
  }, [viewLog]); // Запускаем только когда окно открыто

  return (
    <div className="logsModal">
      <Modals
        openModal={viewLog}
        setOpenModal={() => setViewLog(false)}
        title="Лог бэкапов"
      >
        <div className="logsContainer">
          {logs.length > 0 ? (
            logs.map((log, index) => <p key={index}>{log.message}</p>)
          ) : (
            <p>Логи загружаются...</p>
          )}
        </div>
      </Modals>
    </div>
  );
};

export default LogsModal;
