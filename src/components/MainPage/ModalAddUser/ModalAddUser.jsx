/////// hooks
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////// styles
import "./style.scss";

///////// fns
import {
  crudUsersServiceReq,
  getUsersServiceReq,
} from "../../../store/reducers/usersSlice";

/////// components
import Modals from "../../../common/Modals/Modals";
import MyInputs from "../../../common/MyInput/MyInputs";

////// helpers
import { myAlert } from "../../../helpers/MyAlert";

const ModalAddUser = (props) => {
  const { addUsers, setAddUsers } = props;

  const dispatch = useDispatch();

  const onChange = (e) => {
    const { name, value } = e.target;
    setAddUsers({ ...addUsers, [name]: value });
  };

  const objType = { 2: "Добавить сервис", 3: "Добавить пользователей" };
  const objTypeName = { 2: "Наименование", 3: "ФИО" };

  const addUsersFN = async (e) => {
    e.preventDefault();
    const res = await dispatch(crudUsersServiceReq(addUsers)).unwrap();
    if (res == 1) {
      myAlert("Данные успешно сохранены");
      dispatch(getUsersServiceReq({}));
      setAddUsers({});
    } else if (res == 2) {
      myAlert("Такие данные уже существуют", "error");
    }
  };

  if (addUsers?.actionType == 1 || addUsers?.actionType == 2) {
    return (
      <Modals
        openModal={true}
        setOpenModal={() => setAddUsers({})}
        title={objType?.[addUsers?.type]}
      >
        <form className="addUsers" onSubmit={addUsersFN}>
          <MyInputs
            title={objTypeName?.[addUsers?.type]}
            onChange={onChange}
            name={"name"}
            value={addUsers?.name}
            required={true}
          />
          <div className="saveStandart">
            <button type="submit">Сохранить</button>
          </div>
        </form>
      </Modals>
    );
  }
};

export default ModalAddUser;
