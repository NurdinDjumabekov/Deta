//////// hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

///// style
import "./style.scss";

////// components
import MiniLoader from "../../../common/MiniLoader/MiniLoader";
import { Tooltip } from "@mui/material";

////// fns
import {
  getLogBackUpReq,
  restartSkipStackReq,
} from "../../../store/reducers/actionsContaiersSlice";

////// helpers
import { textActionVM } from "../../../helpers/returnColorStatus";

////// icons
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";
import { getLogVmsReq } from "../../../store/reducers/logsVmSlice";

const ViewLogs = () => {
  const dispatch = useDispatch();

  const [obj, setObj] = useState({});

  const { viewActiveStack } = useSelector((state) => state.logsVmSlice);
  const { logsActionsVM } = useSelector((state) => state.actionsContaiersSlice);

  const clickBtn = (type) => {
    setObj({ type });
  };

  useEffect(() => {
    if ([1, 2].includes(viewActiveStack?.action_status)) {
      const interval = setInterval(() => {
        const send = {
          guid: viewActiveStack?.guid_vm,
          upid: viewActiveStack?.action_upid,
          host: viewActiveStack?.host_guid,
        };
        if (!!viewActiveStack?.action_upid) dispatch(getLogBackUpReq(send));
      }, 1000 * 5);

      return () => {
        clearInterval(interval);
      };
    }
  }, [viewActiveStack?.action_status]);

  const objText = { 4: "Очистить список", 5: "Отменить последние действия" };

  const actionVmStack = async () => {
    const result = await dispatch(restartSkipStackReq(obj)).unwrap();
    if (result?.res == 1) {
      setObj({});
      dispatch(getLogVmsReq());
    }
  };

  return (
    <div className="logsVms">
      <div className="types">
        <Tooltip title={objText?.[4]} placement="bottom">
          <button style={{ background: "#0078cf" }} onClick={() => clickBtn(4)}>
            <DeleteSweepIcon />
          </button>
        </Tooltip>
        <Tooltip title={objText?.[5]} placement="bottom">
          <button
            style={{ background: "rgba(255, 0, 0, 0.467)" }}
            onClick={() => clickBtn()}
          >
            <NotInterestedIcon />
          </button>
        </Tooltip>
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

      <ConfirmModal
        state={[4, 5].includes(obj?.type)}
        title={"Перезапустить ?"}
        yes={actionVmStack}
        no={() => setObj({})}
      />
    </div>
  );
};

export default ViewLogs;
