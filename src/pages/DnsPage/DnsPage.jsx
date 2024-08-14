///// hooks
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////style
import "./style.scss";

//////helpers

////// fns
import { deleteDomen, getDnsDomen } from "../../store/reducers/requestSlice";
import { getDnsSubDomen } from "../../store/reducers/requestSlice";
import { setTemporaryDNS } from "../../store/reducers/stateSlice";

////// imgs
import diagramWhite from "../../assets/icons/diagramWhite.svg";
import editIcon from "../../assets/icons/edit.svg";
import krestIcon from "../../assets/icons/krest.svg";

////// components
import InnerSubDns from "../../components/DnsPage/InnerSubDns/InnerSubDns";
import Modals from "../../common/Modals/Modals";
import AddDns from "../../components/DnsPage/AddDns/AddDns";

const DnsPage = () => {
  const dispatch = useDispatch();

  const [guidDelete, setGuidDelete] = useState(""); // храню временный guid для удаления

  const { activeDns } = useSelector((state) => state.stateSlice);
  const { listDnsDomen } = useSelector((state) => state.requestSlice);

  const clickDns = ({ domen_name, guid, server_ttl }) => {
    dispatch(getDnsSubDomen(guid)); //// get суб домены этого dns

    const domenInfo = { domen_name, comment: `${domen_name}${server_ttl}` };
    dispatch(setTemporaryDNS(domenInfo));
    //// подставляю данные в stat eдля редактирования данных dns (так же подставляю данные dns)
  };

  const callDeleteFn = (guid) => setGuidDelete(guid);
  ///// вызов модалки для удаления данных суб домена

  const delDns = () => dispatch(deleteDomen({ guidDelete, setGuidDelete }));
  ///// удаления dns через запрос

  useEffect(() => {
    dispatch(getDnsDomen());
  }, []);

  const active = activeDns === "" ? "activeDns" : "";

  return (
    <>
      <div className="dnsMain">
        <div className="dnsMain__add">
          <div className={`dnsMain__add__inner ${active}`}>
            <ul className="listDns">
              {listDnsDomen?.map((item) => (
                <li
                  className={item?.guid === activeDns ? "activeDns" : ""}
                  key={item?.guid}
                  onClick={() => clickDns(item)}
                >
                  <div className="content">
                    <img src={diagramWhite} alt="%" />
                    <p>{item?.domen_name}</p>
                  </div>
                  <div className="actions">
                    {/* <button
                      className="actions__btns"
                      onClick={() => callEditFN(item)}
                    >
                      <img src={editIcon} alt="e" />
                    </button> */}
                    <button
                      className="actions__btns krest"
                      onClick={() => callDeleteFn(item?.guid)}
                    >
                      <img src={krestIcon} alt="x" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="actionDns">
              <AddDns />
            </div>
          </div>
        </div>
        <div className="dnsMain__edit">
          <InnerSubDns />
        </div>
      </div>

      {/* для удаления  */}
      <Modals
        openModal={!!guidDelete}
        setOpenModal={() => setGuidDelete()}
        title={"Удалить данный элемент ?"}
      >
        <div className="modalDel">
          <button className="yes" onClick={delDns}>
            Да
          </button>
          <button className="no" onClick={() => setGuidDelete("")}>
            Нет
          </button>
        </div>
      </Modals>
    </>
  );
};

export default DnsPage;
