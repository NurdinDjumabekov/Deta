import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

///// style
import "./style.scss";

//// fns
import { getNetworks, updatedNetwork } from "../../store/reducers/requestSlice";

//// helpers
import { returnColorStatus } from "../../helpers/returnColorStatus";

const NetworksPage = () => {
  const dispatch = useDispatch();

  const { listNetwork } = useSelector((state) => state.requestSlice);

  useEffect(() => {
    dispatch(getNetworks());
    const disconnectSocket = dispatch(updatedNetwork(listNetwork));

    return () => {
      disconnectSocket(); // Отключение сокета при размонтировании компонента
    };
  }, [dispatch]);

  return (
    <div className="networksPage">
      <button className="addBtn">+</button>
      <div className="listNetworks">
        {listNetwork?.map((item) => (
          <div className="every" key={item.network_id}>
            <div className="title">
              <h6>{item?.network_name}</h6>
              <p>x</p>
            </div>
            <div className="grid-container">
              {item?.ips?.map((i) => (
                <div
                  key={i.ip_id}
                  className={`grid-item ${returnColorStatus(i)}`}
                >
                  <p>{i?.ip_number}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworksPage;
