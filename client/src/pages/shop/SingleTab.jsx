import { GoDot } from "react-icons/go";
import ShopPng from "../../assets/shop/cardImages/shopPng.png";

// import ProductCardMini from "../../components/shop/cards/ProductCardMini";
import { Ratings, ScrollAnimationWrapper } from "../../components";
import { ShopIcon } from "../../icons";
import { useNavigate } from "react-router-dom";
const SingleTab = ({ productsList, heading }) => {
  console.log("SingleTab.jsx", productsList);
  const navigate = useNavigate();
  return (
    <div>
      <div className="overflow-y-auto h-[600px] relative mt-4 flex-1  md:ml-10">
        <div className="flex gap-4 items-center border-b w-[325px] md:w-[470.94px]  sticky top-0 z-10 bg-white">
          <h1 className="font-semibold  border-b-4 border-shopPrimaryColor py-4 text-[27.37px] flex gap-4 items-center">
            <GoDot className="text-2xl text-shopPrimaryColor" />
            {heading}
          </h1>
        </div>
        {/* row 1 */}
        {productsList.map((product) => (
          <div
            onClick={() => {
              navigate(`/productInfo/${product.slug}`);
            }}
            className="cursor-pointer w-screen md:w-[470.94px] h-[125.92px] justify-start items-end inline-flex mt-8"
          >
            <div className="justify-start items-start flex">
              <img
                className="w-[122.01px] h-[122.01px]"
                src={product.coverImage}
              />
            </div>
            <div className="grow shrink basis-0 pl-[23.95px] pr-[31.93px] flex-col justify-start items-start  inline-flex">
              <div className="justify-center items-center inline-flex mt-5 ">
                <div className="text-neutral-700 text-lg font-medium leading-7 ">
                  {product.name}
                  <br />
                  XP
                </div>
              </div>

              <div className="h-[57.66px] pt-[4.56px] flex-col justify-start items-start flex w-full">
                <div className="text-violet-900 text-xl font-medium leading-tight">
                  ${product.price}
                </div>
                <div className="mt-2 flex items-center justify-between gap-4 cursor-pointer w-full">
                  <Ratings rating={4} />
                  <div className="px-4 py-2 border rounded-full ml-8">
                    <ShopIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleTab;
