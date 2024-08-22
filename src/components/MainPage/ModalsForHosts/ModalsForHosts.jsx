/////// hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// componets
import Modals from "../../../common/Modals/Modals";
import MyInputs from "../../../common/MyInput/MyInputs";

/////// imgs
import delImg from "../../../assets/icons/delete.svg";

/////// fns
import { clearAddHost, setAddHost } from "../../../store/reducers/stateSlice";
import { setGuidHostEdit } from "../../../store/reducers/stateSlice";
import { addVmbr, delVmbr } from "../../../store/reducers/stateSlice";
import { setGuidHostDel } from "../../../store/reducers/stateSlice";
import {
  addHostFN,
  deleteHost,
  editHost,
} from "../../../store/reducers/requestSlice";
import { setTemporaryHosts } from "../../../store/reducers/stateSlice";

/////// style
import "./style.scss";

const ModalsForHosts = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const { temporaryHosts, guidHostDel, guidHostEdit, addTempHost } =
    useSelector((state) => state.stateSlice);

  const addHost = (e) => {
    e.preventDefault();
    dispatch(addHostFN(addTempHost));
  };

  const delHost = () => dispatch(deleteHost(guidHostDel));
  // удаление хоста через запрос

  const editHostFN = () => {
    // редактирование хоста через запрос
    const vmbr = temporaryHosts?.listVmbr?.join(",");
    dispatch(editHost({ ...temporaryHosts, vmbr }));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(setTemporaryHosts({ ...temporaryHosts, [name]: value }));
  };

  const onChangeAdd = (e) => {
    const { name, value } = e.target;

    if (name === "sort") {
      if (/^\d*$/.test(value)) {
        dispatch(setAddHost({ [name]: value }));
      }
    } else {
      dispatch(setAddHost({ [name]: value }));
    }
  };

  const addTextVkmr = () => {
    dispatch(addVmbr(input)); //// добавляю с список vmbr
    setInput(""); /// очищаю state
  };

  return (
    <>
      {/* для добавления  */}
      <Modals
        openModal={addTempHost?.bool}
        setOpenModal={() => dispatch(clearAddHost())}
        title={"Добавление хоста"}
      >
        <form className="addDns hostsEdit" onSubmit={addHost}>
          <MyInputs
            title={"Наименование хоста"}
            onChange={onChangeAdd}
            name={"host_name"}
            value={addTempHost?.host_name}
            required={true}
          />

          <MyInputs
            title={"IP Хоста"}
            onChange={onChangeAdd}
            name={"ip_address"}
            value={addTempHost?.ip_address}
            required={true}
          />

          <MyInputs
            title={"Логин (root@gmail.com)"}
            onChange={onChangeAdd}
            name={"login"}
            value={addTempHost?.login}
            type={"email"}
            required={true}
          />

          <MyInputs
            title={"Пароль"}
            onChange={onChangeAdd}
            name={"password"}
            value={addTempHost?.password}
            required={true}
          />

          <MyInputs
            title={"Сортировка"}
            onChange={onChangeAdd}
            name={"sort"}
            value={addTempHost?.sort}
            required={true}
          />

          <div className="second actions addHosts">
            <button className="addAction" type="submit">
              Сохранить
            </button>
          </div>
        </form>
      </Modals>

      {/* для удаления  */}
      <Modals
        openModal={guidHostDel}
        setOpenModal={() => dispatch(setGuidHostDel())}
        title={"Удалить данный хост ?"}
      >
        <div className="modalDel">
          <button className="yes" onClick={delHost}>
            Да
          </button>
          <button className="no" onClick={() => dispatch(setGuidHostDel(""))}>
            Нет
          </button>
        </div>
      </Modals>

      {/* для редактирования  */}
      <Modals
        openModal={guidHostEdit}
        setOpenModal={() => dispatch(setGuidHostEdit())}
        title={"Редактирование хоста"}
      >
        <div className="addDns hostsEdit moreEdit">
          <div className="second">
            <MyInputs
              title={"Информация :"}
              onChange={onChange}
              name={"host_name"}
              value={temporaryHosts?.host_name}
            />

            <MyInputs
              title={"Модель :"}
              onChange={onChange}
              name={"node_model"}
              value={temporaryHosts?.node_model}
            />
          </div>

          <div className="titleVmbr">
            <h6>vmbr</h6>
          </div>

          <div className="listHostsStorage">
            {temporaryHosts?.listVmbr?.map((item) => (
              <div className="every" key={item}>
                <p>{item}</p>
                <button className="del" onClick={() => dispatch(delVmbr(item))}>
                  <img src={delImg} alt="x" />
                </button>
              </div>
            ))}
          </div>

          <div className="second actions">
            <div className="addVmbr">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button onClick={addTextVkmr}>+</button>
            </div>
            <button className="addAction" onClick={editHostFN}>
              Сохранить
            </button>
          </div>
        </div>
      </Modals>
      {/* для редактирования  */}
    </>
  );
};

export default ModalsForHosts;
