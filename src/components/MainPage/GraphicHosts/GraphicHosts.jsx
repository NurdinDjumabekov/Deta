import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./style.scss";
import { generateRandomData } from "../../../helpers/LocalData";

// Кастомный компонент для точек
const CustomDot = (props) => {
  const { cx, cy, stroke, fill } = props;

  return (
    <svg x={cx - 5} y={cy - 5} width={10} height={10}>
      <polygon
        points="5,0 10,5 5,10 0,5"
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
      />
    </svg>
  );
};

const GraphicHosts = () => (
  <div className="graphicHosts">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={generateRandomData(50)}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 80, // Увеличьте нижний отступ для размещения вертикальных меток
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          angle={-60} // Поворот текста меток
          textAnchor="end" // Выравнивание текста
          height={80} // Увеличьте высоту оси X для размещения текста
          tick={{ fontSize: 12 }} // Настройка размера шрифта меток
        />
        <YAxis yAxisId="left" orientation="left" stroke="#ff0077" />
        <YAxis yAxisId="right" orientation="right" stroke="#00bfff" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="CPU"
          stroke="#ff0077"
          strokeWidth={3} // Установите желаемую ширину линии
          dot={<CustomDot />} // Используйте кастомный компонент для точек
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="RAM"
          stroke="#00bfff"
          strokeWidth={3} // Установите желаемую ширину линии
          dot={<CustomDot />} // Используйте кастомный компонент для точек
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default GraphicHosts;
