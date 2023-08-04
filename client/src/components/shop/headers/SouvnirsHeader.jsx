import SouvnirsLogoImage from "../../../assets/images/souvnirsLogo.png";
// souvnirs main header 
const SouvnirsHeader = () => {
  return (
    <header className="py-[32px]">
      <div className="flex justify-between items-center px-16">
        <div>
          <img src={SouvnirsLogoImage} alt="souvnirs logo" />
        </div>
        <div className="form-control">
          <input placeholder="Search" type="text" name="" id="" />
        </div>
        <div className="form-control">
          <input placeholder="Search" type="text" name="" id="" />
        </div>
      </div>
    </header>
  );
};

export default SouvnirsHeader;
