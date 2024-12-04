/////// hooks
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////style
import "./style.scss";

//////helpers
import { cutNums } from "../../helpers/cutNums";

////// imgs
import monitor from "../../assets/icons/display.svg";
import EditIcon from "@mui/icons-material/Edit";
import delIcon from "../../assets/icons/delete.svg";
import AddIcon from "@mui/icons-material/Add";

/////// fns
import {
  getStaticsIpAddresReq,
  updatedStaticsIpSocket,
} from "../../store/reducers/networkSlice";

////// components
import ModalsIpAddres from "../../components/IpAddresPage/ModalsIpAddres/ModalsIpAddres";
import { listColorStatics } from "../../helpers/LocalData";

const IpAddresPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [group, setGroup] = useState({});
  const [subGroup, setSubGroup] = useState({});
  const [staticsIp, setStaticsIp] = useState({});

  const { listStaticsIp } = useSelector((state) => state.networkSlice);

  useEffect(() => {
    dispatch(getStaticsIpAddresReq());

    const disconnectSocket = dispatch(updatedStaticsIpSocket([]));
    return () => disconnectSocket();
  }, []);

  const actionGroup = ({ name_group, guid }, action) => {
    setGroup({ action, group_name: name_group, guid });
  };

  const actionSubGroup = (props, action) => {
    const { subgroup_gateway, subgroup_comment } = props;
    const { guid_group, subgroup_name, guid } = props;
    console.log(props, "props");

    setSubGroup({
      action,
      guid,
      group_guid: guid_group ? guid_group : guid,
      subgroup_name,
      subgroup_gateway,
      subgroup_comment,
    });
  };

  const actionStaticsIp = (props, action) => {
    if (action == 1) {
      const { guid_group, guid } = props;
      setStaticsIp({
        action,
        static_group: guid_group,
        static_subgroup: guid,
        static_ip: "",
        static_comment: "",
        static_type_color: "",
        type_ip: "",
        number_ip: "",
        name_ip: "",
      });
    }

    if (action == 2) {
      const { guid_static_group, guid, guid_static_subgroup } = props;
      const { static_ip, comment, color_type, type_ip } = props;
      const { number_ip, name_ip } = props;
      setStaticsIp({
        action,
        static_group: guid_static_group,
        static_subgroup: guid_static_subgroup,
        guid,
        static_ip,
        static_comment: comment,
        static_type_color: color_type,
        type_ip,
        number_ip,
        name_ip,
      });
    }
  };

  const searchColor = (item) => {
    const filter = listColorStatics?.find((i) => item === i.id);
    return filter?.color;
  };

  return (
    <>
      <div className="ipAddresPage hoverScroll">
        <div className="ipAddresPage__menu">
          <button className="addBtn" onClick={() => setGroup({ action: 1 })}>
            +
          </button>
        </div>
        <div className="ipAddresPage__inner">
          {listStaticsIp?.map((item) => (
            <div className="every hoverScroll" key={item?.guid}>
              <div className="titlesAction">
                <h5>{item?.name_group}</h5>
                <div className="actions">
                  <button onClick={() => actionSubGroup(item, 1)}>
                    <AddIcon sx={{ fill: "#15db15", width: 23, height: 23 }} />
                  </button>
                  <button className="edit" onClick={() => actionGroup(item, 2)}>
                    <EditIcon sx={{ width: 17, height: 17, fill: "yellow" }} />
                  </button>
                  <button className="del" onClick={() => actionGroup(item, 3)}>
                    <img src={delIcon} alt="+" />
                  </button>
                </div>
              </div>
              {item?.subgroups?.map((i, index) => (
                <div className="every__inner" key={index}>
                  <div className="titleInner">
                    <div className="header">
                      <div>
                        <h6>{i?.subgroup_name}</h6>
                        <span>{i?.subgroup_gateway}</span>
                      </div>
                      <p>{i?.subgroup_comment}</p>
                      <div className="actions">
                        <button onClick={() => actionStaticsIp(i, 1)}>
                          <AddIcon
                            sx={{ fill: "#15db15", width: 23, height: 23 }}
                          />
                        </button>
                        <button
                          className="edit"
                          onClick={() => actionSubGroup(i, 2)}
                        >
                          <EditIcon
                            sx={{ width: 17, height: 17, fill: "yellow" }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="listIp">
                    <div className="titles">
                      <p>№</p>
                      <p>IP</p>
                      <p>PING</p>
                      <p>Комментарий</p>
                    </div>
                    {i?.ips?.map((jex, index) => (
                      <div
                        className="ip__every"
                        key={jex?.guid}
                        onClick={() => actionStaticsIp(jex, 2)}
                      >
                        <div className="ip__every__inner">
                          <div className="index">
                            <b>{index + 1}</b>
                            <div
                              className="btnBlink"
                              style={{ background: pingtimeFN(+jex?.avg_ping) }}
                            ></div>
                          </div>
                          <div className="moreInfoIp">
                            <p
                              style={{
                                background: searchColor(jex?.color_type),
                                color: +jex?.color_type == 1 ? "#222" : "",
                              }}
                            >
                              {jex?.static_ip}
                            </p>
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

      <ModalsIpAddres
        setGroup={setGroup}
        group={group}
        setSubGroup={setSubGroup}
        subGroup={subGroup}
        setStaticsIp={setStaticsIp}
        staticsIp={staticsIp}
      />
    </>
  );
};

export default IpAddresPage;

const pingtimeFN = (provider_pingtime) => {
  if (+provider_pingtime < 8 && +provider_pingtime > 0) {
    return "green";
  } else if (+provider_pingtime > 6 && +provider_pingtime < 20) {
    return "orange";
  } else if (provider_pingtime == "" || provider_pingtime == 0) {
    return "red";
  } else {
    return "red";
  }
};
