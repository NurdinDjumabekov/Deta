////// hooks
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

/////// components
import Modals from "../../../../common/Modals/Modals";

///// fns
import { editVmReq } from "../../../../store/reducers/actionsContaiersSlice";

//// icons
import EditIcon from "../../../../assets/MyIcons/EditIcon";
// import editIcon from "../../../../assets/icons/edit.svg";

////// styles
import "./style.scss";

////// helpers
import { getDataVM } from "../../../../helpers/getDataVM";

const EditVM = ({ item }) => {
  const dispatch = useDispatch();

  const { activeHost } = useSelector((state) => state.stateSlice);
  const { activeUserService } = useSelector(
    (state) => state.actionsContaiersSlice
  );

  const [edit, setEdit] = useState({});

  const onChange = (e) => {
    setEdit({ ...edit, [e?.target?.name]: e?.target?.value });
  };

  const editFN = async () => {
    const send = { vm_comment: edit?.vm_comment, guid: edit?.guid };
    const res = await dispatch(editVmReq(send)).unwrap();
    if (res == 1) {
      getDataVM({ dispatch, activeHost, activeUserService });
      setEdit({});
    }
  };

  return (
    <div className="editVM">
      <button className="edit" onClick={() => setEdit(item)}>
        {/* <img src={editIcon} alt="edit" /> */}
        <EditIcon width="20" height="20" />
      </button>

      <Modals
        openModal={!!edit?.guid}
        setOpenModal={() => setEdit({})}
        title={"Редактирование"}
      >
        <div className="addDns hostsEdit contEdit">
          <div className="second">
            <div className="myInput">
              <h5>Информация</h5>
              <textarea
                name={"vm_comment"}
                onChange={onChange}
                value={edit?.vm_comment}
              />
            </div>
          </div>
          <button className="btnAction" onClick={editFN}>
            Сохранить
          </button>
        </div>
      </Modals>
    </div>
  );
};

export default EditVM;
