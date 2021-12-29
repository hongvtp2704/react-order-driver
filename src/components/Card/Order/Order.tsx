import React, { FC, useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Select,
  MenuItem,
  Collapse,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

import { OrderModel } from "models";
import { getVndPrice } from "utils/price";
import {
  useUpdateStatus,
  useGetCurrentOrder,
  useDeleteOrderById,
} from "api/order";

import { Button, Alert } from "components";

import style, { BillTitle, FoodTitle, OrderTitle } from "./styles";

type Props = {
  showStatus?: boolean;
  onClickButton?: () => void;
  done?: boolean;
  order?: OrderModel;
};

const OrderCard: FC<Props> = ({
  showStatus,
  onClickButton,
  done,
  order,
}: Props) => {
  const classes = style();
  const navigate = useNavigate();
  const driverId = sessionStorage.getItem("driver_id") as string;
  const [value, setValue] = useState<string>(order?.status as string);
  const [count, setCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
    setCount(count + 1);
  };

  const { runRequest: getCurrentOrder } = useGetCurrentOrder({});

  const { runRequest: updateStatus } = useUpdateStatus({
    failureCallback: (err) => setErrorMessage(err.response?.data.message),
    successCallback: () => {
      setSuccessMessage("Update successful");
    },
  });

  const { runRequest: deleteOrder } = useDeleteOrderById({
    failureCallback: (err) => setErrorMessage(err.response?.data.message),
    successCallback: () => {
      setSuccessMessage("Delete successful");
      getCurrentOrder(driverId);
    },
  });

  useEffect(() => {
    if (count === 0) {
      return;
    } else {
      updateStatus(order?.id as string, value);
    }

    if (value === "done") {
      setSuccessMessage("Order Completed");
      getCurrentOrder(driverId);
    }
  }, [value]);

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h6">
              OrderId : {order?.id}
            </Typography>
            <ul>
              <li>
                <OrderTitle>Payment : {order?.payment_option}</OrderTitle>
              </li>
              <li>
                <OrderTitle>Customer name : {order?.user?.name}</OrderTitle>
              </li>
              <li>
                <OrderTitle>Phone number : {order?.user?.phone}</OrderTitle>
              </li>
              <li>
                <OrderTitle>Address : {order?.user?.address}</OrderTitle>
              </li>
              <li>
                <OrderTitle>
                  Shipper Fee: {getVndPrice(order?.shipper_fee as number)}
                </OrderTitle>
              </li>
              <li>
                <OrderTitle>Created At: {order?.createdAt} </OrderTitle>
              </li>
              <li>
                <BillTitle onClick={() => setOpen(!open)}>
                  <>Bill:</> {open ? <ExpandLess /> : <ExpandMore />}
                </BillTitle>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <ul className={classes.boxFoods}>
                    {order?.orders_items.map((item, index) => (
                      <li key={index} className={classes.boxFood}>
                        <FoodTitle>Name: {item?.food.name}</FoodTitle>
                        <FoodTitle>Quantity: {item?.qty}</FoodTitle>
                        <FoodTitle>
                          Price: {getVndPrice(item?.price as number)}
                        </FoodTitle>
                        <FoodTitle>
                          Store Name: {item?.food?.store?.name}
                        </FoodTitle>
                        <FoodTitle>
                          Address: {item?.food?.store?.address}
                        </FoodTitle>
                      </li>
                    ))}
                  </ul>
                </Collapse>
              </li>
            </ul>
            <Typography variant="h6">
              Total: {getVndPrice(order?.total as number)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {!done && (
            <>
              {!showStatus ? (
                <Button
                  title="Take Order"
                  onClick={() => {
                    onClickButton?.();
                  }}
                />
              ) : (
                <>
                  <Select value={value} onChange={handleChange}>
                    <MenuItem
                      value="cooking_foods"
                      disabled={value === "delivering"}
                    >
                      Cooking Foods
                    </MenuItem>
                    <MenuItem value="delivering">Delivering</MenuItem>
                    <MenuItem value="done" disabled={value === "cooking_foods"}>
                      Done
                    </MenuItem>
                  </Select>
                  <Button
                    className={classes.directionButton}
                    title={
                      value === "cooking_foods"
                        ? "Directions to the restaurant"
                        : "Directions to customer"
                    }
                    variant="outlined"
                    onClick={() => {
                      window.open(
                        `https://www.google.com/maps/place/${
                          value === "cooking_foods"
                            ? order?.orders_items[0].food.store.address
                            : order?.address
                        }`
                      );
                    }}
                  />
                  <Button
                    className={classes.deleteBtn}
                    title="Cancel Order"
                    variant="outlined"
                    onClick={() => {
                      deleteOrder(order?.id as string);
                    }}
                  />
                </>
              )}
            </>
          )}
        </CardActions>
      </Card>
      <Alert
        open={errorMessage !== null}
        message={errorMessage as string}
        type="error"
        onClose={() => setErrorMessage(null)}
      />
      <Alert
        open={successMessage !== null}
        message={successMessage as string}
        type="success"
        onClose={() => setSuccessMessage(null)}
      />
    </>
  );
};

export default OrderCard;
