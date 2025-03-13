import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

////// components
import { Tooltip } from "@mui/material";
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";

///// style
import "./style.scss";

///// icons
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SkipNextIcon from "@mui/icons-material/SkipNext";

////// fns
import { restartSkipStackReq } from "../../../store/reducers/actionsContaiersSlice";
import { getLogVmsReq } from "../../../store/reducers/logsVmSlice";

///// helpers
import { myAlert } from "../../../helpers/MyAlert";
import DeleteIcon from "../../../assets/MyIcons/DeleteIcon";

const CrudStack = ({ item }) => {
  const dispatch = useDispatch();

  const [obj, setObj] = useState({});

  const closeModal = () => {
    setObj({});
  };

  const actionVmStack = async () => {
    /// 1 - перезапустить
    /// 2 - пропустить
    /// 3 - Очистить
    const result = await dispatch(restartSkipStackReq(obj)).unwrap();
    if (result?.res == 1) {
      myAlert(`${obj?.vm_id} - ${obj?.vm_name} перезапущен`);
      setObj({});
      dispatch(getLogVmsReq());
    }
  };

  //   console.log(item, "item");

  return (
    <div className="crudStack">
      <Tooltip title={"Перезапустить процесс"} placement="top">
        <div onClick={() => setObj({ ...item, type: 1 })} className="action">
          <RestartAltIcon style={{ width: 25, height: 25 }} />
        </div>
      </Tooltip>
      {![3, "-2"]?.includes(item?.action_status) && (
        <Tooltip title={"Пропустить"} placement="top">
          <div onClick={() => setObj({ ...item, type: 2 })} className="action">
            <SkipNextIcon style={{ width: 25, height: 25 }} />
          </div>
        </Tooltip>
      )}

      <Tooltip title={"Очистить"} placement="top">
        <div onClick={() => setObj({ ...item, type: 3 })} className="action">
          <DeleteIcon width="22" height="22" />
        </div>
      </Tooltip>

      <ConfirmModal
        state={obj?.type == 1}
        title={"Перезапустить ?"}
        yes={actionVmStack}
        no={closeModal}
      />

      <ConfirmModal
        state={obj?.type == 2}
        title={"Пропустить ?"}
        yes={actionVmStack}
        no={closeModal}
      />

      <ConfirmModal
        state={obj?.type == 3}
        title={"Удалить ?"}
        yes={actionVmStack}
        no={closeModal}
      />
    </div>
  );
};

export default CrudStack;
