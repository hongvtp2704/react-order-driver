import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  useGetIncomeByWeek,
  useGetIncomeByMonth,
  useGetIncomeByYear,
} from "api/income";
import { incomeSelector } from "store/slices/income/incomeSlice";

import { SelectInput } from "components/Input";
import { BarChartComponent, LineChartComponent } from "./Charts";

import styles from "./styles";
import { CircularProgress } from "@mui/material";

const ranges = [
  { id: "Income of the week", value: "income-of-week" },
  { id: "Income of the month", value: "income-of-month" },
  { id: "Income of the year", value: "income-of-year" },
];

const Analyts: FC = () => {
  const classes = styles();
  const driverId = sessionStorage.getItem("driver_id") as string;
  const { listIncome, isLoading } = useSelector(incomeSelector);

  const [incomeRange, setIncomeRange] = useState<string>("income-of-week");

  const { runRequest: getIncomeByWeek } = useGetIncomeByWeek({ driverId });
  const { runRequest: getIncomeByMonth } = useGetIncomeByMonth({ driverId });
  const { runRequest: getIncomeByYear } = useGetIncomeByYear({ driverId });

  useEffect(() => {
    if (driverId) {
      switch (incomeRange) {
        case "income-of-week":
          getIncomeByWeek();
          break;
        case "income-of-month":
          getIncomeByMonth();
          break;
        case "income-of-year":
          getIncomeByYear();
          break;
        default:
          break;
      }
    }
  }, [incomeRange]);

  useEffect(() => {
    if (driverId) {
      getIncomeByWeek();
    }
  }, []);

  return (
    <>
      <SelectInput
        label="Income Range"
        value={incomeRange}
        name="incomeRange"
        itemList={ranges}
        onChange={(e) => setIncomeRange(e.target.value)}
        variant="standard"
      />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className={classes.boxChart}>
          {listIncome?.length === 30 ? (
            <LineChartComponent list={listIncome} />
          ) : (
            <BarChartComponent list={listIncome} />
          )}
        </div>
      )}
    </>
  );
};

export default Analyts;
