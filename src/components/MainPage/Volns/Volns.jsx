//////// hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

/////// imgs
import water from "../../../assets/icons/water.svg";
import play from "../../../assets/icons/volns/play.svg";
import stop from "../../../assets/icons/volns/stop.svg";
import saveIcon from "../../../assets/icons/volns/save.svg";

////// style
import "./style.scss";

/////// helpers
import { mylistVolns } from "../../../helpers/LocalData";
import { checkChangeTTL } from "../../../helpers/checkFNS";
import { myAlert } from "../../../helpers/MyAlert";

//////// fns
import { setListVolns } from "../../../store/reducers/requestSlice";

const Volns = () => {
  const dispatch = useDispatch();

  const { listVolns } = useSelector((state) => state.requestSlice);

  useEffect(() => {
    dispatch(setListVolns(mylistVolns));
  }, [dispatch]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const updatedListVolns = {
      clear: [...listVolns.clear],
      active: [...listVolns.active],
      diactive: [...listVolns.diactive],
    };

    const [movedItem] = updatedListVolns[source.droppableId]?.splice(
      source?.index,
      1
    );

    updatedListVolns[destination.droppableId]?.splice(
      destination?.index,
      0,
      movedItem
    );

    dispatch(setListVolns(updatedListVolns));
  };

  const handleAddItem = (item, listKey) => {
    const newItem = { guid: `${listKey}-${Date.now()}`, vm_id: item };

    const updatedListVolns = {
      ...listVolns,
      [listKey]: [...listVolns[listKey], newItem],
    };

    dispatch(setListVolns(updatedListVolns));
  };

  const lists = [
    { key: "clear", title: "Очистить", guid: "asdasd123", num: 1 },
    { key: "active", title: "Активные", guid: "asdasd5345", num: 2 },
    { key: "diactive", title: "Не активные", guid: "asdasd745", num: 3 },
  ];

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="statusContainers">
        {lists?.map((list) => (
          <Droppable key={list?.key} droppableId={list?.key}>
            {(provided) => (
              <div
                {...provided?.droppableProps}
                ref={provided?.innerRef}
                className={`droppable ${list?.key}`}
                key={provided?.guid}
              >
                <RenderVolds
                  list={listVolns?.[list?.key]}
                  title={list?.title}
                  onAddItem={(item) => handleAddItem(item, list?.key)}
                  guid={list?.guid}
                  num={list?.num}
                />
                {provided?.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
export default Volns;

const RenderVolds = ({ list, title, onAddItem, guid, num }) => {
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

  const saveVoln = (type) => {
    setActiveVolns(guid);
    console.log(guid, type);
    myAlert(`Изменения внесены (Волна ${num})`);
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
        <button onClick={() => startVoln(1)}>
          <img src={play} alt="play" />
          <span className="moreInfoLeft">Запустить</span>
        </button>
        <button onClick={() => stoptVoln(2)}>
          <img src={stop} alt="stop" />
          <span className="moreInfoLeft">Остановить</span>
        </button>
        <button onClick={() => saveVoln(3)}>
          <img src={saveIcon} alt="save" />
          <span className="moreInfoLeft">Сохранить</span>
        </button>
      </div>
    </div>
  );
};
