import * as yup from "yup";

export const editProfileSchema = yup.object({
  email: yup.string().email().required("Email is required!"),
  fullname: yup
    .string()
    .min(3, "Fullname must be more than 6 characters")
    .required("Fullname is required!"),
  phone: yup
    .string()
    .matches(
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      "Invalid phone number"
    )
    .required("Phone number is required"),
  bike_number: yup.string().required("Bike number is required"),
  address: yup
    .string()
    .min(20, "Address must be more than 20 characters")
    .required("Address is required"),
});
