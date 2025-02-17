//////// hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

////// style
import "./style.scss";

//////// fns
import { setListVolns } from "../../../store/reducers/requestSlice";
import EveryVolns from "../EveryVolns/EveryVolns";

const Volns = () => {
  const dispatch = useDispatch();
  const [selectedColumn, setSelectedColumn] = useState(null);

  const { listVolns } = useSelector((state) => state.requestSlice);

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

  // console.log(listVolns, "listVolns");

  return (
    <div className="volnsMain">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="statusContainers">
          {lists?.map((list) => (
            <Droppable key={list?.key} droppableId={list?.key} style={{}}>
              {(provided) => (
                <div
                  {...provided?.droppableProps}
                  ref={provided?.innerRef}
                  className={`droppable ${list?.key} hoverScroll`}
                  key={provided?.guid}
                  onClick={() => setSelectedColumn(list?.guid)}
                >
                  <EveryVolns
                    list={listVolns?.[list?.key]}
                    title={list?.title}
                    onAddItem={(item) => handleAddItem(item, list?.key)}
                    guid={list?.guid}
                    num={list?.num}
                    selectedColumn={selectedColumn}
                  />
                  {provided?.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
export default Volns;
