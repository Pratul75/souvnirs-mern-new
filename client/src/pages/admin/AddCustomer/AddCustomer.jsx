import { FormInput, Header } from "../../../components";
import { ToastContainer } from "react-toastify";
import useAddCustomer from "./useAddCustomer";

const AddCustomer = () => {
  const { control, errors, handleSubmit, onSubmit, loading } = useAddCustomer();
  return (
    <div>
      <Header
        heading="Add Customer"
        subheading="This page is to add an end customer to the database. It will provide all the necessary details to create a customer"
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
          {loading ? "Loading..." : "Add Customer"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddCustomer;
