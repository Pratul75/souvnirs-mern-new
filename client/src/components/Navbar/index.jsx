import { BellSvg, SunSvg } from "../../icons";
import { RxHamburgerMenu } from "react-icons/rx";
import Avatar from "../Avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleSidebar,
  toggleMobileSidebar,
  toggleDarkMode,
  getLoginInfo,
} from "../../features/appConfig/appSlice";
import RouteNavigator from "../RouterNavigator";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { CgDarkMode } from "react-icons/cg";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sidebarState = useSelector((x) => x.appConfig.sidebarExpanded);
  const darkModeToggle = useSelector((x) => x.appConfig.darkMode);
  const handleLogout = () => {
    localStorage.clear();
    dispatch(getLoginInfo(""));
    navigate(PATHS.login);
  };

  return (
    <nav className="w-full">
      {/* desktop-screen navbar */}
      <div className="bg-base-200 justify-between items-center hidden py-4 px-8 md:flex">
        {/* left side of nav */}
        <div className="flex items-center gap-8">
          {sidebarState ? (
            <AiOutlineLock
              className="text-2xl cursor-pointer"
              onClick={() => dispatch(toggleSidebar())}
            />
          ) : (
            <AiOutlineUnlock
              className="text-2xl cursor-pointer"
              onClick={() => dispatch(toggleSidebar())}
            />
          )}
          <RouteNavigator />
        </div>
        {/* right side of nav */}
        <div className="flex gap-4">
          <span className="cursor-pointer">
            <BellSvg />
          </span>
          <span
            onClick={() => dispatch(toggleDarkMode())}
            className="cursor-pointer"
          >
            {darkModeToggle ? (
              <CgDarkMode className="animate-spin text-3xl" />
            ) : (
              <SunSvg className={"animate-spin"} />
            )}
          </span>

          <div className="dropdown dropdown-left dropdown-bottom cursor-pointer">
            <label tabIndex={0}>
              <Avatar bgColor={"bg-info"} initials="VB" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>View Profile</a>
              </li>
              <li onClick={() => handleLogout()}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* mobile-screen navbar */}
      <div className="bg-base-200 py-4 px-4 md:hidden flex justify-between items-center">
        <RxHamburgerMenu
          className="text-3xl cursor-pointer"
          onClick={() => dispatch(toggleMobileSidebar())}
        />
        <div className="flex gap-4">
          <span className="cursor-pointer">
            <BellSvg />
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
