/////// hooks
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////// styles
import "./style.scss";

///////// fns
import { setMenuInner } from "../../../store/reducers/stateSlice";
import { setActiveGroup } from "../../../store/reducers/stateSlice";
import { getContainersInMenu } from "../../../store/reducers/requestSlice";

/////// img
import editIcon from "../../../assets/icons/edit.svg";

/////// components
import Search from "../../MainPage/Search/Search";
import ModalAddUser from "../../MainPage/ModalAddUser/ModalAddUser";

const MenuInner = () => {
  const dispatch = useDispatch();

  const { menuInner, activeHost } = useSelector((state) => state.stateSlice);

  const choice = (id) => dispatch(setMenuInner(id));
  const [addUsers, setAddUsers] = useState({});

  const getContainer = (guid, id) => {
    const guid_service = id == 2 ? guid : undefined;
    const guid_user = id == 3 ? guid : undefined;
    const obj = { guid_host: activeHost, guid_service, guid_user };
    dispatch(getContainersInMenu(obj));
    dispatch(setActiveGroup({ guid_service, guid_user }));
  };

  const openModalEditUsers = (item, index) => {
    setAddUsers({
      actionType: 2,
      type: index + 1,
      name: item?.name,
      guid: item?.guid,
    });
  };

  return (
    <>
      <div className="menuInner">
        <Search />

        <div className="menuInner__inner">
          {menuInner?.map((item, index) => (
            <Fragment key={index}>
              <div
                className={`every ${item?.active ? "active" : ""}`}
                onClick={() => choice(item?.id)}
              >
                <div>
                  <button>
                    <img src={item?.img} alt="" />
                  </button>
                  <p>
                    {item?.name} [{item?.list?.length || 0}]
                  </p>
                </div>
                <button
                  className="addBtn"
                  onClick={() =>
                    setAddUsers({ actionType: 1, type: index + 2 })
                  }
                >
                  <p>+</p>
                </button>
              </div>
              <div
                className={`listCateg ${
                  item?.list?.length ? "expanded" : "collapsed"
                }`}
              >
                {item?.id !== 1 && /// не отображаю контейнера
                  item?.list?.map((subItem, ind) => (
                    <div key={ind}>
                      <div
                        onClick={() => getContainer(subItem?.guid, item?.id)}
                      >
                        <p>
                          {subItem?.name} {<b>[{subItem?.count}]</b>}
                        </p>
                        <span>{subItem?.desc}</span>
                      </div>

                      <button
                        className="activeEdit"
                        onClick={() => openModalEditUsers(subItem, index)}
                      >
                        <img src={editIcon} alt="" />
                      </button>
                      <button></button>
                    </div>
                  ))}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <ModalAddUser addUsers={addUsers} setAddUsers={setAddUsers} />
    </>
  );
};

export default MenuInner;
