///// hooks
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////style
import "./style.scss";

//////helpers

////// fns
import {
  deleteDomen,
  getDnsDomen,
  getDnsSubDomen,
} from "../../store/reducers/requestSlice";

////// imgs
import diagramWhite from "../../assets/icons/diagramWhite.svg";
import editIcon from "../../assets/icons/edit.svg";
import krestIcon from "../../assets/icons/krest.svg";

////// components
import InnerDns from "../../components/DnsPage/InnerDns/InnerDns";
import TypeAddDns from "../../components/DnsPage/TypeAddDns/TypeAddDns";
import { setTemporaryDNS } from "../../store/reducers/stateSlice";
import Modals from "../../common/Modals/Modals";

const DnsPage = () => {
  const dispatch = useDispatch();

  const [guidDelete, setGuidDelete] = useState(""); // храню временный guid для удаления

  const { activeDns } = useSelector((state) => state.stateSlice);
  const { listDnsDomen } = useSelector((state) => state.requestSlice);

  const clickDns = (guid) => dispatch(getDnsSubDomen(guid));

  const active = activeDns === "" ? "activeDns" : "";

  const callEditFN = (obj) => dispatch(setTemporaryDNS(obj));
  ///// вызов модалки для редактирования данных dns (так же подставляю данные dns)

  const callDeleteFn = (guid) => setGuidDelete(guid);
  ///// вызов модалки для удаления данных суб домена

  const delDns = () => dispatch(deleteDomen({ guidDelete, setGuidDelete }));
  ///// удаления dns через запрос

  const editDns = () => {
    ///// редактирование dns через запрос
  };

  useEffect(() => {
    dispatch(getDnsDomen());
  }, []);

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
                  onClick={() => clickDns(item?.guid)}
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
              <TypeAddDns />
            </div>
          </div>
        </div>
        <div className="dnsMain__edit">
          <InnerDns />
        </div>
      </div>
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
      {/* ///// для редактирования */}
    </>
  );
};

export default DnsPage;
