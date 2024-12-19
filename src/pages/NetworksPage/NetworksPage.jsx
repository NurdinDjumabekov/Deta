////// hooks
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

///// style
import "./style.scss";

//// fns
import { getNetworks, updatedNetwork } from "../../store/reducers/requestSlice";
import { addEditNetworkReq } from "../../store/reducers/networkSlice";

//// helpers
import { returnColorStatus } from "../../helpers/returnColorStatus";
import { myAlert } from "../../helpers/MyAlert";

////// components
import Modals from "../../common/Modals/Modals";
import MyInputs from "../../common/MyInput/MyInputs";
import ConfirmModal from "../../common/ConfirmModal/ConfirmModal";

////// icons
import editIcon from "../../assets/icons/editWhite.svg";

const NetworksPage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [networkObj, setNetworkObj] = useState({});

  const { listNetwork } = useSelector((state) => state.requestSlice);

  useEffect(() => {
    dispatch(getNetworks());
    const disconnectSocket = dispatch(updatedNetwork(listNetwork));

    return () => {
      disconnectSocket(); // Отключение сокета при размонтировании компонента
    };
  }, [dispatch, pathname]);

  const clickNetwork = ({ guid_network, guid }) => {
    console.log(guid_network, guid);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setNetworkObj({ ...networkObj, [name]: value });
  };

  const addEditNetworkFN = async (e) => {
    e.preventDefault();

    if (!validateIPAddress(networkObj?.ip_address)) {
      return myAlert("Некорректный IP адрес, ", "error");
    }

    const send = {
      ...networkObj,
      get_api: !!networkObj?.get_api ? 1 : 0,
    };

    const res = await dispatch(addEditNetworkReq(send)).unwrap();
    if (res == 1) {
      setNetworkObj({});
      dispatch(getNetworks());
    }
  };

  const delNetworkFN = async (e) => {
    e.preventDefault();

    const res = await dispatch(addEditNetworkReq(networkObj)).unwrap();
    if (res == 1) {
      setNetworkObj({});
      dispatch(getNetworks());
    }
  };

  const openModal = (actionType, obj) => {
    if (actionType == 1) {
      setNetworkObj({ actionType: 1 });
    } else if (actionType == 2) {
      const send = {
        ip_address: obj?.network_name,
        comment: obj?.network_comment,
        guid: obj?.guid,
        get_api: !!obj?.get_api ? 1 : 0,
      };
      setNetworkObj({ ...send, actionType: 2 });
    } else if (actionType == 3) {
      setNetworkObj({ guid: obj?.guid, actionType: 3 });
    }
  };

  return (
    <>
      <div className="networksPage">
        <button className="addBtn" onClick={() => openModal(1)}>
          +
        </button>
        <div className="listNetworks">
          {listNetwork?.map((item) => (
            <div className="every" key={item.guid}>
              <div className="comment">
                <p>{item?.network_comment || "..."}</p>
                <div></div>
              </div>

              <div className="title">
                <h6>{item?.network_name}</h6>
                <p onClick={() => openModal(3, item)}>x</p>
                <button onClick={() => openModal(2, item)} className="edit">
                  <img src={editIcon} alt="" />
                </button>
              </div>

              <div className="grid-container">
                {item?.ips?.map((i, index) => (
                  <div
                    key={index}
                    className={`grid-item ${returnColorStatus(i)}`}
                    onClick={() => clickNetwork(i)}
                  >
                    <p>{i?.ip_number}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modals
        openModal={networkObj?.actionType == 2 || networkObj?.actionType == 1}
        setOpenModal={() => setNetworkObj({})}
        title={"Добавление сетей"}
      >
        <form className="inputsNetworks" onSubmit={addEditNetworkFN}>
          <MyInputs
            title={"Ip адрес (14.15.0.*)"}
            onChange={onChange}
            name={"ip_address"}
            value={networkObj?.ip_address}
            placeholder={"14.15.0.*"}
          />

          <MyInputs
            title={"Комментарий"}
            onChange={onChange}
            name={"comment"}
            value={networkObj?.comment}
          />

          <div className="checkBoxDns">
            <input
              type="checkbox"
              id="check"
              onChange={(e) =>
                setNetworkObj({ ...networkObj, get_api: e.target?.checked })
              }
              name="useAll"
              checked={!!networkObj?.get_api}
            />
            <label htmlFor="check"> Выдавать IP</label>
          </div>

          <div className="actions">
            <button className="addAction" type="submit">
              Сохранить
            </button>
          </div>
        </form>
      </Modals>

      <ConfirmModal
        state={networkObj?.actionType == 3}
        title={"Удалить ?"}
        yes={delNetworkFN}
        no={() => setNetworkObj({})}
      />
    </>
  );
};

export default NetworksPage;

const validateIPAddress = (ip) => {
  // Регулярное выражение для базовой проверки формата
  const ipPattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.\*$/;

  const match = ip?.match(ipPattern);

  if (!match) {
    return false; // Если формат не совпадает, валидация не пройдена
  }

  // Проверяем, чтобы каждая часть была в диапазоне 0-255
  const [_, part1, part2, part3] = match;
  const isValidRange =
    Number(part1) <= 255 && Number(part2) <= 255 && Number(part3) <= 255;

  return isValidRange;
};
