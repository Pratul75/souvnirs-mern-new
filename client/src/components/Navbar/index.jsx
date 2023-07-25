import { BellSvg, LightSvg, SettingsSvg, SunSvg } from "../../icons";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import Avatar from "../Avatar";
import SovniersLogo from "../../assets/images/souvnirsLogo.png";
import { useDispatch } from "react-redux";
import {
  toggleSidebar,
  toggleDarkMode,
  getLoginInfo,
} from "../../features/appConfig/appSlice";
import RouteNavigator from "../RouterNavigator";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";

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
      {/* desktop-screen navbar */}
      <div className="w-screen bg-base-300 justify-between items-center hidden py-4 px-8 md:flex">
        {/* left side of nav */}
        <div className="flex items-center gap-8">
          <img src={SovniersLogo} alt="" />
          {/* <RxHamburgerMenu
            className="text-2xl cursor-pointer"
            onClick={() => dispatch(toggleSidebar())}
          /> */}
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
