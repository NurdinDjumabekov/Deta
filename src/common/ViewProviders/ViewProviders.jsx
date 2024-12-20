/////// hooks
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

/////// fns
import {
  getProviders,
  updatedProvoders,
} from "../../store/reducers/requestSlice";

///////components

/////// imgs

////// helpers
import { pingtimeFN } from "../../helpers/LocalData";

///////style
import "./style.scss";

const ViewProviders = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { listProviders } = useSelector((state) => state.requestSlice);

  useEffect(() => {
    dispatch(getProviders());

    const disconnectProv = dispatch(updatedProvoders()); /// get провайдеров

    return () => {
      disconnectProv();
      // Отключение сокетов при размонтировании компонента
    };
  }, [pathname]);

  return (
    <div className="viewProviders">
      {listProviders?.map((item, index) => (
        <div key={index} style={{ background: item?.color }}>
          <div className="title">{item?.provider_name}</div>
          <span>({item?.provider_pingtime})</span>
          <div
            className="pingtime"
            style={{
              background: pingtimeFN(item),
              color: pingtimeProviderFN(item),
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ViewProviders;

const pingtimeProviderFN = ({ provider_pingtime }) => {
  if (+provider_pingtime < 8 && +provider_pingtime > 0) {
    return "green";
  } else if (+provider_pingtime > 8 && +provider_pingtime < 20) {
    return "yellow";
  } else if (+provider_pingtime > 20 && +provider_pingtime < 60) {
    return "orange";
  } else if (provider_pingtime == "" || provider_pingtime == 0) {
    return "#ff00008c";
  } else {
    return "pink";
  }
};
