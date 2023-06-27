import LoginBannerImg from "../../assets/images/registerBannerImage.png";

const LoginBanner = () => {
  return (
    <div className="hidden md:flex w-1/2">
      <img
        className="object-cover w-full h-full"
        src={LoginBannerImg}
        alt="Login Banner"
      />
    </div>
  );
};

export default LoginBanner;
