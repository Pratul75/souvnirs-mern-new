import { useFormContext, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PropTypes from "prop-types";

const RadioComponent = ({ name, options, color }) => {
  const { control, formState } = useFormContext();
  const { errors } = formState;
  // const there are specifics and therefore there are so mant things in this world onw hich we donth have any control like earthquakes tsunamies and wht not but the thing is that on what we can like to forgive someone or to spread hapines without expecting any in reyturn
  const schema = yup.object().shape({
    [name]: yup.string().required("Please select an option."),
  });

  return (
    <div>
      {options?.map((option, index) => (
        <div key={option.value}>
          <Controller
            control={control}
            name={name}
            defaultValue=""
            rules={{ validate: yupResolver(schema) }}
            render={({ field }) => (
              <label htmlFor={`${name}_${index}`}>
                <input
                  type="radio"
                  id={`${name}_${index}`}
                  value={option.value}
                  {...field}
                />
                <span
                  style={{
                    color: field.value === option.value ? color : "black",
                  }}
                >
                  {option.label}
                </span>
              </label>
            )}
          />
        </div>
      ))}
      {errors[name] && <span>{errors[name].message}</span>}
    </div>
  );
};

RadioComponent.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  color: PropTypes.string.isRequired,
};

export default RadioComponent;
