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
import { setOpenAddProvider } from "../../store/reducers/stateSlice";

///////style
import "./style.scss";

const ViewProviders = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { listProviders } = useSelector((state) => state.requestSlice);

  useEffect(() => {
    dispatch(getProviders());
    // const disconnectProv = dispatch(updatedProvoders()); /// get провайдеров

    // return () => {
    //   disconnectProv();
    //   // Отключение сокетов при размонтировании компонента
    // };
  }, [pathname]);

  const addProvider = () => {
    dispatch(setOpenAddProvider({ actionType: 1 }));
  };
  const editProvider = (item) => {
    const past = {
      ...item,
      name: item?.provider_name,
      ip_address: item?.provider_gateway,
      actionType: 2,
    };
    dispatch(setOpenAddProvider(past));
  };

  return (
    <div className="viewProviders">
      {listProviders?.map((item, index) => (
        <div
          key={index}
          style={{ background: item?.color }}
          onClick={() => editProvider(item)}
        >
          <div className="title">{item?.provider_name}</div>
          <span style={{ color: pingtimeProviderFNText(item) }}>
            ({item?.provider_pingtime})
          </span>
          <div
            className="pingtime"
            style={{ background: pingtimeProviderFN(item) }}
          />
        </div>
      ))}

      <div>
        <button className="addBtn" onClick={addProvider}>
          +
        </button>
      </div>
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

const pingtimeProviderFNText = ({ provider_pingtime }) => {
  if (+provider_pingtime < 8 && +provider_pingtime > 0) {
    return "white";
  } else if (+provider_pingtime > 8 && +provider_pingtime < 20) {
    return "white";
  } else if (+provider_pingtime > 20 && +provider_pingtime < 60) {
    return "white";
  } else if (provider_pingtime == "" || provider_pingtime == 0) {
    return "red";
  } else {
    return "pink";
  }
};
