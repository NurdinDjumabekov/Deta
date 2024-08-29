//////// hooks
import React, { useState } from "react";

//////// components
import { Draggable } from "react-beautiful-dnd";

/////// imgs
import water from "../../../assets/icons/water.svg";
import play from "../../../assets/icons/volns/play.svg";
import stop from "../../../assets/icons/volns/stop.svg";
import deleteIcon from "../../../assets/icons/delete.svg";

////// style
import "./style.scss";

/////// helpers
import { checkChangeTTL } from "../../../helpers/checkFNS";
import { myAlert } from "../../../helpers/MyAlert";
import { useSelector } from "react-redux";
import { setListVolns } from "../../../store/reducers/requestSlice";
import { useDispatch } from "react-redux";

const EveryVolns = ({ list, title, onAddItem, guid, num }) => {
  const dispatch = useDispatch();

  const { listVolns } = useSelector((state) => state.requestSlice);

  const [inputValue, setInputValue] = useState("");
  const [activeVolns, setActiveVolns] = useState("");

  const handleInputChange = (e) => {
    if (checkChangeTTL(e?.target?.value)) {
      setInputValue(e?.target?.value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue?.trim()) {
      onAddItem(inputValue?.trim());
      setInputValue("");
    }
  };

  const startVoln = (type) => {
    setActiveVolns(guid);
    myAlert(`Начался процесс 'Запуск' ВПС (Волна ${num})`);

    console.log(guid, type);
  };

  const stoptVoln = (type) => {
    setActiveVolns("");
    myAlert(`Начался процесс 'Стоп' ВПС (Волна ${num})`);
  };

  const deleteVolns = (type) => {
    dispatch(setListVolns({ ...listVolns, clear: [] }));
    myAlert(`Началось удаление ВПС (Волна ${num})`);
  };

  const check = activeVolns === guid;

  return (
    <div>
      <h6>{title}</h6>
      <div className="title">
        <img src={water} alt="..." />
        <span>{list?.length}</span>
      </div>
      <div className="list">
        {list?.map((item, index) => (
          <Draggable key={item?.guid} draggableId={item?.guid} index={index}>
            {(provided) => (
              <div className="everyInner">
                <span
                  ref={provided?.innerRef}
                  {...provided?.draggableProps}
                  {...provided?.dragHandleProps}
                >
                  {item?.vm_id}
                </span>
                <div className={check ? "load" : ""}></div>
              </div>
            )}
          </Draggable>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="actions">
        {num === 1 ? (
          <button onClick={() => deleteVolns(3)}>
            <img src={deleteIcon} alt="save" />
            <span className="moreInfoLeft">Очистить</span>
          </button>
        ) : (
          <>
            <button onClick={() => stoptVoln(2)}>
              <img src={stop} alt="stop" />
              <span className="moreInfoLeft">Остановить</span>
            </button>
            <button onClick={() => startVoln(1)}>
              <img src={play} alt="play" />
              <span className="moreInfoLeft">Запустить</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EveryVolns;
