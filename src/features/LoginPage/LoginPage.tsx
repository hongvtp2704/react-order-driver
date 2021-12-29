import { FC, useState, useEffect } from "react";
import { Lock } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useTranslations } from "hooks";
import { signInSchema } from "schemas";
import { authSelector } from "store/slices/auth/authSlice";
import { useDriverLogin } from "api/auth";

import { Button, Alert } from "components";

import styles from "./styles";

const LoginPage: FC = () => {
  const classes = styles();
  const { i18n } = useTranslations();
  const navigate = useNavigate();
  const { isSuccess, token } = useSelector(authSelector);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isSuccess && token != null && token !== "") {
      navigate("/");
    }
  }, [isSuccess, token]);

  const { runRequest: fetchDriverLogin, isLoading: loginLoading } =
    useDriverLogin({
      failureCallback: (err) => setErrorMessage(err.response?.data.message),
    });

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: ({ email, password }) => {
      fetchDriverLogin({
        email,
        password,
      });
    },
  });

  return (
    <div className={classes.wrapper}>
      <div className={classes.formWrapper}>
        <div className={classes.iconWrapper}>
          <div className={classes.lockIconWrapper}>
            <Lock className={classes.lockIcon} />
          </div>
        </div>
        <p className={classes.signInText}>{i18n.t("login.sign_in")}</p>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.inputWrapper}>
            <TextField
              className={classes.inputText}
              label={i18n.t("login.username_label")}
              value={values.email}
              name="email"
              onChange={handleChange}
              error={touched.email && !!errors.email}
              helperText={errors.email}
            />
          </div>
          <div className={classes.inputWrapper}>
            <TextField
              className={classes.inputText}
              label={i18n.t("login.password_label")}
              type="password"
              value={values.password}
              name="password"
              onChange={handleChange}
              error={touched.password && !!errors.password}
              helperText={errors.password}
            />
          </div>
          <Button
            type="submit"
            isLoading={loginLoading}
            className={classes.button}
            title={i18n.t("login.sign_in_button")}
            variant="contained"
          />
        </form>
        <p className={classes.bottomText}>{i18n.t("login.copyright")}</p>
        <Alert
          open={errorMessage !== null}
          message={errorMessage as string}
          type="error"
          onClose={() => setErrorMessage(null)}
        />
      </div>
    </div>
  );
};

export default LoginPage;
