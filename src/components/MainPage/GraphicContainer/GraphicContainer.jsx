//////// hooks
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

/////// components
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

////// styles
import "./style.scss";

const GraphicContainer = () => {
  const { diagramsContainer } = useSelector((state) => state.requestSlice);

  const newDiagrams = diagramsContainer?.map((i) => ({
    ...i,
    RAM: i?.RAM / 10000,
    CPU: i?.CPU * 1000,
  }));

  console.log(newDiagrams, "newDiagrams");

  return (
    <div className="graphicContainer">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={newDiagrams} margin={{ bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            angle={-60}
            textAnchor="end"
            height={80}
            tick={{ fontSize: 10 }}
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
            strokeWidth={1}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="RAM"
            stroke="#00bfff"
            strokeWidth={1}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(GraphicContainer);
