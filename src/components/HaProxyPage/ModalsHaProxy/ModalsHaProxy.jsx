/////// hooks
import { useDispatch, useSelector } from "react-redux";

/////// componets
import Modals from "../../../common/Modals/Modals";
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";
import EditAddHaProxy from "../EditAddHaProxy/EditAddHaProxy";
import RedirectProxy from "../RedirectProxy/RedirectProxy";

/////// helpers
import { myAlert } from "../../../helpers/MyAlert";
import { checkIP } from "../../../helpers/checkFNS";

/////// fns
import {
  clearModalActionsHaProxy,
  getHaProxyList,
} from "../../../store/reducers/haProxySlice";
import { crudHaProxyReq } from "../../../store/reducers/haProxySlice";

/////// style
import "./style.scss";

const ModalsHaProxy = () => {
  const dispatch = useDispatch();

  const { modalActionsHaProxy } = useSelector((state) => state.haProxySlice);

  const { guid, name, typeAction, ip_addres } = useSelector(
    (state) => state.haProxySlice?.modalActionsHaProxy
  );

  async function actionsCreateHaProxy() {
    /// для удаления,редактирования и добавления Haproxy через запрос
    if (name == "") return myAlert("Заполните наименование", "error");
    if (checkIP(ip_addres)) return myAlert("Заполните 'ip_addres'", "error");
    const send = {
      ...modalActionsHaProxy,
      type: modalActionsHaProxy?.type?.value,
    };
    const res = await dispatch(crudHaProxyReq(send)).unwrap();
    if (res == 1) {
      const obj = { 1: "Успешно добавлено", 2: "Отредактировано" };
      myAlert(obj?.[typeAction]);
      dispatch(getHaProxyList({})); /// get список HaProxy
    } else if (res == 2) {
      myAlert("Такой HaProxy уже существует");
    } else {
      myAlert("Упс, что-то пошло не так, попробуйте перезагрузить страницу!");
    }
  }

  async function redirectHaProxy() {
    /// для блокировки Haproxy через запрос
    if (name == "") return myAlert("Заполните наименование домена", "error");
    if (!!!modalActionsHaProxy?.dataCenter?.guid) {
      return myAlert("Выберите дата центр", "error");
    }
    const send = {
      ...modalActionsHaProxy,
      dataCenterRedirect: modalActionsHaProxy?.dataCenter?.guid,
    };
    console.log(send, "send");
    // const res = await dispatch(crudHaProxyReq(send)).unwrap();

    // if (res == 1) {
    //   myAlert("Домен перенаправлен");
    //   dispatch(getHaProxyList({})); /// get список HaProxy
    // } else {
    //   myAlert("Упс, что-то пошло не так, попробуйте перезагрузить страницу!");
    // }
  }

  async function delHaProxy() {
    const res = await dispatch(crudHaProxyReq(modalActionsHaProxy)).unwrap();
    if (res == 1) {
      const objText = { 3: "Успешно удалено", 5: "Успешно заблокировано" };
      myAlert(objText?.[modalActionsHaProxy?.typeAction]);
      dispatch(getHaProxyList({})); /// get список HaProxy
    } else {
      myAlert("Упс, что-то пошло не так, попробуйте перезагрузить страницу!");
    }
  }

  return (
    <div className="modalsProxy">
      {/* для добавления  */}
      <Modals
        openModal={!!guid && typeAction == 1}
        setOpenModal={() => dispatch(clearModalActionsHaProxy())}
        title={`Добавить`}
      >
        <EditAddHaProxy
          sendData={actionsCreateHaProxy}
          typeAction={typeAction}
        />
      </Modals>

      {/* для редактирования  */}
      <Modals
        openModal={!!guid && typeAction == 2}
        setOpenModal={() => dispatch(clearModalActionsHaProxy())}
        title={`Редактировать`}
      >
        <EditAddHaProxy
          sendData={actionsCreateHaProxy}
          typeAction={typeAction}
        />
      </Modals>

      {/* для удаления  */}
      <ConfirmModal
        state={!!guid && typeAction == 3}
        title={`Удалить ${modalActionsHaProxy?.name} ?`}
        yes={delHaProxy}
        no={() => dispatch(clearModalActionsHaProxy())}
      />

      {/* для перенаправление  */}
      <Modals
        openModal={!!guid && typeAction == 4}
        setOpenModal={() => dispatch(clearModalActionsHaProxy())}
        title={`Перенаправление домена`}
      >
        <RedirectProxy sendData={redirectHaProxy} />
      </Modals>

      {/* для блокирования  */}
      <ConfirmModal
        state={!!guid && typeAction == 5}
        title={`Заблокировать ${modalActionsHaProxy?.name} ?`}
        yes={delHaProxy}
        no={() => dispatch(clearModalActionsHaProxy())}
      />
    </div>
  );
};

export default ModalsHaProxy;
