import { makeStyles } from "@material-ui/core";

export default makeStyles({
  wrapper: {
    height: "100vh",
    width: "80%",
    margin: "30px auto",
  },
  formContainer: {
    width: "100%",
    margin: "auto",
  },
  formField: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-around",
  },
  inputText: {
    width: "100%",
  },
  inputWrapper: {
    marginBottom: 16,
    width: "100%",
  },
  inputTextPassword: {
    width: "80%",
    marginTop: 10,
    marginBottom: 10,
  },
  form: {
    paddingTop: 22,
    marginBottom: 68,
  },
  button: {
    padding: "8px 16px",
  },
  buttonPassword: {
    display: "block",
    position: "absolute",
    right: 150,
    bottom: -60,
  },
  changePassTitle: {
    marginTop: 50,
  },
});
