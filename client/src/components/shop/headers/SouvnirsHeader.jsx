import SouvnirsLogoImage from "../../../assets/images/souvnirsLogo.png";
import { AiOutlineHeart } from "react-icons/ai";
import { PiBag } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import { CiSearch } from "react-icons/ci";
import { RiDashboardLine } from "react-icons/ri";

// souvnirs main header
const SouvnirsHeader = ({ badgeColor, buttonColor }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  return (
    <header className="py-[32px]">
      <div className="flex justify-between items-center px-16">
        <Link to={PATHS.landingPage} className="cursor-pointer">
          <img src={SouvnirsLogoImage} alt="souvnirs logo" />
        </Link>
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
          {token ? (
            <div className="flex gap-4">
              {/* TODO: need to add condition for user and vendor login as well */}
              <div className="tooltip tooltip-bottom" data-tip="dashboard">
                <Link
                  to={PATHS.adminDashboard}
                  className="btn btn-primary btn-square btn-sm"
                >
                  <RiDashboardLine className="text-2xl" />
                </Link>
              </div>
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate(PATHS.login);
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to={PATHS.login}>Login</Link>
              <Link to={PATHS.register}>Register</Link>|
            </>
          )}

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
