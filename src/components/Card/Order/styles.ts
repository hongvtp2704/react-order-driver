import { makeStyles, withTheme, Typography } from "@material-ui/core";
import { Theme, styled } from "@material-ui/core/styles";

export default makeStyles({
  root: {
    marginTop: 10,
  },
  boxFoods: {
    margin: -5,
  },
  boxFood: {
    margin: "10px 0",
  },
  deleteBtn: {
    color: "#FF0000",
    border: "1px solid #FF0000",
  },
  directionButton: {
    color: "#008000",
    border: "1px solid #008000",
  },
});

export const OrderTitle = styled(withTheme(Typography))({
  fontSize: 17,
  overflow: "hidden",
  textOverflow: "ellipsis",
  lineHeight: 2,
});

export const BillTitle = styled(withTheme(Typography))({
  fontSize: 17,
  overflow: "hidden",
  textOverflow: "ellipsis",
  lineHeight: 2,
  backgroundColor: "#EEEEEE",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const FoodTitle = styled(withTheme(Typography))({
  fontSize: 15,
  overflow: "hidden",
  textOverflow: "ellipsis",
  lineHeight: 1.8,
});
