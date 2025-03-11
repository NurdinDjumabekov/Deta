////// hooks
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

/////// components
import Modals from "../../../../common/Modals/Modals";

///// fns
import { editVmOS_req } from "../../../../store/reducers/requestSlice";

//// icons
import round from "../../../../assets/images/OS/round.png";

////// styles
import "./style.scss";

////// helpers
import { getDataVM } from "../../../../helpers/getDataVM";
import { listOS } from "../../../../helpers/LocalData";
import { getListOsReq } from "../../../../store/reducers/actionsContaiersSlice";

/////// env
const { REACT_APP_API_URL } = process.env;

const OsEdit_VM = ({ item }) => {
  const dispatch = useDispatch();

  const { activeHost } = useSelector((state) => state.stateSlice);
  const { activeUserService, listOs } = useSelector(
    (state) => state.actionsContaiersSlice
  );

  const [sendData, setSendData] = useState({});

  const choiceOS = async (oc_guid) => {
    const send = { oc_guid, guid_vm: item?.guid };
    const res = await dispatch(editVmOS_req(send)).unwrap();
    if (res == 1) {
      getDataVM({ dispatch, activeHost, activeUserService });
      setSendData({});
    }
  };

  const openModal = async () => {
    const res = await dispatch(getListOsReq()).unwrap();
    if (res?.length > 0) setSendData(item);
  };

  // console.log(item?.icon_url, "item?.icon_url");

  return (
    <div className="os_vm">
      <button className="OS" onClick={openModal}>
        {item?.icon_url ? (
          <img src={`https://dd-api.ibm.kg/${item?.icon_url}`} alt="os" />
        ) : (
          <img src={round} alt="os" />
        )}
      </button>

      <Modals
        openModal={!!sendData?.guid}
        setOpenModal={() => setSendData({})}
        title={"Выбрать операционную систему"}
      >
        <div className="addDns hostsEdit osModal">
          <div className="listOS">
            {listOs?.map((i, index) => (
              <button key={index} onClick={() => choiceOS(i?.guid)}>
                <img
                  src={`${REACT_APP_API_URL}${i?.icon_url}`}
                  alt={i?.oc_name}
                />
              </button>
            ))}
          </div>
        </div>
      </Modals>
    </div>
  );
};

export default OsEdit_VM;
