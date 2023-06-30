import { BellSvg, LightSvg, SettingsSvg, SunSvg } from "../../icons";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import Avatar from "../Avatar";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../features/appConfig/appSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <nav className=" p-4 bg-[#F8F9FAB2]">
      {/* mobile-screen navbar */}
      <div className=" flex  md:hidden justify-between place-items-center ">
        <RxHamburgerMenu onClick={() => dispatch(toggleSidebar())} />
        <details className="dropdown dropdown-bottom dropdown-left ">
          <summary className="btn">
            <BsThreeDotsVertical />
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
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
      <div className="w-full justify-between items-center hidden md:flex ">
        {/* left side of nav */}
        <div className="flex gap-8">
          <RxHamburgerMenu
            className="text-2xl cursor-pointer"
            onClick={() => dispatch(toggleSidebar())}
          />
          <CiSearch className="text-2xl cursor-pointer" />
        </div>

        {/* right side of nav */}
        <div className="flex  gap-4">
          <BellSvg />
          <LightSvg />
          <SettingsSvg />
          <SunSvg />
          <Avatar bgColor={"bg-info"} initials="VB" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
