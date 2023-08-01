import { BellSvg, LightSvg, SettingsSvg, SunSvg } from "../../icons";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import Avatar from "../Avatar";
import { useDispatch } from "react-redux";
import {
  toggleSidebar,
  toggleDarkMode,
  getLoginInfo,
} from "../../features/appConfig/appSlice";
import RouteNavigator from "../RouterNavigator";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../Routes/paths";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(getLoginInfo(""));
    navigate(PATHS.login);
  };

  return (
    <nav className="">
      {/* mobile-screen navbar */}
      <div className="flex md:hidden justify-between place-items-center">
        <RxHamburgerMenu onClick={() => dispatch(toggleSidebar())} />
        <details className="dropdown dropdown-bottom dropdown-left">
          <summary className="btn">
            <BsThreeDotsVertical />
          </summary>
          <ul className="p-2 shadow  dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li>
              <a>
                <BellSvg />
                Bell
              </a>
            </li>
            <li>
              <a>
                <LightSvg />
                Electricity
              </a>
            </li>
            <li>
              <a>
                <SettingsSvg />
                Settings
              </a>
            </li>
            <li>
              <a>
                <SunSvg />
                Mode
              </a>
            </li>
            <li>
              <a>
                <Avatar bgColor="bg-info" initials="VB" />
                Profile
              </a>
            </li>
          </ul>
        </details>
      </div>

      {/* desktop-screen navbar */}
      <div className="w-full bg-base-300 justify-between items-center hidden py-4 px-8 md:flex">
        {/* left side of nav */}
        <div className="flex gap-8">
          <RxHamburgerMenu
            className="text-2xl cursor-pointer"
            onClick={() => dispatch(toggleSidebar())}
          />
          <RouteNavigator />
        </div>
        {/* right side of nav */}
        <div className="flex gap-4">
          <span className="cursor-pointer">
            <BellSvg />
          </span>
          <span className="cursor-pointer animate-pulse">
            <LightSvg />
          </span>
          <span className="cursor-pointer">
            <SettingsSvg />
          </span>
          <span
            onClick={() => dispatch(toggleDarkMode())}
            className="cursor-pointer"
          >
            <SunSvg className={"animate-spin"} />
          </span>
          <Avatar
            onClick={() => handleLogout()}
            bgColor={"bg-info"}
            initials="VB"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
