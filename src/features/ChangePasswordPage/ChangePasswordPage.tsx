import { FC, useState, useEffect } from "react";
import { TextField, Typography, Box } from "@material-ui/core";
import { useFormik } from "formik";
import { useNavigate } from "react-router";

import { useTranslations } from "hooks";
import { changePasswordSchema } from "schemas";
import { useUpdatePasswordDriver } from "api/auth";

import { Button, Alert } from "components";

import styles from "./styles";
const ChangePasswordPage: FC = () => {
  const classes = styles();
  const { i18n } = useTranslations();
  const navigate = useNavigate();
  const driverId = sessionStorage.getItem("driver_id") as string;

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { runRequest: updatePassword, isLoading: updatePasswordLoading } =
    useUpdatePasswordDriver({
      driverId,
      failureCallback: (err) => setErrorMessage(err.response?.data.message),
      successCallback: () => {
        setSuccessMessage("Change password successfully");
      },
    });

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      oldpassword: "",
      password: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: ({ oldpassword, password }) => {
      updatePassword({
        oldpassword,
        password,
      });
    },
  });
  return (
    <Box className={classes.wrapper}>
      <Typography variant="h5">{i18n.t("profile.change_password")}</Typography>
      <form className={classes.formField} onSubmit={handleSubmit}>
        <div className={classes.inputWrapper}>
          <TextField
            className={classes.inputTextPassword}
            label={i18n.t("profile.old_password_label")}
            value={values.oldpassword}
            name="oldpassword"
            onChange={handleChange}
            error={touched.oldpassword && !!errors.oldpassword}
            helperText={errors.oldpassword}
            type="password"
          />
        </div>

        <div className={classes.inputWrapper}>
          <TextField
            className={classes.inputTextPassword}
            label={i18n.t("profile.password_label")}
            value={values.password}
            name="password"
            onChange={handleChange}
            error={touched.password && !!errors.password}
            helperText={errors.password}
            type="password"
          />
        </div>

        <Button
          type="submit"
          isLoading={updatePasswordLoading}
          className={classes.button}
          title={i18n.t("profile.change_btn")}
          variant="contained"
        />
      </form>
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
    </Box>
  );
};

export default ChangePasswordPage;
