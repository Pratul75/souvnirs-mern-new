import { FormProvider, useForm } from "react-hook-form";
import TextInput from "./TextInput";
const Form = () => {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TextInput
          label="Name"
          name="name"
          rules={{ required: "Name is required" }}
          placeholder="Please Enter"
          isRequired={false}
        />
        <TextInput
          label="Name"
          name="name"
          rules={{ required: "Name is required" }}
          placeholder="Please Enter"
          isRequired={true}
        />
      </form>
    </FormProvider>
  );
};

export default Form;
