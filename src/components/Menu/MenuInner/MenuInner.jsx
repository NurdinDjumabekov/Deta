/////// hooks
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////// styles
import "./style.scss";

///////// fns
import {
  getContainersInMenu,
  setListVolns,
} from "../../../store/reducers/requestSlice";
import {
  crudUsersServiceReq,
  getUsersServiceReq,
} from "../../../store/reducers/usersSlice";

/////// imgs
import servers from "../../../assets/icons/menu/database.svg";
import users from "../../../assets/icons/menu/users.svg";
import EditIcon from "../../../assets/MyIcons/EditIcon";
import DeleteIcon from "../../../assets/MyIcons/DeleteIcon";

/////// components
import Search from "../../MainPage/Search/Search";
import ModalAddUser from "../../MainPage/ModalAddUser/ModalAddUser";
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";

/////// helpers
import { myAlert } from "../../../helpers/MyAlert";

const MenuInner = () => {
  const dispatch = useDispatch();

  const { listUserService } = useSelector((state) => state.usersSlice);
  const [addUsers, setAddUsers] = useState({});

  const getContainer = ({ guid, codeid }, { id }) => {
    dispatch(setListVolns({}));
    if (id == 2) {
      const send = { guid_host: "", guid_service: codeid };
      dispatch(getContainersInMenu(send));
    } else if (id == 3) {
      const send = { guid_host: "", guid_user: guid };
      dispatch(getContainersInMenu(send));
    }
  };

  const editFN = (item, type) => {
    setAddUsers({ actionType: 2, type, name: item?.name, guid: item?.guid });
  };

  const deleteFN = (item, type) => {
    setAddUsers({ actionType: 3, type, guid: item?.guid, name: item?.name });
  };

  const deleteUser = async () => {
    const res = await dispatch(crudUsersServiceReq(addUsers)).unwrap();
    if (res == 1) {
      myAlert("Успешно удалено");
      dispatch(getUsersServiceReq({}));
      setAddUsers({});
    } else if (res == 2) myAlert("Произошла ошибка", "error");
  };

  const imgList = [servers, users];

  const objType = { 2: "сервис", 3: "пользователя" };

  return (
    <>
      <div className="menuInner">
        <Search />

        <div className="menuInner__inner">
          {listUserService?.map((item, index) => (
            <Fragment key={index}>
              <div className="title">
                <div>
                  <img src={imgList?.[index]} alt="" />
                  <p>
                    {item?.name} [{item?.list?.length || 0}]{" "}
                  </p>
                </div>
                <button
                  className="addBtn"
                  onClick={() => setAddUsers({ actionType: 1, type: item?.id })}
                >
                  <p>+</p>
                </button>
              </div>
              <div className={`listCateg expanded miniScroll`}>
                {item?.list?.map((subItem, ind) => (
                  <div key={ind} className="every">
                    <div onClick={() => getContainer(subItem, item)}>
                      <p>
                        {subItem?.name} {<b>[{subItem?.vmCount}]</b>}
                      </p>
                      <span>{subItem?.desc}</span>
                    </div>

                    <button
                      className="actions"
                      onClick={() => editFN(subItem, item?.id)}
                    >
                      <EditIcon />
                    </button>

                    <button
                      className="actions"
                      onClick={() => deleteFN(subItem, item?.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                ))}
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      <ModalAddUser addUsers={addUsers} setAddUsers={setAddUsers} />

      <ConfirmModal
        state={addUsers?.actionType == 3}
        title={`Удалить ${objType?.[addUsers.type]} "${addUsers?.name}"`}
        yes={deleteUser}
        no={() => setAddUsers({})}
      />
    </>
  );
};

export default MenuInner;
