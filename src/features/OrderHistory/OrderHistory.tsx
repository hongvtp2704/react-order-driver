import { FC, useEffect, useState } from "react";
import { Typography, CircularProgress, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";

import {
  useGetOrderByMonth,
  useGetOrderByPresent,
  useGetOrderByWeek,
} from "api/order";
import { orderSelector } from "store/slices/order/orderSlice";

import { SelectInput } from "components/Input";
import { Order } from "components";

import styles from "./styles";

const ranges = [
  { id: "Orders today", value: "today" },
  { id: "Orders of the week", value: "week" },
  { id: "Orders of the month", value: "month" },
];

const OrderHistory: FC = () => {
  const classes = styles();
  const driverId = sessionStorage.getItem("driver_id");
  const { listOrder, isLoading } = useSelector(orderSelector);

  const [orderRange, setOrderRange] = useState<string>("today");

  const { runRequest: getOrderByPresent } = useGetOrderByPresent({});
  const { runRequest: getOrderByWeek } = useGetOrderByWeek({});
  const { runRequest: getOrderByMonth } = useGetOrderByMonth({});

  useEffect(() => {
    if (driverId) {
      switch (orderRange) {
        case "today":
          getOrderByPresent(driverId);
          break;
        case "week":
          getOrderByWeek(driverId);
          break;
        case "month":
          getOrderByMonth(driverId);
          break;
        default:
          break;
      }
    }
  }, [orderRange]);

  return (
    <>
      <SelectInput
        label="Order Range"
        value={orderRange}
        name="orderRange"
        itemList={ranges}
        onChange={(e) => setOrderRange(e.target.value)}
        variant="standard"
      />
      <Typography className={classes.title}>Order History</Typography>
      {isLoading ? (
        <CircularProgress className={classes.circular} />
      ) : (
        <>
          {listOrder ? (
            <>
              <Typography>{listOrder.total} Orders</Typography>
              <Grid container spacing={3}>
                {listOrder?.data.map((order, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Order order={order} done />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <Typography>Don't have Order</Typography>
          )}
        </>
      )}
    </>
  );
};

export default OrderHistory;
