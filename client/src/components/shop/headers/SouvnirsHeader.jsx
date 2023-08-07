import SouvnirsLogoImage from "../../../assets/images/souvnirsLogo.png";
import { AiOutlineHeart } from "react-icons/ai";
import { PiBag } from "react-icons/pi";
import { Link } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import { CiSearch } from "react-icons/ci";

// souvnirs main header
const SouvnirsHeader = ({ badgeColor, buttonColor }) => {
  return (
    <header className="py-[32px]">
      <div className="flex justify-between items-center px-16">
        <div>
          <img src={SouvnirsLogoImage} alt="souvnirs logo" />
        </div>
        <div className="join">
          <div>
            <div>
              <input
                className="input w-96 input-bordered join-item rounded-none"
                placeholder="Search products"
              />
            </div>
          </div>
          <select className="select select-bordered join-item">
            <option disabled selected>
              Filter
            </option>
            <option>Sci-fi</option>
            <option>Drama</option>
            <option>Action</option>
          </select>
          <div className="indicator">
            <button className={`btn ${buttonColor} join-item rounded-none`}>
              <CiSearch color="white" className="text-2xl" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to={PATHS.login}>Login</Link>
          <Link to={PATHS.register}>Register</Link>|
          <AiOutlineHeart className="text-2xl cursor-pointer" />
          <div className="indicator">
            <div
              className={`indicator-item badge ${badgeColor} badge-xs absolute p-2`}
            >
              1
            </div>
            <PiBag className="text-2xl cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default SouvnirsHeader;
