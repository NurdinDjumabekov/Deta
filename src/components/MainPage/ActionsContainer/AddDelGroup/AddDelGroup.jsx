import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";

//// imgs
import addGroupIcon from "../../../../assets/icons/folder-plus.svg";
import minus from "../../../../assets/icons/circle-minus.svg";

/////// styles
import "./style.scss";

////// components
import { Tooltip } from "@mui/material";
import Modals from "../../../../common/Modals/Modals";
import ConfirmModal from "../../../../common/ConfirmModal/ConfirmModal";

///// fns
import { setOpenModalAddGroup } from "../../../../store/reducers/stateSlice"; /// delete
import { getDataAcceptUsers } from "../../../../store/reducers/requestSlice"; /// delete
import { addGroupVmReq } from "../../../../store/reducers/actionsContaiersSlice";
import { delGroupContainerReq } from "../../../../store/reducers/actionsContaiersSlice";
import { getUsersServiceReq } from "../../../../store/reducers/usersSlice";

/////// helpers
import { getDataVM } from "../../../../helpers/getDataVM";
import { myAlert } from "../../../../helpers/MyAlert";

const AddDelGroup = ({ item }) => {
  const { guid } = item;

  const dispatch = useDispatch();

  const { listUserService } = useSelector((state) => state.usersSlice);
  const { activeHost } = useSelector((state) => state.stateSlice);
  const { activeUserService } = useSelector(
    (state) => state.actionsContaiersSlice
  );
  const [delGroup, setDelGroup] = useState({});
  const [addGroup, setAddGroup] = useState({});

  const delGroupFN = async () => {
    const send = { guid: delGroup?.guid, vm_name: delGroup?.vm_name };
    const res = await dispatch(delGroupContainerReq(send)).unwrap();
    if (res == 1) {
      myAlert("Успешно удалён с группы");
      getDataVM({ dispatch, activeHost, activeUserService });
      dispatch(getUsersServiceReq({}));
      setDelGroup({});
    }
  };

  const addGroupFN = async (codeid_group) => {
    const send = { codeid_group, guid_vm: guid };
    const res = await dispatch(addGroupVmReq(send)).unwrap();
    if (res == 1) {
      myAlert("Успешно добавлен");
      getDataVM({ dispatch, activeHost, activeUserService });
      dispatch(getUsersServiceReq({}));
      setAddGroup({});
    }
  };

  const listUs = [...listUserService?.[0]?.list];

  return (
    <div className="addDelGroup">
      <Tooltip title="Добавить в группу" placement="top">
        <button onClick={() => setAddGroup({ guid: item?.guid })}>
          <img src={addGroupIcon} alt="#" />
        </button>
      </Tooltip>

      <Tooltip title="Удалить из списка" placement="top">
        <button onClick={() => setDelGroup(item)}>
          <img src={minus} alt="#" />
        </button>
      </Tooltip>

      {/*// добавление контейнера в группу  */}
      <Modals
        openModal={!!addGroup.guid}
        setOpenModal={() => setAddGroup({})}
        title={"Выберите пользователей или сервисы"}
      >
        <div className="choiceGroup">
          <div className="choiceGroup__inner myScroll">
            {listUs?.map((item) => (
              <button key={item?.guid} onClick={() => addGroupFN(item?.codeid)}>
                {item?.name}
              </button>
            ))}
          </div>
        </div>
      </Modals>

      {/*/////////______//////______////// удалить контейнер с группы через запрос  */}

      <ConfirmModal
        state={delGroup?.guid}
        title={"Удалить с группы?"}
        yes={delGroupFN}
        no={() => setDelGroup({})}
      />
    </div>
  );
};

export default AddDelGroup;
