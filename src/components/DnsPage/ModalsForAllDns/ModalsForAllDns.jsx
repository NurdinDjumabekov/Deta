import React from "react";
import { useDispatch, useSelector } from "react-redux";

////// componnets
import Modals from "../../../common/Modals/Modals";
import MyInputs from "../../../common/MyInput/MyInputs";
import MyIPInput from "../../../common/MyIPInput/MyIPInput";

////// helpers
import { checkSubDomainName, checkTTL } from "../../../helpers/checkFNS";
import { checkChangeRecordName, checkIP } from "../../../helpers/checkFNS";
import { checkChangeIP, checkChangeTTL } from "../../../helpers/checkFNS";
import { myAlert } from "../../../helpers/MyAlert";

////// fns
import { deleteSubDomen } from "../../../store/reducers/requestSlice";
import { editSubDomen } from "../../../store/reducers/requestSlice";
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";

const ModalsForAllDns = (props) => {
  const { guidDelete, setGuidDelete, objEdit, setObjedit } = props;
  const { guidEdit, setGuidEdit } = props;

  const dispatch = useDispatch();

  const { activeDns } = useSelector((state) => state.stateSlice);

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "ttl") {
      if (checkChangeTTL(value)) {
        setObjedit({ ...objEdit, [name]: value });
      }
    } else if (name === "record_name") {
      if (checkChangeRecordName(value)) {
        setObjedit({ ...objEdit, [name]: value });
      }
    } else if (name === "host_ip") {
      if (checkChangeIP(value)) {
        setObjedit({ ...objEdit, [name]: value });
      }
    } else {
      setObjedit({ ...objEdit, [name]: value });
    }
  };

  const delDns = () => {
    ///// удаления суб домена через запрос
    dispatch(deleteSubDomen({ guidDelete, setGuidDelete, activeDns }));
  };

  const editDns = () => {
    ////// редактирование
    if (checkSubDomainName(objEdit?.record_name, activeDns)) {
      return;
    }

    if (checkIP(objEdit?.host_ip)) {
      myAlert("Заполните правильно поле 'Host IP address: '");
      return;
    }

    if (checkTTL(objEdit?.ttl)) {
      return;
    }

    ///// редактирование суб домена через запрос
    dispatch(editSubDomen({ setGuidEdit, setObjedit, objEdit, activeDns }));
  };

  return (
    <div>
      {/* для удаления  */}
      <ConfirmModal
        state={!!guidDelete}
        title={"Удалить данный элемент ?"}
        yes={delDns}
        no={() => setGuidDelete()}
      />

      {/* ///// для редактирования */}
      <Modals
        openModal={!!guidEdit}
        setOpenModal={() => setGuidEdit()}
        title={"Редактировать ?"}
      >
        <div className="addDns modalEdit">
          <div className="second modalEdit__inner">
            <MyInputs
              title={"Record name (host) :"}
              onChange={onChange}
              name={"record_name"}
              value={objEdit?.record_name}
            />

            <MyIPInput
              title={"Host IP address :"}
              onChange={onChange}
              name={"host_ip"}
              value={objEdit?.host_ip}
            />
          </div>

          <div className="time">
            <MyInputs
              title={"Record TTL :"}
              onChange={onChange}
              name={"ttl"}
              value={objEdit?.ttl}
            />

            <div className="comments">
              <MyInputs
                title={"Record comments :"}
                onChange={onChange}
                name={"comment"}
                value={objEdit?.comment}
              />
            </div>
          </div>

          <div className="second actions">
            <button className="addAction" onClick={editDns}>
              Редактировать
            </button>
          </div>
        </div>
      </Modals>
    </div>
  );
};

export default ModalsForAllDns;
