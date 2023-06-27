import LoginBanner from "./RegisterPage";
import LoginForm from "./RegisterForm";

const LoginPage = () => {
  return (
    <div className="w-screen h-screen flex">
      <LoginBanner />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
