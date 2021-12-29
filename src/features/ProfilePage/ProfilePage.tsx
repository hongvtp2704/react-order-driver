import { FC, useState, useEffect } from "react";
import { TextField, Typography, Box, MenuItem } from "@material-ui/core";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { useTranslations } from "hooks";
import { editProfileSchema } from "schemas";

import { Button, Alert } from "components";

import styles from "./styles";
import { useDriverUpdate, useGetDriverById } from "api/auth";
import { DriverCreated } from "models";

const ProfilePage: FC = () => {
  const classes = styles();
  const { i18n } = useTranslations();
  const navigate = useNavigate();
  const driverId = sessionStorage.getItem("driver_id") as string;

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSucessMessage] = useState<string | null>(null);

  const [driverInfo, setDriverInfo] = useState<DriverCreated>();

  const { runRequest: fetchDriverById } = useGetDriverById({
    driverId,
    successCallback: (data) => {
      setDriverInfo(data.data);
    },
  });

  const { runRequest: updateDriverInfor, isLoading: updateDriverLoading } =
    useDriverUpdate({
      driverId,
      failureCallback: (err) => setErrorMessage(err.response?.data.message),
      successCallback: () => {
        setSucessMessage("Update successful");
      },
    });

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: driverInfo?.email || "",
      fullname: driverInfo?.fullname || "",
      phone: driverInfo?.phone || "",
      bike_number: driverInfo?.bike_number || "",
      address: driverInfo?.address || "",
      status: driverInfo
        ? driverInfo.status
          ? "active"
          : "inactive"
        : "inactive",
    },
    validationSchema: editProfileSchema,
    onSubmit: ({ email, fullname, phone, bike_number, address, status }) => {
      updateDriverInfor({
        email,
        fullname,
        phone,
        bike_number,
        address,
        status: status === "active" ? true : false,
      });
    },
  });

  useEffect(() => {
    fetchDriverById();
  }, []);

  return (
    <Box className={classes.wrapper}>
      <Typography variant="h5">
        {i18n.t("profile.profile_infomation")}
      </Typography>
      <form className={classes.formField} onSubmit={handleSubmit}>
        <div className={classes.inputWrapper}>
          <TextField
            className={classes.inputText}
            label={i18n.t("profile.username_label")}
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
            label={i18n.t("profile.fullname_label")}
            value={values.fullname}
            name="fullname"
            onChange={handleChange}
            error={touched.fullname && !!errors.fullname}
            helperText={errors.fullname}
          />
        </div>

        <div className={classes.inputWrapper}>
          <TextField
            className={classes.inputText}
            label={i18n.t("profile.phone_label")}
            value={values.phone}
            name="phone"
            onChange={handleChange}
            error={touched.phone && !!errors.phone}
            helperText={errors.phone}
          />
        </div>

        <div className={classes.inputWrapper}>
          <TextField
            className={classes.inputText}
            label={i18n.t("profile.bike_number_label")}
            value={values.bike_number}
            name="bike_number"
            onChange={handleChange}
            error={touched.bike_number && !!errors.bike_number}
            helperText={errors.bike_number}
          />
        </div>

        <div className={classes.inputWrapper}>
          <TextField
            className={classes.inputText}
            label={i18n.t("profile.address_label")}
            value={values.address}
            name="address"
            onChange={handleChange}
            error={touched.address && !!errors.address}
            helperText={errors.address}
          />
        </div>

        <div className={classes.inputWrapper}>
          <TextField
            className={classes.inputText}
            label={i18n.t("profile.status_label")}
            value={values.status}
            name="status"
            select
            onChange={handleChange}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        </div>

        <Button
          type="submit"
          isLoading={updateDriverLoading}
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
        onClose={() => setSucessMessage(null)}
      />
    </Box>
  );
};

export default ProfilePage;
