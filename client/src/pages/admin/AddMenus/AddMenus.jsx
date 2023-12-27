import { Card, Header } from "../../../components";
import API_WRAPPER from "../../../api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import { Button } from "antd";
import { IoMdArrowBack } from "react-icons/io";
// route -> /menu to get all menus
const AddMenus = () => {
  const navigate = useNavigate();
  const schema = yup
    .object({
      headerTitle: yup.string("header is required").required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const response = await API_WRAPPER.post("/menu/create", {
      title: data.headerTitle,
    });
    if (response.status === 200) {
      console.log("RESPONSE: ", response?.data);
      navigate(PATHS.adminAddMainMenus);
    }
  };

  return (
    <div>
      <Header
        heading="Add Menu Header"
        subheading="This sections provides ability to add various types of menu headers in the application"
      />

      <Card>
        <div className="p-4 mt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label htmlFor="headerTitle" className="label">
                <span className="label-text">Header Title</span>
              </label>
              <input
                {...register("headerTitle")}
                className="input input-primary"
                type="text"
                name="headerTitle"
                id="headerTitle"
              />
              <p className="text-rose-500">{errors?.headerTitle?.message}</p>
            </div>
            <Link onClick={() => navigate(-1)} className="btn mt-10 mr-4">
              <IoMdArrowBack
                className="text-2xl"
                style={{ fontSize: "13px" }}
              />
              Back
            </Link>
            <input className="btn btn-primary mt-4" type="submit" />
            <Link
              className="btn btn-secondary ml-4"
              to={PATHS.adminAddMainMenus}
            >
              I Already have Header
            </Link>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AddMenus;
