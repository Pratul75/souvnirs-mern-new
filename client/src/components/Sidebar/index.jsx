import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import SovniersLogo from "../../assets/images/souvnirsLogo.png";
import { toggleSidebar } from "../../features/appConfig/appSlice";
import { SouvnirsMobileLogo } from "../../icons";
const Sidebar = () => {
  const dispatch = useDispatch();
  const isExpanded = useSelector((state) => state.appConfig.sidebarExpanded);
  return (
    <>
      {/* desktop sidebar */}
      <div
        className={`w-16 md:border-r-[1px]  border-gray-500 hidden md:block bg-blue-50 h-screen ${
          isExpanded ? "lg:w-96" : "lg:w-28"
        } transition-all duration-500`}
      >
        {/* Collapsed State */}
        <div
          className={` flex justify-center items-center mt-4 ${
            isExpanded ? "hidden" : "block"
          }`}
        >
          <SouvnirsMobileLogo />
        </div>

        {/* Expanded State */}
        <div className={` ${isExpanded ? "block" : "hidden"}`}>
          <div className="flex items-center justify-center pt-4">
            {/* Add your expanded sidebar content here */}
            {isExpanded ? <img src={SovniersLogo} alt="" /> : "logo"}
          </div>
        </div>
      </div>

      {/* mobile view */}

      <nav
        className={`w-[50%] md:hidden h-screen  ${
          isExpanded ? "translate-x-0" : " translate-x-[-100%]"
        } absolute bg-teal-600 transition-all duration-300`}
      >
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="absolute top-5 right-5 text-white"
        >
          <AiOutlineClose />
        </button>
      </nav>
    </>
  );
};

export default Sidebar;
