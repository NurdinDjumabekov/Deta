//////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

//////// components
import MyInputs from "../../../common/MyInput/MyInputs";

/////// helpers

/////// fns
import { setTemporaryDNS } from "../../../store/reducers/stateSlice";
import { addDomens } from "../../../store/reducers/requestSlice";

/////// style
import "./style.scss";

const AddDns = () => {
  const dispatch = useDispatch();

  const { temporaryDNS } = useSelector((state) => state.stateSlice);

  const onChange = (e) => {
    const { name, value } = e.target;

    dispatch(setTemporaryDNS({ ...temporaryDNS, [name]: value }));
  };

  const addDomen = () => {
    if (temporaryDNS?.domen_name === "") {
      alert("Заполните 'Name domen'");
      return;
    }

    if (temporaryDNS?.comment === "") {
      alert("Заполните 'comment'");
      return;
    }

    dispatch(addDomens(temporaryDNS));
    ////// добалвяю dns через запрос
  };

  const editDns = () => {
    ///// редактирование dns через запрос
    //// на потом
  };

  return (
    <div className="addDns addDnsMain">
      <div className="second">
        <MyInputs
          title={"Name domen :"}
          onChange={onChange}
          name={"domen_name"}
          value={temporaryDNS?.domen_name}
        />
      </div>

      <div className="second">
        <MyInputs
          title={"Comments for domen :"}
          onChange={onChange}
          name={"comment"}
          value={temporaryDNS?.comment}
        />
      </div>

      <div className="second actions">
        <div className="bool">
          <input type="checkbox" id="check" />
          <label htmlFor="check">Update Reverse Zone</label>
        </div>
        <div>
          <button className="addAction" onClick={addDomen}>
            Добавить
          </button>
          {/* <button className="editAction" onClick={editDns}>
            Редактировать
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AddDns;
