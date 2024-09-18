/////// hooks
import { useDispatch, useSelector } from "react-redux";

/////// componets
import Modals from "../../../common/Modals/Modals";
import MyInputs from "../../../common/MyInput/MyInputs";
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";
import EditAddHaProxy from "../EditAddHaProxy/EditAddHaProxy";

/////// helpers
import { checkIP } from "../../../helpers/checkFNS";
import { myAlert } from "../../../helpers/MyAlert";

/////// fns
import { clearModalActionsHaProxy } from "../../../store/reducers/requestHaProxySlice";
import { actionsCreateHaProxyFN } from "../../../store/reducers/requestHaProxySlice";

/////// style
import "./style.scss";

const ModalsHaProxy = () => {
  const dispatch = useDispatch();

  const { modalActionsHaProxy } = useSelector(
    (state) => state.requestHaProxySlice
  );

  const { guid, name, typeAction } = useSelector(
    (state) => state.requestHaProxySlice?.modalActionsHaProxy
  );

  const actionsCreateHaProxy = () => {
    /// для удаления,редактирования и добавления Haproxy через запрос

    if (name == "") {
      myAlert("Заполните наименование", "error");
      return;
    }

    if (typeAction == 1 || typeAction == 2) {
      if (checkIP(modalActionsHaProxy?.ip_addres)) {
        myAlert("Заполните правильно IP адрес", "error");
        return;
      }
    }

    dispatch(actionsCreateHaProxyFN(modalActionsHaProxy));
  };

  return (
    <div className="modalsProxy">
      {/* для добавления  */}
      <Modals
        openModal={!!guid && typeAction == 1}
        setOpenModal={() => dispatch(clearModalActionsHaProxy())}
        title={`Добавить`}
      >
        <EditAddHaProxy sendData={actionsCreateHaProxy} />
      </Modals>

      {/* для редактирования  */}
      <Modals
        openModal={!!guid && typeAction == 2}
        setOpenModal={() => dispatch(clearModalActionsHaProxy())}
        title={`Редактировать`}
      >
        <EditAddHaProxy sendData={actionsCreateHaProxy} />
      </Modals>

      {/* для удаления  */}
      <ConfirmModal
        state={!!guid && typeAction == 3}
        title={`Удалить ${name} ?`}
        yes={actionsCreateHaProxy}
        no={() => dispatch(clearModalActionsHaProxy())}
      />
    </div>
  );
};

export default ModalsHaProxy;
