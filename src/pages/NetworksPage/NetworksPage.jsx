////// hooks
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

///// style
import "./style.scss";

//// fns
import { getNetworks, updatedNetwork } from "../../store/reducers/requestSlice";

//// helpers
import { returnColorStatus } from "../../helpers/returnColorStatus";

const NetworksPage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { listNetwork } = useSelector((state) => state.requestSlice);

  useEffect(() => {
    dispatch(getNetworks());
    const disconnectSocket = dispatch(updatedNetwork(listNetwork));

    return () => {
      disconnectSocket(); // Отключение сокета при размонтировании компонента
    };
  }, [dispatch, pathname]);

  return (
    <div className="networksPage">
      <button className="addBtn">+</button>
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
