import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./style.scss";

const Test = () => {
  const [list, setList] = useState([
    {
      id: "group-1",
      item: [
        { id: "1", nur: 1 },
        { id: "2", nur: 2 },
      ],
    },
    {
      id: "group-2",
      item: [
        { id: "3", nur: 3 },
        { id: "4", nur: 4 },
      ],
    },
    {
      id: "group-3",
      item: [
        { id: "5", nur: 5 },
        { id: "6", nur: 6 },
      ],
    },
  ]);

  const onDragEnd = (result) => {
    console.log(result, "result");
    const { source, destination } = result;

    // Если место назначения отсутствует (элемент сброшен за пределами)
    if (!destination) return;

    // Если перетаскивание произошло внутри одной группы, ничего не делать
    if (source.droppableId === destination.droppableId) return;

    // Если перетаскивание произошло между разными группами
    const sourceGroupIndex = list.findIndex((g) => g.id === source.droppableId);
    const destinationGroupIndex = list.findIndex(
      (g) => g.id === destination.droppableId
    );

    const sourceItems = Array.from(list[sourceGroupIndex].item);
    const destinationItems = Array.from(list[destinationGroupIndex].item);

    const [movedItem] = sourceItems.splice(source.index, 1);
    destinationItems.splice(destination.index, 0, movedItem);

    const updatedList = [...list];
    updatedList[sourceGroupIndex].item = sourceItems;
    updatedList[destinationGroupIndex].item = destinationItems;
    setList(updatedList);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="group">
        {list?.map((group) => (
          <Droppable key={group.id} droppableId={group.id}>
            {(provided) => (
              <div
                className="subgroup"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {group.item.map((block, index) => (
                  <Draggable
                    key={block.id}
                    draggableId={block.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="block"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {block.nur}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Test;
