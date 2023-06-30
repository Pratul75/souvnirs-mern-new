import { BellSvg, LightSvg, SettingsSvg, SunSvg } from "../../icons";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import Avatar from "../Avatar";
const Navbar = () => {
  return (
    <nav className=" p-2 bg-blue-50">
      {/* mobile-screen navbar */}
      <div className=" flex md:hidden justify-end ">
        <details className="dropdown dropdown-bottom dropdown-left ">
          <summary className="m-1 btn">
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
                <Avatar bgColor="bg-primary" initials="VB" />
                Profile
              </a>
            </li>
          </ul>
        </details>
      </div>

      {/* desktop-screen navbar */}
      <div className="w-full justify-between items-center hidden md:flex ">
        {/* left side of nav */}
        <div className="flex gap-2">
          <RxHamburgerMenu />
          <CiSearch />
        </div>

        {/* right side of nav */}
        <div className="flex  gap-2">
          <BellSvg />
          <LightSvg />
          <SettingsSvg />
          <SunSvg />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
