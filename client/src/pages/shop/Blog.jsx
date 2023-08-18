import Banner from "./Banner";
import ShopBanner from "../../assets/shop/bannerImages/shopBanner.png";
import { CiHeadphones } from "react-icons/ci";
import { TfiGame } from "react-icons/tfi";
import { LiaChromecast, LiaPuzzlePieceSolid } from "react-icons/lia";
import { BsCamera } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaVolleyballBall } from "react-icons/fa";
import { RiComputerLine } from "react-icons/ri";
import BlogImagePng from "../../assets/shop/blogImages/blogImage.png";

const Blog = () => {
  return (
    <div>
      <Banner text={"Blog"} navigation={"Home/Blog"} bannerImage={ShopBanner} />
      <div className="mx-32 grid grid-cols-4 grid-rows-4 gap-4 mt-16">
        <div className="col-span-1 row-span-1 bg-base-100 rounded-xl border p-4">
          <h1 className="text-2xl mx-4">Category</h1>
          <hr className="my-2" />
          <div>
            <ul className="menu-title">
              <li className="cursor-pointer flex gap-4 pb-4 mb-4 border-b">
                <CiHeadphones className="text-2xl" />
                <h6>Headphones (32)</h6>
              </li>
              <li className="cursor-pointer flex gap-4 pb-4 mb-4 border-b">
                <TfiGame className="text-2xl" />
                <h6>Video Game (12)</h6>
              </li>
              <li className="cursor-pointer flex gap-4 pb-4 mb-4 border-b">
                <LiaChromecast cursor-pointer className="text-2xl" />
                <h6>Portable Speakers (19)</h6>
              </li>
              <li className="cursor-pointer flex gap-4 pb-4 mb-4 border-b">
                <BsCamera className="text-2xl" />
                <h6>Digital Camera (25)</h6>
              </li>
              <li className="cursor-pointer flex gap-4 pb-4 mb-4 border-b">
                <AiOutlineClockCircle className="text-2xl" />
                <h6>Gadgets (15)</h6>
              </li>
              <li className="cursor-pointer flex gap-4 pb-4 mb-4 border-b">
                <FaVolleyballBall className="text-2xl" />
                <h6>Home Appliances (45)</h6>
              </li>
              <li className="cursor-pointer flex gap-4 pb-4 mb-4 border-b">
                <LiaPuzzlePieceSolid className="text-2xl" />
                <h6>Audio Record (25)</h6>
              </li>
              <li className="cursor-pointer flex gap-4 pb-43 mb-4">
                <RiComputerLine className="text-2xl" />
                <h6>Computer (19)</h6>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-3 row-span-4 ">
          <img className="w-full object-cover" src={BlogImagePng} alt="" />
          <div className="px-8">
            <div className="flex gap-8 mt-4">
              <span>4 March, 2022</span>
              <span>290 views</span>
            </div>

            <div>
              <h1 className="text-2xl font-semibold my-4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              </h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Commodi placeat hic repudiandae? Quia recusandae enim dolor
                saepe voluptas rerum velit quas, atque, necessitatibus itaque
                quisquam. Ducimus sapiente atque nihil rem ad eaque autem quod
                numquam molestias recusandae minus, rerum reprehenderit vero
                corrupti dignissimos veritatis odit vel at adipisci tenetur!
                Tempora sit modi voluptatibus, animi placeat veritatis
                perferendis. Pariatur quaerat consectetur architecto illo
                deserunt, minima saepe, corporis maiores, nihil amet vitae.
                Harum rem voluptatum repudiandae commodi ea autem, distinctio,
                eaque, quasi atque mollitia magni sequi? Nobis accusantium et
                labore, debitis odio in laborum, pariatur illum deserunt
                asperiores veniam sunt saepe fugiat?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
