// login schema
import * as yup from "yup";

export const loginSchema = () => {
  return yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "minimum of 6 characters mandatory"),
  });
};

export const registerSchema = () => {
  return yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    mobile: yup.string().required("Mobile number is required"),
    checkbox1: yup.boolean().oneOf([true], "Please accept the T&C"),
  });
};
