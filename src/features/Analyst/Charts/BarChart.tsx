import React, { FC, ReactElement } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

interface IProps {
  list?: any;
}

const BarChartComponent: FC<IProps> = ({ list }: IProps): ReactElement => {
  const data = list?.map((l: any) => {
    return {
      name: l.name,
      totalIncome: l?.currDay?.total_sum || l?.currMonth?.total_sum,
    };
  });

  return (
    <div style={{ width: "100%", height: "100%", margin: "20px 0" }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalIncome" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
