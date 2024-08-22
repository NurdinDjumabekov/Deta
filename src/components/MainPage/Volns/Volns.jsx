import React, { useEffect } from "react";
import water from "../../../assets/icons/water.svg";
import "./style.scss";
import { listHosts, listVolns } from "../../../helpers/LocalData";
import { useDispatch } from "react-redux";
import { getVolns } from "../../../store/reducers/requestSlice";

const sections = [
  {
    title: "Очистить",
    className: "clear",
    count: 1,
    items: listHosts?.listOne,
  },
  {
    title: "Активные",
    className: "active",
    count: 2,
    items: listHosts?.listOne,
  },
  {
    title: "Не активные",
    className: "disActive",
    count: 3,
    items: listHosts?.listOne,
  },
];

const Volns = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getVolns());
  }, []);

  return (
    <div className="statusContainers">
      {/* {listVolns.map((section, index) => (
        <div key={index}>
          <p className={section.className}>{section.title}</p>
          <div className="title">
            <img src={water} alt="..." />
            <span>{section.count}</span>
          </div>
          <div className="list">
            {section.items?.map((item, itemIndex) => (
              <span key={itemIndex}>{item}</span>
            ))}
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default Volns;
