//////// hooks
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

//////// fns
import { setListVolns } from "../../../store/reducers/requestSlice";

//////// components
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import EveryVolns from "../EveryVolns/EveryVolns";
import ModalsVolns from "../ActionsContainer/ModalsVolns/ModalsVolns";

const MyVolns = () => {
  const dispatch = useDispatch();
  const [selectedColumn, setSelectedColumn] = useState(null);

  const [actionType, setActionType] = useState({});

  const { listVolns } = useSelector((state) => state.requestSlice);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const updatedListVolns = {
      clear: [...listVolns.clear],
      active: [...listVolns.active],
      diactive: [...listVolns.diactive],
    };

    const [movedItem] = updatedListVolns[source.droppableId].splice(
      source.index,
      1
    );

    updatedListVolns[destination.droppableId]?.splice(
      destination.index,
      0,
      movedItem
    );

    dispatch(setListVolns(updatedListVolns));
  };

  const handleAddItem = (item, listKey) => {
    const newItem = { guid: `${listKey}-${Date.now()}`, vm_id: item };

    const updatedListVolns = {
      ...listVolns,
      [listKey]: [...listVolns?.[listKey], newItem],
    };

    dispatch(setListVolns(updatedListVolns));
  };

  const lists = [
    { key: "clear", title: "Очистить", guid: "asdasd123", num: 1 },
    { key: "active", title: "Активные", guid: "asdasd5345", num: 2 },
    { key: "diactive", title: "Не активные", guid: "asdasd745", num: 3 },
  ];

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="statusContainers">
          {lists?.map((list, index) => (
            <React.Fragment key={index}>
              {listVolns?.[list?.key] && (
                <Droppable key={list.key} droppableId={list.key}>
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
                        myKey={list?.key}
                        setActionType={setActionType}
                      />
                      {provided?.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
            </React.Fragment>
          ))}
        </div>
      </DragDropContext>
      <ModalsVolns setActionType={setActionType} actionType={actionType} />
    </>
  );
};
export default MyVolns;
