import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import water from '../../../assets/icons/water.svg';
import './style.scss';
import { mylistVolns } from '../../../helpers/LocalData';
import { useDispatch, useSelector } from 'react-redux';
import { setListVolns } from '../../../store/reducers/requestSlice';

const Volns = () => {
  const dispatch = useDispatch();

  const { listVolns } = useSelector((state) => state.requestSlice);

  useEffect(() => {
    dispatch(setListVolns(mylistVolns));
  }, [dispatch]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Создаем копию текущего состояния
    const updatedListVolns = {
      clear: [...listVolns.clear],
      active: [...listVolns.active],
      diactive: [...listVolns.diactive],
    };

    // Удаляем элемент из исходного массива
    const [movedItem] = updatedListVolns[source.droppableId].splice(
      source.index,
      1
    );

    // Вставляем элемент в новый массив
    updatedListVolns[destination.droppableId].splice(
      destination.index,
      0,
      movedItem
    );

    // Обновляем состояние
    dispatch(setListVolns(updatedListVolns));
  };

  console.log(listVolns, 'listVolns');

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="statusContainers">
        <Droppable droppableId="clear">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="droppable"
            >
              <RenderVolds list={listVolns?.clear} title="Очистить" />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="active">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="droppable"
            >
              <RenderVolds list={listVolns?.active} title="Активные" />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="diactive">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="droppable"
            >
              <RenderVolds list={listVolns?.diactive} title="Не активные" />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Volns;

const RenderVolds = ({ list, title }) => {
  return (
    <div>
      <p>{title}</p>
      <div className="title">
        <img src={water} alt="..." />
        <span>{list?.length}</span>
      </div>
      <div className="list">
        {list?.map((item, index) => (
          <Draggable key={item.guid} draggableId={item.guid} index={index}>
            {(provided) => (
              <span
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                {item.vm_id}
              </span>
            )}
          </Draggable>
        ))}
      </div>
    </div>
  );
};
