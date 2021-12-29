import { makeStyles } from "@material-ui/core";

export default makeStyles({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    paddingTop: 64,
  },
  formWrapper: {
    width: 444,
    padding: "0 16px",
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  lockIcon: {
    color: "#FFF",
  },
  lockIconWrapper: {
    background: "#9c27b0",
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  signInText: {
    textAlign: "center",
    fontSize: 22,
  },
  inputText: {
    width: "100%",
  },
  form: {
    paddingTop: 22,
    marginBottom: 68,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  button: {
    width: "100%",
  },
  bottomText: {
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: 16,
    textAlign: "center",
  },
});
