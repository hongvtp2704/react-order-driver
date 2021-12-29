import * as yup from "yup";

export const signInSchema = yup.object({
  email: yup.string().email().required("Email is required!"),
  password: yup
    .string()
    .min(6, "Password must be more than 6 characters")
    .required("Password is required!"),
});
