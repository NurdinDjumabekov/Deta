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
import proxyIcon from "../../assets/icons/menu/HaProxy.svg";
import WarningIcon from "@mui/icons-material/WarningRounded";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

////// helpers
import { cutNums } from "../../helpers/cutNums";

///////style
import "./style.scss";
import { listDataBases } from "../../helpers/LocalData";

const BazaPage = () => {
  const dispatch = useDispatch();

  const [activeDataBases, setActiveDataBases] = useState("");
  const [crudAction, setCrudAction] = useState({});

  const { listDataSaved } = useSelector((state) => state.bazaSaveSlice);

  async function getData() {
    const res = await dispatch(getSaveDataReq()).unwrap();
    setActiveDataBases(res?.[0]?.guid);
  }

  useEffect(() => {
    const disconnectProv = dispatch(updatedDataBasesSIO()); /// get провайдеров
    getData();
    return () => disconnectProv();
  }, []);

  function openModal(actionType, obj) {
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
  }

  const obkIcons = { 1: hranilisheIcon, 2: bazaIcon, 3: proxyIcon };

  const objtypeActive = { 1: "nonePing", 2: "noneOnePing", 3: "" };

  return (
    <>
      <div className="bazaPage">
        <div className="header">
          <button className="addBtn" onClick={() => openModal(1, {})}>
            +
          </button>
          <ViewProviders />

          {/* <div className="hranilishBlock">
            <span></span>
            <p> - Базы</p>
          </div>

          <div className="hranilishBlock bazaBlock">
            <span></span>
            <p> - Хранилища</p>
          </div> */}
        </div>

        {/* ${item?.type == 1 ? "hranilish" : "baza"} */}

        <div className="list hoverScroll">
          {listDataSaved?.map((item) => (
            <div
              className={`every  ${
                activeDataBases == item?.guid ? "active" : ""
              } ${objtypeActive?.[item?.check_status_ping]}`}
              key={item?.guid}
              onClick={() => setActiveDataBases(item?.guid)}
            >
              <div className="headerInner">
                <div className="types">
                  {/* <img src={obkIcons?.[item?.type]} alt="" /> */}
                  <h5>{item?.data_base_name}</h5>
                  {item?.check_status_ping == 1 && (
                    <div className="warning">
                      <WarningIcon sx={{ fill: "#f79e02" }} />
                    </div>
                  )}
                </div>
                <div className="actions">
                  <button onClick={() => openModal(2, item)}>
                    <img src={editIcon} alt="" />
                  </button>
                  <button onClick={() => openModal(3, item)}>
                    <img src={delIcon} alt="" />
                  </button>
                </div>
              </div>
              <h6>
                {listDataBases?.find((i) => i.value == item?.type)?.label}
              </h6>

              <div className="body">
                <p className="login">Логин: {item?.login}</p>
                <p className="password">Пароль: {item?.password}</p>
              </div>

              <div className="list_ip">
                {item?.ipAddresses?.length == 0 ? (
                  "..."
                ) : (
                  <>
                    {item?.ipAddresses?.map((i, index) => (
                      <div key={index}>
                        
                        { i?.avg_ping == 0 ? (
                          <div>
                            <WarningIcon sx={{ fill: "#f79e02", width: 15, height: 15 }} />
                          </div>
                        ) : (
                          <div
                          className="btnBlink"
                          style={{ background: pingtimeFN(+i?.avg_ping) }}
                        ></div> 
                        )
                        }
                        <p key={i?.guid}>{i?.ip_adres}</p>

                        <div className="ping">
                          <span style={{ color: pingtimeFN(+i?.avg_ping) }}>
                            {cutNums(+i?.avg_ping, 4)}
                          </span>
                          <b style={{ color: pingtimeFN(+i?.avg_ping) }}>мс</b>
                        </div>
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
