import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import API_WRAPPER from "../../../api";
import { debouncedShowToast } from "../../../utils";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup.string().required("Mobile number is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  organizationName: yup.string().required("Organization name is required"),
  organizationType: yup.string().required("Organization type is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  pincode: yup.string().required("Pincode is required"),
});

const useAddVendor = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    const { confirmPassword, ...formData } = data;
    formData.password = confirmPassword;
    console.log("CUSTOMER FORM DATA: ", formData);
    try {
      const response = await API_WRAPPER.post(
        "/auth/register/vendor",
        formData
      );
      if (response.status === 200) {
        setLoading(false);
        navigate("/admin/vendor");
        debouncedShowToast("Vendor added successfully", "success");
      }
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };
  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    loading
  };
};

export default useAddVendor;
