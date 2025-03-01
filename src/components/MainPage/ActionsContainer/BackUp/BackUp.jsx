import React, { useState, useEffect, useRef, useCallback } from "react";
import Modals from "../../../../common/Modals/Modals";
import download from "../../../../assets/icons/download.svg";
import { useSelector, useDispatch } from "react-redux";
import { myAlert } from "../../../../helpers/MyAlert";
import { Tooltip } from "@mui/material";
import MySelects from "../../../../common/MySelects/MySelects";
import { listFast, listSnaps } from "../../../../helpers/LocalData";
import {
  backUpContainerFN,
  getDataForBackUp,
} from "../../../../store/reducers/actionsContaiersSlice";
import LogsModal from "../../../../common/LogsModal/LogsModal";

/////// style
import "./style.scss";

const BackUp = ({ guid, vm_id, vm_name }) => {
  const dispatch = useDispatch();
  const { dataForBackUp } = useSelector((state) => state.actionsContaiersSlice);
  const [dataBackUp, setDataBackUp] = useState({});

  const openModalBackUpFN = async () => {
    const res = await dispatch(getDataForBackUp({ guid_vm: guid })).unwrap();
    if (!!res?.[0]?.guid) {
      setDataBackUp({
        name: `${vm_id} - ${vm_name}`,
        type: { value: res?.[0]?.guid, label: res?.[0]?.storage_name },
        fasts: { value: "zstd", label: "ZSTD (fast and good)" },
        snaps: { value: "snapshot", label: "Snapshot" },
        guid,
      });
    }
  };

  const onChangeSelect = (item) => {
    setDataBackUp((prev) => ({ ...prev, [item.name]: item }));
  };

  const backUpContainer = async () => {
    if (!dataBackUp?.type?.value) return myAlert("Выберите хранилище", "error");
    const send = {
      guid_vm: dataBackUp.guid,
      storage: dataBackUp.type.value,
      compress: dataBackUp.fasts.value,
      mode: dataBackUp.snaps.value,
    };
    const res = await dispatch(backUpContainerFN(send)).unwrap();
    if (res === 1) {
    }
  };

  return (
    <>
      <div className="backUpActions">
        <Tooltip title="BackUp" placement="top">
          <button onClick={openModalBackUpFN}>
            <img src={download} alt="#" />
          </button>
        </Tooltip>
        <Modals
          openModal={!!dataBackUp.guid}
          setOpenModal={() => setDataBackUp({})}
          title={`Бэкап сервера ${dataBackUp.name}`}
        >
          <div className="backUpActions__inner">
            <div className="backUp__main">
              <MySelects
                list={listFast}
                initText="Выбрать"
                onChange={onChangeSelect}
                nameKey="fasts"
                value={dataBackUp.fasts}
                title="Выберите режим"
              />
              <MySelects
                list={dataForBackUp}
                initText="Выбрать"
                onChange={onChangeSelect}
                nameKey="type"
                value={dataBackUp.type}
                title="Выберите хранилище"
              />
              <MySelects
                list={listSnaps}
                initText="Выбрать"
                onChange={onChangeSelect}
                nameKey="snaps"
                value={dataBackUp.snaps}
                title="Выберите режим"
              />
            </div>
            <button className="btnAction btnAction2" onClick={backUpContainer}>
              Подтвердить
            </button>
          </div>
        </Modals>
      </div>

      {/* {viewLog && (
        <LogsModal
          open={viewLog}
          onClose={() => setViewLog(false)}
          logs={logs}
        />
      )} */}
    </>
  );
};

export default BackUp;
