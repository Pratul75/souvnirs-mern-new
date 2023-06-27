import { FormProvider, useForm } from "react-hook-form";
import TextInput from "./TextInput";
import RadioButton from "./RadioButton";
const Form = () => {
  const methods = useForm();

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

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
