import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

import { useGetCurrentOrder } from "api/order";
import { orderSelector } from "store/slices/order/orderSlice";

import { Order } from "components";
import { Grid, Typography } from "@material-ui/core";

const YourOrderPage: FC = () => {
  const { listOrder, isLoading } = useSelector(orderSelector);
  const driverId = sessionStorage.getItem("driver_id") as string;

  const { runRequest: getCurrentOrder } = useGetCurrentOrder({});

  useEffect(() => {
    getCurrentOrder(driverId);
  }, []);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {listOrder?.data.length === 0 ? (
            <Typography>Don't have current order</Typography>
          ) : (
            <>
              <Typography>{listOrder?.total} Orders</Typography>
              <Grid container spacing={3}>
                {listOrder?.data?.map((list, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Order order={list} showStatus={true} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </>
      )}
    </>
  );
};

export default YourOrderPage;
