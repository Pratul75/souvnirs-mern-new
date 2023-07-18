import LoginBanner from "../RegisterPage/RegisterBanner";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="w-screen h-screen flex">
      <LoginBanner />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
