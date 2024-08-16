import React from "react";
import Modals from "../../../common/Modals/Modals";
import { useDispatch, useSelector } from "react-redux";

/////// imgs
import delImg from "../../../assets/icons/delete.svg";
import diagram from "../../../assets/icons/diagram.svg";
import repeat from "../../../assets/icons/repeat.svg";
import editImg from "../../../assets/icons/edit.svg";

////// fns
import {
  clearTemporaryContainer,
  delVmbrContainer,
  setTemporaryContainer,
} from "../../../store/reducers/stateSlice";

import "./style.scss";

////// components
import MyInputs from "../../../common/MyInput/MyInputs";
import { editContainers } from "../../../store/reducers/requestSlice";

const ModalsForContainers = () => {
  const dispatch = useDispatch();

  const { temporaryContainer, activeHost } = useSelector(
    (state) => state.stateSlice
  );

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(setTemporaryContainer({ ...temporaryContainer, [name]: value }));
  };

  const editContainer = () => {
    const obj = { activeHost, data: temporaryContainer };
    dispatch(editContainers(obj));
  };
  ///// редактирую череез ззапрос контейнерм (инфу о контейнере)

  //   const delVmbr = (text) => dispatch(delVmbrContainer(text));

  return (
    <>
      {/* для редактирования  */}
      <Modals
        openModal={!!temporaryContainer?.guid}
        setOpenModal={() => dispatch(clearTemporaryContainer())}
        title={"Редактирование"}
      >
        <div className="addDns hostsEdit contEdit">
          <div className="second">
            <MyInputs
              title={"Информация"}
              onChange={onChange}
              name={"vm_comment"}
              value={temporaryContainer?.vm_comment}
            />
          </div>

          {/* <h6>vmbr</h6> */}
          {/* <div className="listHostsStorage">
            {temporaryContainer?.listVmbr?.map((item) => (
              <div className="every" key={item}>
                <p>{item}</p>
                <button className="del" onClick={() => dispatch(delVmbr(item))}>
                  <img src={delImg} alt="x" />
                </button>
              </div>
            ))}
          </div> */}

          <div className="second actions">
            <button className="addAction" onClick={editContainer}>
              Сохранить
            </button>
          </div>
        </div>
      </Modals>
      {/* для редактирования  */}
    </>
  );
};

export default ModalsForContainers;
