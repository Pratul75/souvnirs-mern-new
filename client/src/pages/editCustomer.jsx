import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInput, Header } from "../components";
import API_WRAPPER from "../api";
import { debouncedShowToast } from "../utils";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PATHS } from "../Routes/paths";
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

const EditCustomer = () => {
  const [formData, setFormData] = useState();
  const params = useParams();
  console.log("editCustomer.jsx", params);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const navigate = useNavigate();

  const updateCustomer = async () => {
    const response = await API_WRAPPER.put(
      `/customers/update-customer/:${params.id}`,
      formData
    );
    if (response) {
      navigate(PATHS.adminCustomer);
    }
  };
  console.log("editCustomer.jsx", formData);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const fetchCustomer = async () => {
    const response = await API_WRAPPER.get(
      `/customers/get-customer/:${params.id}`
    );
    console.log("editCustomer.jsx", response);
    setFormData(response.data.customer);
  };
  console.log("editCustomer.jsx", formData);
  const onSubmit = async (data) => {
    const { confirmPassword, ...formData } = data;
    formData.password = confirmPassword;
    console.log("CUSTOMER FORM DATA: ", formData);
    try {
      const response = await API_WRAPPER.post(
        "/auth/register/customer",
        formData
      );
      if (response.status === 200) {
        debouncedShowToast("Customer added successfully", "success");
      }
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };
  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
    <div>
      <Header
        heading="Edit Customer"
        subheading="This page is to add an end customer to the database. It will provide all the necessary details to create a customer"
      />
      <form className="mt-4 p-4 grid grid-cols-2 gap-4 bg-base-100 rounded-xl border-[1px] border-base-300">
        <div className="form-control col-span-1">
          <label htmlFor="firstName" className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            className="input input-accent"
            id="name"
            name="firstName"
            value={formData?.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control col-span-1">
          <label htmlFor="lastName" className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            className="input input-accent"
            id="name"
            name="lastName"
            value={formData?.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control col-span-1">
          <label htmlFor="email" className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            className="input input-accent"
            id="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control col-span-1">
          <label htmlFor="mobile" className="label">
            <span className="label-text">Mobile</span>
          </label>
          <input
            className="input input-accent"
            id="mobile"
            name="mobile"
            value={formData?.mobile}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control col-span-1">
          <label htmlFor="password" className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            className="input input-accent"
            id="password"
            name="password"
            // value={formData?.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control col-span-1">
          <label htmlFor="password" className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            className="input input-accent"
            id="password"
            name="confirmPassword"
            value={formData?.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control col-span-1">
          <label htmlFor="password" className="label">
            <span className="label-text">ORganization Name</span>
          </label>
          <input
            type="text"
            className="input input-accent"
            id="password"
            name="organizationName"
            value={formData?.organizationName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control col-span-1">
          <label htmlFor="password" className="label">
            <span className="label-text">Organization Type</span>
          </label>
          <input
            type="text"
            className="input input-accent"
            id="password"
            name="organizationType"
            value={formData?.organizationType}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control col-span-1">
          <label htmlFor="password" className="label">
            <span className="label-text">Country</span>
          </label>
          <input
            type="text"
            className="input input-accent"
            id="password"
            name="country"
            value={formData?.country}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control col-span-1">
          <label htmlFor="password" className="label">
            <span className="label-text">City</span>
          </label>
          <input
            type="text"
            className="input input-accent"
            id="password"
            name="city"
            value={formData?.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control col-span-1">
          <label htmlFor="password" className="label">
            <span className="label-text">PinCode</span>
          </label>
          <input
            type="text"
            className="input input-accent"
            id="password"
            name="pincode"
            value={formData?.pincode}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="button"
          onClick={updateCustomer}
          className="col-span-2 btn btn-primary"
        >
          Update Customer
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditCustomer;
