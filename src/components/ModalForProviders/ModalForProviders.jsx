import { useDispatch } from "react-redux";
import { setOpenAddProvider } from "../../store/reducers/stateSlice";
import MyInputs from "../../common/MyInput/MyInputs";
import MyIPInput from "../../common/MyIPInput/MyIPInput";
import Modals from "../../common/Modals/Modals";
import { useSelector } from "react-redux";
import "./style.scss";
import { colorsList } from "../../helpers/LocalData";
import { addProvider, crudProvider } from "../../store/reducers/requestSlice";
import { useState } from "react";
import ConfirmModal from "../../common/ConfirmModal/ConfirmModal";
import { checkIP } from "../../helpers/checkFNS";
import { myAlert } from "../../helpers/MyAlert";

const ModalForProviders = () => {
  const dispatch = useDispatch();

  const { openModalAddProvider } = useSelector((state) => state.stateSlice);

  const [del, setDel] = useState(false);

  const closeModal = () => dispatch(setOpenAddProvider({}));

  const saveOnSubmit = (e) => {
    e.preventDefault();

    if (checkIP(openModalAddProvider?.ip_address)) {
      return myAlert("Заполните правильно 'IP'", "error");
    }
    if (openModalAddProvider?.actionType == 1) {
      dispatch(addProvider(openModalAddProvider));
    } else if (openModalAddProvider?.actionType == 2) {
      dispatch(crudProvider(openModalAddProvider));
    }
  };

  const delPrividers = () => {
    const send = {
      ...openModalAddProvider,
      actionType: 3,
      provider_status: -1,
    };
    dispatch(crudProvider(send));
    setDel(false);
  };

  const onChangeAdd = (e) => {
    const { name, value } = e.target;
    dispatch(setOpenAddProvider({ ...openModalAddProvider, [name]: value }));
  };

  return (
    <>
      <Modals
        openModal={[1, 2].includes(openModalAddProvider?.actionType)}
        setOpenModal={closeModal}
        title={"Добавление провайдера"}
      >
        <form action="addProvider editProvider" onSubmit={saveOnSubmit}>
          <MyInputs
            title={"Наименование провайдера"}
            onChange={onChangeAdd}
            name={"name"}
            value={openModalAddProvider?.name}
            required={true}
          />

          <MyIPInput
            title={"IP провайдера"}
            onChange={onChangeAdd}
            name={"ip_address"}
            value={openModalAddProvider?.ip_address}
            required={true}
          />

          <ul className="listColors">
            {colorsList?.map((item, index) => (
              <li
                key={index}
                style={{ background: item }}
                className={openModalAddProvider?.color == item ? "active" : ""}
                onClick={() =>
                  dispatch(
                    setOpenAddProvider({ ...openModalAddProvider, color: item })
                  )
                }
              ></li>
            ))}
          </ul>

          <MyInputs
            type={"number"}
            title={"Расположение"}
            onChange={onChangeAdd}
            name={"sort"}
            value={openModalAddProvider?.sort}
            required={true}
          />

          <div className="actionsSave">
            {openModalAddProvider?.actionType == 2 && (
              <div className="delete" onClick={() => setDel(true)}>
                <p>Удалить</p>
              </div>
            )}
            <button type="submit">Сохранить</button>
          </div>
        </form>
      </Modals>
      <ConfirmModal
        state={del}
        title={"Удалить ?"}
        yes={delPrividers}
        no={() => setDel(false)}
      />
    </>
  );
};

export default ModalForProviders;
