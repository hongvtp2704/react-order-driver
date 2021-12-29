import React, { FC, ReactElement } from "react";
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

import { getIncomeOnDaySuccess } from "api/income/responseTypes";

interface IProps {
  list: getIncomeOnDaySuccess[];
}

const LineChartComponent: FC<IProps> = ({ list }: IProps): ReactElement => {
  const data = list.map((l, i) => {
    return { name: l.name, totalIncome: l.currDay?.total_sum };
  });

  return (
    <div style={{ width: "100%", height: "100%", margin: "20px 0" }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={200}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            connectNulls
            type="monotone"
            dataKey="totalIncome"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
