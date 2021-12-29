import { makeStyles } from "@material-ui/core";

export default makeStyles({
  title: {
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 700,
    marginTop: 20,
  },
  cardWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  cardWrapperMobile: {
    display: "block",
  },
  card: {
    width: "100%",
    textAlign: "center",
    marginBottom: 10,
  },
  smallText: {
    fontWeight: 700,
    marginBottom: 10,
  },
  circular: {
    margin: "auto",
  },
});
