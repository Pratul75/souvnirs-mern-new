import LoginBannerImg from "../../assets/images/registerBannerImage.png";

const RegisterBanner = () => {
  return (
    <div className="hidden md:flex md:w-full">
      <img
        className="object-cover w-full h-full"
        src={LoginBannerImg}
        alt="Login Banner"
      />
    </div>
  );
};

export default RegisterBanner;
