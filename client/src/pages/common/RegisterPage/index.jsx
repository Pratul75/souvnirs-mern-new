import RegisterBanner from "./RegisterBanner";
import RegisterForm from "./RegisterForm";

const LoginPage = () => {
  return (
    <div className="w-screen h-screen flex">
      <RegisterBanner />
      <RegisterForm />
    </div>
  );
};

export default LoginPage;
