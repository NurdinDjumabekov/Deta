/////// hooks
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////style
import "./style.scss";

//////helpers
import { listPrivoiders, list_haProxy } from "../../helpers/LocalData";

////// imgs
import addicon from "../../assets/icons/add.svg";
import editIcon from "../../assets/icons/edit.svg";
import monitor from "../../assets/icons/display.svg";

/////// fns
import { getStaticsIpAddresReq } from "../../store/reducers/networkSlice";
import { cutNums } from "../../helpers/cutNums";

const IpAddresPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { listStaticsIp } = useSelector((state) => state.networkSlice);

  useEffect(() => {
    dispatch(getStaticsIpAddresReq());
  }, []);

  console.log(listStaticsIp, "listStaticsIp");

  return (
    <div className="ipAddresPage hoverScroll">
      <div className="ipAddresPage__menu">
        <button className="addBtn">+</button>
      </div>

      <div className="ipAddresPage__inner">
        {listStaticsIp?.map((item, index) => (
          <div className="every" key={item?.guid}>
            <div className="titlesAction">
              <h5>{item?.name_group}</h5>
              <div className="actions">
                <button>
                  <img src={addicon} alt="+" />
                </button>
                <button className="edit">
                  <img src={editIcon} alt="edit" />
                </button>
              </div>
            </div>
            {item?.subgroups?.map((i, index) => (
              <div className="every__inner" key={index}>
                <div className="titleInner">
                  <div className="header">
                    <h6>{i?.subgroup_name}</h6>
                    <p>{i?.subgroup_comment}</p>
                    <div className="actions">
                      <button>
                        <img src={addicon} alt="+" />
                      </button>
                      <button className="edit">
                        <img src={editIcon} alt="edit" />
                      </button>
                    </div>
                  </div>
                  <span className="host">{i?.host}</span>
                </div>
                <div className="listIp">
                  <div className="titles">
                    <p>№</p>
                    <p>IP</p>
                    <p>PING</p>
                    <p>Комментарий</p>
                  </div>
                  {i?.ips?.map((jex, index) => (
                    <div className="ip__every" key={jex?.guid}>
                      <div className="ip__every__inner">
                        <div className="index">
                          <b>{index + 1}</b>
                          <div className="btnBlink"></div>
                        </div>
                        <div className="moreInfoIp">
                          <p>{jex?.static_ip}</p>
                          <span>{cutNums(+jex?.avg_ping, 4)} мс</span>
                          <div className="other">
                            <p className="comment">{jex?.comment}</p>
                            <div className="nums">
                              <p>{jex?.number_ip}</p>
                              <img src={monitor} alt="[]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IpAddresPage;
