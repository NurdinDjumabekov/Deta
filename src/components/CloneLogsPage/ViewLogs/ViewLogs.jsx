//////// hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

///// style
import "./style.scss";

////// components
import MiniLoader from "../../../common/MiniLoader/MiniLoader";

////// fns
import { getLogBackUpReq } from "../../../store/reducers/actionsContaiersSlice";

////// helpers
import { textActionVM } from "../../../helpers/returnColorStatus";

const ViewLogs = () => {
  const dispatch = useDispatch();

  const { viewActiveStack } = useSelector((state) => state.logsVmSlice);
  const { logsActionsVM } = useSelector((state) => state.actionsContaiersSlice);

  const [listBtn, setListBtn] = useState([{ name: "Logs", id: 3, bool: true }]);

  const clickBtn = (item) => {
    const new_list = listBtn?.map((i) => {
      if (i.id == item.id) return { ...i, bool: true };
      else return { ...i, bool: false };
    });
    setListBtn(new_list);
  };

  useEffect(() => {
    if ([1, 2].includes(viewActiveStack?.action_status)) {
      const interval = setInterval(() => {
        const send = {
          guid: viewActiveStack?.guid_vm,
          upid: viewActiveStack?.action_upid,
          host: viewActiveStack?.host_guid,
        };
        dispatch(getLogBackUpReq(send));
      }, 1000 * 5);

      return () => {
        clearInterval(interval);
      };
    }
  }, [viewActiveStack?.action_status]);

  return (
    <div className="logsVms">
      <div className="types">
        {listBtn?.map((i, index) => (
          <button
            key={index}
            className={i.bool ? "activeBtn" : ""}
            onClick={() => clickBtn(i)}
          >
            {i?.name}
          </button>
        ))}
      </div>
      <div className="infoLog">
        {logsActionsVM?.map((item, index) => {
          return (
            <p
              key={index}
              style={{
                color: textActionVM(item?.t)?.color,
                fontWeight: textActionVM(item?.t)?.fontWeight,
                fontSize: textActionVM(item?.t)?.size,
              }}
            >
              {item?.t}
            </p>
          );
        })}
        {[1, 2].includes(viewActiveStack?.action_status) && <MiniLoader />}
      </div>
    </div>
  );
};

export default ViewLogs;
