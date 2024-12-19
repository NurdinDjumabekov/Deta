/////// hooks
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

////// styles
import "./style.scss";

///////// fns
import { crudUsersServiceReq } from "../../../store/reducers/usersSlice";
import { getHosts } from "../../../store/reducers/requestSlice";

/////// components
import Modals from "../../../common/Modals/Modals";
import MyInputs from "../../../common/MyInput/MyInputs";

////// helpers
import { myAlert } from "../../../helpers/MyAlert";

const ModalAddUser = (props) => {
  const { addUsers, setAddUsers } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setAddUsers({ ...addUsers, [name]: value });
  };

  const objType = { 1: "Контейнеры", 2: "Сервисы", 3: "Пользователи" };
  const objTypeName = { 1: "Наименование", 2: "ФИО", 3: "Наименование" };

  const addUsersFN = async (e) => {
    e.preventDefault();
    const res = await dispatch(crudUsersServiceReq(addUsers)).unwrap();
    if (res == 1) {
      myAlert("Данные успешно сохранены");
      dispatch(getHosts());
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
