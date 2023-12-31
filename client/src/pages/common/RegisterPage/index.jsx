import { ToastContainer } from "react-toastify";
import RegisterBanner from "./RegisterBanner";
import RegisterForm from "./RegisterForm";

const LoginPage = () => {
  return (
    <div className="w-screen h-screen flex">
      <RegisterBanner className="d" />
      <RegisterForm />
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
