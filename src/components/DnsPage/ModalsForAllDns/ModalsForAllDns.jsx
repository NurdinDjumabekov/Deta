import React from "react";
import { useDispatch, useSelector } from "react-redux";

////// componnets
import Modals from "../../../common/Modals/Modals";
import MyInputs from "../../../common/MyInput/MyInputs";

////// helpers
import { checkTTL } from "../../../helpers/checkFNS";
import { checkChangeRecordName } from "../../../helpers/checkFNS";
import { checkChangeTTL } from "../../../helpers/checkFNS";
import { myAlert } from "../../../helpers/MyAlert";
import { objTyperecordsKeys } from "../../../helpers/LocalData";

////// fns
import {
  editSubDomen,
  distributeIpAddresFN,
  deleteSubDomen,
} from "../../../store/reducers/dnsSlice";
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";
import { setDistributeIpModal } from "../../../store/reducers/stateSlice";

///////style
import "./style.scss";

const ModalsForAllDns = (props) => {
  const { guidDelete, setGuidDelete, objEdit, setObjedit } = props;
  const { guidEdit, setGuidEdit } = props;

  const dispatch = useDispatch();

  const { activeDns, distributeIpModal } = useSelector(
    (state) => state.stateSlice
  );

  console.log(activeDns, "activeDns");

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "ttl") {
      if (checkChangeTTL(value)) {
        setObjedit({ ...objEdit, [name]: value });
      }
    } else if (
      (name === "record_name" || name === "host_ip") &&
      objEdit?.recordType != "SPF"
    ) {
      if (checkChangeRecordName(value)) {
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
    //// редактирование
    const name = objEdit?.record_name?.replace(activeDns?.name, "");
    // if (checkSubDomainName(name, activeDns)) {
    //   return;
    // }
    if (!!!objEdit?.host_ip) {
      myAlert("Заполните правильно поле 'Host IP address: '", "error");
      return;
    }
    if (checkTTL(objEdit?.ttl)) {
      return;
    }
    // ///// редактирование суб домена через запрос
    dispatch(editSubDomen({ setGuidEdit, setObjedit, objEdit, activeDns }));
  };

  const distributeIpAddres = () => dispatch(distributeIpAddresFN(activeDns));

  const obj = {
    A: (
      <div className="addSubDnsModal">
        <MyInputs
          title={"Record name (host) :"}
          onChange={onChange}
          name={"record_name"}
          value={objEdit?.record_name}
        />
        <span>.{activeDns?.name}</span>
      </div>
    ),
    TXT: (
      <div className="addSubDnsModal">
        <MyInputs
          title={"Record name (host) :"}
          onChange={onChange}
          name={"record_name"}
          value={objEdit?.record_name}
        />
        <span>.{activeDns?.name}</span>
      </div>
    ),
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
            {obj?.[objEdit?.recordType] || (
              <div className="addSubDnsModal">
                <MyInputs
                  title={"Record name (host) :"}
                  onChange={onChange}
                  name={"record_name"}
                  value={activeDns?.name}
                />
              </div>
            )}
            <MyInputs
              title={`${objTyperecordsKeys?.[objEdit?.recordType]} :`}
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

      {/* для удаления  */}
      <ConfirmModal
        state={distributeIpModal}
        title={"Распределить нагрузку ?"}
        yes={distributeIpAddres}
        no={() => dispatch(setDistributeIpModal())}
      />
    </div>
  );
};

export default ModalsForAllDns;
