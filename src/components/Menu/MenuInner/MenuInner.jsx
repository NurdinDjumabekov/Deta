/////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

////// styles
import "./style.scss";

///////// fns
import { setMenuInner } from "../../../store/reducers/stateSlice";
import { getContainersInMenu } from "../../../store/reducers/requestSlice";

/////// components
import Search from "../../MainPage/Search/Search";

const MenuInner = () => {
  const dispatch = useDispatch();

  const { menuInner, activeHost } = useSelector((state) => state.stateSlice);

  const choice = (id) => dispatch(setMenuInner(id));

  const getContainer = (guid, id) => {
    const guid_service = id == 2 ? guid : undefined;
    const guid_user = id == 3 ? guid : undefined;
    const obj = { guid_host: activeHost, guid_service, guid_user };
    dispatch(getContainersInMenu(obj));
    // choice(id);
  };

  // Сортировка массива menuInner по id от меньшего к большему
  const sortedMenuInner = menuInner?.slice()?.sort((a, b) => a?.id - b?.id);

  return (
    <div className="menuInner">
      <div className="menuInner__inner">
        {sortedMenuInner?.map((item, index) => (
          <div key={index}>
            <div
              className={`every ${item?.active ? "active" : ""}`}
              onClick={() => choice(item?.id)}
            >
              <div>
                <img src={item?.img} alt="" />
              </div>
              <p>
                {item?.name} [{item?.list?.length || 0}]
              </p>
            </div>
            <div
              className={`listCateg ${
                item?.list?.length ? "expanded" : "collapsed"
              }`}
            >
              {item?.id !== 1 && /// не отображаю контейнера
                item?.list?.map((subItem, index) => (
                  <div
                    key={index}
                    onClick={() => getContainer(subItem?.guid, item?.id)}
                  >
                    <p>
                      {subItem?.name} {<b>[{subItem?.count}]</b>}
                    </p>
                    <span>{subItem?.desc}</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <Search />
    </div>
  );
};

export default MenuInner;
