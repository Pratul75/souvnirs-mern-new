import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInput, Header } from "../../components";
import API_WRAPPER from "../../api";
import { debouncedShowToast } from "../../utils";
import { ToastContainer } from "react-toastify";

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

const AddVendor = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { confirmPassword, ...formData } = data;
    formData.password = confirmPassword;
    console.log("CUSTOMER FORM DATA: ", formData);
    try {
      const response = await API_WRAPPER.post(
        "/auth/register/vendor",
        formData
      );
      if (response.status === 200) {
        debouncedShowToast("Vendor added successfully", "success");
      }
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };

  return (
    <div>
      <Header
        heading="Add Vendor"
        subheading="This page is to add an end vendor to the database. It will provide all the necessary details to create a vendor"
      />
      <form
        className="mt-4 p-4 grid grid-cols-2 gap-4 bg-base-100 rounded-xl border-[1px] border-base-300"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          label={"First Name"}
          name={"firstName"}
          control={control}
          errors={errors}
          type="text"
        />
        <FormInput
          label={"Last Name"}
          name={"lastName"}
          control={control}
          errors={errors}
          type="text"
        />
        <FormInput
          label={"Email"}
          name={"email"}
          control={control}
          errors={errors}
          type="email"
        />
        <FormInput
          label={"Mobile"}
          name={"mobile"}
          control={control}
          errors={errors}
          type="tel"
        />
        <FormInput
          label={"Password"}
          name={"password"}
          control={control}
          errors={errors}
          type="password"
        />
        <FormInput
          label={"Confirm Password"}
          name={"confirmPassword"}
          control={control}
          errors={errors}
          type="password"
        />
        <FormInput
          label={"Organisation Name"}
          name={"organizationName"}
          control={control}
          errors={errors}
          type="text"
        />
        <FormInput
          label={"Organisation Type"}
          name={"organizationType"}
          control={control}
          errors={errors}
          type="text"
        />
        <FormInput
          label={"Country"}
          name={"country"}
          control={control}
          errors={errors}
          type="text"
        />
        <FormInput
          label={"City"}
          name={"city"}
          control={control}
          errors={errors}
          type="text"
        />
        <FormInput
          label={"Pin Code"}
          name={"pincode"}
          control={control}
          errors={errors}
          type="text"
        />
        <button type="submit" className="col-span-2 btn btn-primary">
          Add Vendor
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddVendor;
