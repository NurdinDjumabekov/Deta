/////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// fns
import {
  getSaveDataReq,
  updatedDataBasesSIO,
} from "../../store/reducers/bazaSaveSlice";

///////components
import ViewProviders from "../../common/ViewProviders/ViewProviders";
import MemoryComp from "../../components/MainPage/MemoryComp/MemoryComp";
import ModalsCrudDataBases from "../../components/ModalsCrudDataBases/ModalsCrudDataBases";

////// imgs
import delIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import vncImg from "../../assets/icons/tv.svg";
import krest from "../../assets/icons/krest.svg";
import bazaIcon from "../../assets/icons/menu/box.svg";
import hranilisheIcon from "../../assets/icons/menu/dns.svg";

////// helpers

///////style
import "./style.scss";
import { cutNums } from "../../helpers/cutNums";

const BazaPage = () => {
  const dispatch = useDispatch();

  const [activeDataBases, setActiveDataBases] = useState("");
  const [crudAction, setCrudAction] = useState({});

  const { listDataSaved } = useSelector((state) => state.bazaSaveSlice);

  const getData = async () => {
    const res = await dispatch(getSaveDataReq()).unwrap();
    setActiveDataBases(res?.[0]?.guid);
  };

  useEffect(() => {
    const disconnectProv = dispatch(updatedDataBasesSIO()); /// get провайдеров

    getData();

    return () => disconnectProv();
  }, []);

  const openModal = (actionType, obj) => {
    if (actionType == 1) {
      setCrudAction({ actionType });
    } else if (actionType == 2) {
      setCrudAction({
        ...obj,
        actionType,
        database_name: obj?.data_base_name,
        dataBases: { value: obj?.type },
        descr: obj?.descr,
      });
    } else if (actionType == 3) {
      setCrudAction({ guid: obj?.guid, actionType });
    } else if (actionType == 4) {
      setCrudAction({
        guid: obj?.data_base_guid,
        guidInner: obj?.guid,
        actionType,
      });
    } else if (actionType == 5) {
      setCrudAction({
        guid: obj?.guid,
        actionType,
        ipAddresses: obj?.ipAddresses,
      });
    }
  };

  console.log(listDataSaved, "listDataSaved");

  return (
    <>
      <div className="bazaPage">
        <div className="header">
          <button className="addBtn" onClick={() => openModal(1, {})}>
            +
          </button>
          <ViewProviders />

          <div className="hranilishBlock">
            <p>Базы - </p>
            <span></span>
          </div>

          <div className="hranilishBlock bazaBlock">
            <p>Хранилища - </p>
            <span></span>
          </div>
        </div>

        <div className="list hoverScroll">
          {listDataSaved?.map((item) => (
            <div
              className={`every ${item?.type == 1 ? "hranilish" : "baza"} ${
                activeDataBases == item?.guid ? "active" : ""
              } ${item?.check_status_ping == 1 ? "nonePing" : ""}`}
              key={item?.guid}
              onClick={() => setActiveDataBases(item?.guid)}
            >
              <div className="headerInner">
                <h5>{item?.data_base_name}</h5>
                <div className="actions">
                  <button onClick={() => openModal(2, item)}>
                    <img src={editIcon} alt="" />
                  </button>
                  <button onClick={() => openModal(3, item)}>
                    <img src={delIcon} alt="" />
                  </button>
                </div>
              </div>

              <div className="body">
                <div className="types">
                  <img
                    src={item?.type == 1 ? hranilisheIcon : bazaIcon}
                    alt=""
                  />
                  <p className={`types__text ${item?.type == 1 ? "" : "HR"}`}>
                    {item?.type == 1 ? "Хранилище" : "База"}
                  </p>
                </div>
                <p className="login">Логин: {item?.login}</p>
                <p className="password">Пароль: {item?.password}</p>
              </div>

              <div className="list_ip">
                {item?.ipAddresses?.length == 0 ? (
                  "..."
                ) : (
                  <>
                    {item?.ipAddresses?.map((i, index) => (
                      <div>
                        <div
                          className="btnBlink"
                          style={{ background: pingtimeFN(+i?.avg_ping) }}
                        ></div>
                        <p key={i?.guid}>{i?.ip_adres}</p>
                        <span
                          className="ping"
                          style={{ color: pingtimeFN(+i?.avg_ping) }}
                        >
                          {cutNums(+i?.avg_ping, 4)}
                        </span>
                        <button onClick={() => openModal(4, i)}>
                          <img src={krest} alt="" />
                        </button>
                      </div>
                    ))}
                  </>
                )}
                <button className="innerIP" onClick={() => openModal(5, item)}>
                  +
                </button>
              </div>

              <h6 className="main_ip">
                <img src={vncImg} alt="vnc" />
                <p> {item?.main_ip}</p>
              </h6>

              <MemoryComp
                node_cpu_usage={+item?.node_cpu_usage / 100}
                node_cpu={+item?.node_cpu / 1}
                node_ram_usage={+item?.node_ram_usage / 100}
                node_ram_mb={+item?.node_ram_mb}
                array_storages={[]}
              />

              <div className="comments">
                <p>{item?.descr || "..."}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalsCrudDataBases
        crudAction={crudAction}
        setCrudAction={setCrudAction}
        getData={getData}
        openModal={openModal}
      />
    </>
  );
};

export default BazaPage;

const pingtimeFN = (provider_pingtime) => {
  if (+provider_pingtime < 10 && +provider_pingtime > 0) {
    return "#008000";
  } else if (+provider_pingtime > 10 && +provider_pingtime < 200) {
    return "orange";
  } else if (provider_pingtime == "" || provider_pingtime == 0) {
    return "#ff00008c";
  } else {
    return "#ff00008c";
  }
};
