import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress, Typography } from "@mui/material";

import {
  useGetOrderFindingDriver,
  useUpdateStatusCookingFood,
} from "api/order";
import { orderSelector } from "store/slices/order/orderSlice";

import { Order, Alert, Button } from "components";
import { Grid } from "@material-ui/core";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { listOrder, isLoading } = useSelector(orderSelector);
  const driverId = sessionStorage.getItem("driver_id") as string;

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { runRequest: getOrderFindingDriver } = useGetOrderFindingDriver({});
  const { runRequest: updateStatusToCookingFood } = useUpdateStatusCookingFood({
    failureCallback: (err) => setErrorMessage(err.response?.data.message),
    successCallback: () => {
      navigate("/your-order");
    },
  });

  useEffect(() => {
    getOrderFindingDriver();
  }, []);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Button
            title="Get New Order"
            onClick={getOrderFindingDriver}
            isLoading={isLoading}
          />

          {listOrder?.data.length === 0 ? (
            <Typography style={{ marginTop: 10 }}>
              Don't have new orders
            </Typography>
          ) : (
            <>
              <Typography style={{ marginTop: 10 }}>
                {listOrder?.total} Orders
              </Typography>
              <Grid container spacing={3}>
                {listOrder?.data?.map((list, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Order
                      order={list}
                      onClickButton={() =>
                        updateStatusToCookingFood(
                          list?.id,
                          driverId,
                          "cooking_foods"
                        )
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </>
      )}
      <Alert
        open={errorMessage !== null}
        message={errorMessage as string}
        type="error"
        onClose={() => setErrorMessage(null)}
      />
    </>
  );
};

export default HomePage;
