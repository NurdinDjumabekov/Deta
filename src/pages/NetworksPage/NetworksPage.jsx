import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

////style
import "./style.scss";

////helpers
import { ipBlocks } from "../../helpers/LocalData";

////fns
import { getNetworks, updatedNetwork } from "../../store/reducers/requestSlice";
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

  // console.log(listNetwork, "listNetwork");

  return (
    <div className="networksPage">
      <button className="addBtn">+</button>
      <div className="listNetworks">
        {listNetwork?.map((item, index) => (
          <div className="every" key={index}>
            <div className="title">
              <h6>{item?.network_name}</h6>
              <p>x</p>
            </div>
            <div className="grid-container">
              {item?.ips?.map((i, index) => (
                <div
                  key={index}
                  className={`grid-item ${returnColorStatus(i)}`}
                  // style={{ backgroundColor: objColor?.[i?.ip_status]?.color }}
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
