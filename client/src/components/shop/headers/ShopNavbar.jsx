import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { FaHeadphones } from "react-icons/fa";

const ShopNavbar = () => {
  return (
    <div className="mx-16 flex justify-between w-full border-[1px] bg-base-200">
      <div className="join">
        <button className="bg-primary rounded-none p-4 text-white flex items-center justify-between gap-2 px-8 join-item">
          <AiOutlineUnorderedList className="text-xl" />
          All Departments
          <BsChevronDown className="text-md ml-1" />
        </button>
        <button className="rounded-none  p-4 text-black flex justify-center gap-2  join-item">
          Home
        </button>
        <button className="rounded-none  p-4 text-black flex justify-center gap-2  join-item">
          About
        </button>
        <button className="rounded-none  p-4 text-black flex justify-center gap-2  join-item">
          Shop
        </button>
        <button className="rounded-none  p-4 text-black flex justify-center gap-2  join-item">
          Pages
        </button>
        <button className="rounded-none  p-4 text-black flex justify-center gap-2  join-item">
          Blog
        </button>
        <button className="rounded-none  p-4 text-black flex justify-center gap-2  join-item">
          Contact
        </button>
      </div>

      <div className="flex items-center">
        <div className="px-4 text-sm">Request Quote</div>
        <div className="border-l-[1px] flex items-center justify-between gap-4 px-4 border-base-300">
          <FaHeadphones className="text-primary text-4xl" />
          <div>
            <h5 className="text-xs">CALL US 24/7</h5>
            <h5 className="text-primary text-xs cursor-pointer">
              +00 123 456 789
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopNavbar;
