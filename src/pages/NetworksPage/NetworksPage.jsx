////// hooks
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

///// style
import "./style.scss";

//// fns
import { getNetworks, updatedNetwork } from "../../store/reducers/requestSlice";

//// helpers
import { returnColorStatus } from "../../helpers/returnColorStatus";
import Modals from "../../common/Modals/Modals";
import MyInputs from "../../common/MyInput/MyInputs";
import { myAlert } from "../../helpers/MyAlert";
import { addNetworkReq } from "../../store/reducers/networkSlice";

const NetworksPage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [modal, setModal] = useState(false);
  const [networkObj, setNetworkObj] = useState({});

  const { listNetwork } = useSelector((state) => state.requestSlice);

  useEffect(() => {
    dispatch(getNetworks());
    const disconnectSocket = dispatch(updatedNetwork(listNetwork));

    return () => {
      disconnectSocket(); // Отключение сокета при размонтировании компонента
    };
  }, [dispatch, pathname]);

  // console.log(listNetwork);

  const clickNetwork = ({ guid_network, guid }) => {
    console.log(guid_network, guid);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setNetworkObj({ ...networkObj, [name]: value });
  };

  const addNetworkFN = async (e) => {
    e.preventDefault();

    if (!validateIPAddress(networkObj?.ip_address)) {
      return myAlert("Некорректный IP адрес, ", "error");
    }

    if (!!!networkObj.comment) {
      return myAlert("Введите комментарий", "error");
    }

    const res = await dispatch(addNetworkReq(networkObj)).unwrap();
    if (res == 1) {
      setNetworkObj({});
      setModal(false);
      dispatch(getNetworks());
    }
  };

  return (
    <>
      <div className="networksPage">
        <button className="addBtn" onClick={() => setModal(true)}>
          +
        </button>
        <div className="listNetworks">
          {listNetwork?.map((item) => (
            <div className="every" key={item.guid}>
              <div className="title">
                <h6>{item?.network_name}</h6>
                <p>x</p>
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
        openModal={modal}
        setOpenModal={() => setModal(false)}
        title={"Добавление сетей"}
      >
        <form className="inputsNetworks" onSubmit={addNetworkFN}>
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

          <div className="actions">
            <button className="addAction" type="submit">
              Сохранить
            </button>
          </div>
        </form>
      </Modals>
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
