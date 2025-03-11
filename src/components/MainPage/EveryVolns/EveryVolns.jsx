//////// hooks
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

//////// components
import { Draggable } from "react-beautiful-dnd";

/////// imgs
import water from "../../../assets/icons/water.svg";
import play from "../../../assets/icons/volns/play.svg";
import stop from "../../../assets/icons/volns/stop.svg";
import deleteIcon from "../../../assets/icons/delete.svg";
import migrateLogo from "../../../assets/icons/migrateLogo.png";

////// style
import "./style.scss";

////// fns
import { setListVolns } from "../../../store/reducers/requestSlice";

/////// helpers
import { myAlert } from "../../../helpers/MyAlert";
import { listTypeMigrations } from "../../../helpers/LocalData";

const EveryVolns = ({ list, title, onAddItem, num, myKey, setActionType }) => {
  const dispatch = useDispatch();

  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const { listVolns } = useSelector((state) => state.requestSlice);

  const onChangeAll = (e) => {
    const checkBox = e.target?.checked;
    setSelectAllChecked(checkBox);
    const new_list = list?.map((i) => ({ ...i, bool: checkBox ? 1 : 0 }));
    dispatch(setListVolns({ ...listVolns, [myKey]: new_list }));
  };

  const onChange = (item) => {
    const new_list = list?.map((i) => {
      if (item.guid == i?.guid) {
        return { ...i, bool: !!i?.bool ? 0 : 1 };
      } else return i;
    });
    dispatch(setListVolns({ ...listVolns, [myKey]: new_list }));
  };

  const actionVm = (type) => {
    const new_list = list?.filter((item) => !!item?.bool);
    const error = "Выделите галочками нужные контейнера";
    if (new_list?.length == 0) return myAlert(error, "error");
    const migration_type = listTypeMigrations?.[0];
    setActionType({ type, list: new_list, migration_type });
  };

  return (
    <div className="everyVolns">
      <div className="header">
        <h6>{title}</h6>
        <div className="title">
          <div>
            <span>{list?.length}</span>
            <img src={water} alt="..." />
          </div>
          <input
            type="checkbox"
            checked={selectAllChecked}
            onChange={onChangeAll}
            className="select-all-checkbox"
          />
        </div>
      </div>

      <div className="list hoverScroll">
        {list?.map((item, index) => (
          <Draggable key={item?.guid} draggableId={item?.guid} index={index}>
            {(provided) => (
              <div
                className="everyInner"
                ref={provided?.innerRef}
                {...provided?.draggableProps}
                {...provided?.dragHandleProps}
              >
                <span>{item?.vm_id}</span>

                <input
                  className="checkbox"
                  type="checkbox"
                  checked={!!item?.bool}
                  onChange={() => onChange(item)}
                />
              </div>
            )}
          </Draggable>
        ))}
      </div>

      <div className="actions">
        {num == 1 ? (
          <button onClick={() => actionVm(4)}>
            <img src={deleteIcon} alt="save" />
            <span className="moreInfoLeft">Удалить Vm</span>
          </button>
        ) : (
          <>
            <button onClick={() => actionVm(1)}>
              <img src={stop} alt="stop" />
              <span className="moreInfoLeft">Остановить</span>
            </button>

            <button onClick={() => actionVm(2)}>
              <img src={play} alt="play" />
              <span className="moreInfoLeft">Запустить</span>
            </button>

            <button onClick={() => actionVm(3)}>
              <img src={migrateLogo} alt="migrate" />
              <span className="moreInfoLeft">Мигрировать</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EveryVolns;
