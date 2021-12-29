import * as yup from "yup";

export const changePasswordSchema = yup.object({
  oldpassword: yup.string().required("Old password is required!"),
  password: yup
    .string()
    .min(6, "Password must be more than 6 characters")
    .required("Password is required!"),
});
