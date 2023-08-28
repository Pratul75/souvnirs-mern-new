const Banner = ({ bannerImage, text, navigation }) => {
  return (
    <div className=" w-full h-96 relative mt-8">
      <div>
        <div className="inset-0 absolute top-[150px] left-1/4 z-[40]">
          <h1 className="text-4xl">{text}</h1>
          <p className="text-primary font-bold">{navigation}</p>
        </div>
        <img
          className="absolute right-0 left-0 top-0 bottom-0 rounded-xl"
          src={bannerImage}
          alt="bannerImage"
        />
      </div>
    </div>
  );
};

export default Banner;
