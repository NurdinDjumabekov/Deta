import React from "react";

///// style
import "./style.scss";

const NumberTypes = ({ list }) => {
  // Проверяем, если количество элементов нечётное, добавляем пустой объект
  const adjustedList =
    list?.length % 2 !== 0
      ? [...list, { name: "", color: "transparent" }]
      : list;

  // Разделяем массив на две равные части
  const midIndex = Math.ceil(adjustedList?.length / 2);
  const firstRow = adjustedList?.slice(0, midIndex);
  const secondRow = adjustedList?.slice(midIndex);

  return (
    <div className="numberTypes">
      {[firstRow, secondRow]?.map((row, rowIndex) => (
        <div key={rowIndex} className="numberTypes__row">
          {row?.map((item, index) => (
            <div key={index} style={{ background: item.color }}>
              <p className={item.color === "rgb(255, 242, 0)" ? "CW" : ""}>
                {item.name}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NumberTypes;
