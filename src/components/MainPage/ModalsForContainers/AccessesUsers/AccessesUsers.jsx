/////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

/////// components
import { Table, TableBody } from "@mui/material";
import { TableCell, TableContainer } from "@mui/material";
import { TableHead, TableRow } from "@mui/material";
import ToggleSwitch from "../../../../common/ToggleSwitch/ToggleSwitch";

////// imgs
import play from "../../../../assets/icons/play-circle.svg";
import restart from "../../../../assets/icons/repeat.svg";
import stop from "../../../../assets/icons/stop-circle.svg";
import info from "../../../../assets/icons/moreInfo.svg";
import warning from "../../../../assets/icons/warning.svg";

//////// style
import "./style.scss";

//////// fns
import { setListAccessesUsers } from "../../../../store/reducers/requestSlice";
import { editAccessesUsersFN } from "../../../../store/reducers/requestSlice";

const AccessesUsers = () => {
  const dispatch = useDispatch();

  const { listAccessesUsers } = useSelector((state) => state.requestSlice);
  const { activeContainer } = useSelector((state) => state.stateSlice);

  const onChange = ({ value, name, guid }) => {
    const newList = listAccessesUsers?.map((item) =>
      guid == item?.guid ? { ...item, [name]: value } : item
    );
    dispatch(setListAccessesUsers(newList));
  };

  const changeAccessesUsers = () => {
    const data = { guid_vm: activeContainer, accessesUsers: listAccessesUsers };
    dispatch(editAccessesUsersFN(data));
    ///// изменение статусов клиентов, отпрaвляю кто что может видеть, у кого какие доступы
  };

  return (
    <div className="accessesUsers">
      <TableContainer className="accessesUsers__inner">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  width: "30%",
                  color: "#c0c0c0",
                  textAlign: "left",
                  padding: 0,
                }}
              >
                ФИО
              </TableCell>
              <TableCell style={{ width: "14%", color: "#c0c0c0" }}>
                Отображение
              </TableCell>
              <TableCell style={{ width: "7%", color: "#c0c0c0" }}>
                VNC
              </TableCell>
              <TableCell style={{ width: "7%", color: "#c0c0c0" }}>
                <img src={play} alt="" />
              </TableCell>
              <TableCell style={{ width: "7%", color: "#c0c0c0" }}>
                <img src={restart} alt="" />
              </TableCell>
              <TableCell style={{ width: "7%", color: "#c0c0c0" }}>
                <img src={stop} alt="" />
              </TableCell>
              <TableCell style={{ width: "7%", color: "#c0c0c0" }}>
                <img src={warning} alt="" />
              </TableCell>
              <TableCell style={{ width: "7%", color: "#c0c0c0" }}>
                <img src={info} alt="" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listAccessesUsers?.map((item, index) => (
              <TableRow className="" key={index}>
                <TableCell style={{ width: "30%", padding: 0 }}>
                  <p>{item?.fio}</p>
                </TableCell>
                <TableCell className="dnsText expire" style={{ width: "14%" }}>
                  <ToggleSwitch
                    onChange={onChange}
                    name={"show"}
                    value={item?.show}
                    guid={item?.guid}
                    keyGuid={index + 1}
                  />
                </TableCell>
                <TableCell className="dnsText negative" style={{ width: "7%" }}>
                  <ToggleSwitch
                    onChange={onChange}
                    name={"vnc"}
                    value={item?.vnc}
                    guid={item?.guid}
                    keyGuid={index + 1}
                  />
                </TableCell>
                <TableCell className="dnsText refresh" style={{ width: "7%" }}>
                  <ToggleSwitch
                    onChange={onChange}
                    name={"start"}
                    value={item?.start}
                    guid={item?.guid}
                    keyGuid={index + 1}
                  />
                </TableCell>
                <TableCell className="dnsText retry" style={{ width: "7%" }}>
                  <ToggleSwitch
                    onChange={onChange}
                    name={"reboot"}
                    value={item?.reboot}
                    guid={item?.guid}
                    keyGuid={index + 1}
                  />
                </TableCell>
                <TableCell className="dnsText retry" style={{ width: "7%" }}>
                  <ToggleSwitch
                    onChange={onChange}
                    name={"shutdown"}
                    value={item?.shutdown}
                    guid={item?.guid}
                    keyGuid={index + 1}
                  />
                </TableCell>
                <TableCell className="dnsText retry" style={{ width: "7%" }}>
                  <ToggleSwitch
                    onChange={onChange}
                    name={"stop"}
                    value={item?.stop}
                    keyGuid={index + 1}
                    guid={item?.guid}
                  />
                </TableCell>
                <TableCell className="dnsText retry" style={{ width: "7%" }}>
                  <ToggleSwitch
                    onChange={onChange}
                    name={"history"}
                    value={item?.history}
                    guid={item?.guid}
                    keyGuid={index + 1}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="save">
        <button onClick={changeAccessesUsers}>Сохранить</button>
      </div>
    </div>
  );
};

export default AccessesUsers;
