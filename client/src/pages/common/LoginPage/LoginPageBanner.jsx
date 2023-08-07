import LoginBannerImage from "../../assets/images/registerBannerImage.png";

const LoginPageBaner = () => {
  return (
    <div className="hidden  w-1/2">
      <img
        className="object-cover w-full h-full"
        src={LoginBannerImage}
        alt="login banner"
      />
    </div>
  );
};

export default LoginPageBaner;
