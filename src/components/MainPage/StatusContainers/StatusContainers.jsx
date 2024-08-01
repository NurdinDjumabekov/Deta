import React from "react";
import water from "../../../assets/icons/water.svg";
import "./style.scss";
import { listHosts } from "../../../helpers/LocalData";

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

const StatusContainers = () => {
  return (
    <div className="statusContainers">
      {sections.map((section, index) => (
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
      ))}
    </div>
  );
};

export default StatusContainers;
