import { Carousel } from "antd";
import ProductCard from "../cards/ProductCard";
import { nanoid } from "nanoid";
import { useRef, useState, useEffect } from "react";
import API_WRAPPER, { baseUrl } from "../../../api";

const Carosal = ({ productList }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollLeft -= 400; // Adjust the scroll distance as needed
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollLeft += 400; // Adjust the scroll distance as needed
  };
  console.log("productList====>", productList);

  return (
    <div className="carosal-container mt-8">
      <div
        ref={scrollContainerRef}
        className="flex flex-col h-[50vh] overflow-y-scroll md:h-full md:flex-row md:overflow-x-scroll mt-8"
      >
        <div className="md:flex gap-4">
          {productList?.data?.map((product) => {
            return (
              <ProductCard
                id={product?._id}
                image={product.coverImage}
                key={nanoid()}
                title={product.name}
                price={
                  product?.price
                    ? product?.price
                    : (product?.result && product?.result?.length > 0)
                    ? product?.result[0]?.price
                    : 0 || 0
                }
                slug={product.slug}
                rating={4.0}
              />
            );
          })}
        </div>
      </div>
      <div className="md:flex gap-4">
        {" "}
        {/**style={{ justifyContent: "space-between" }} */}
        <button
          type="button"
          class="text-black rounded-l-md border-r border-gray-100 py-2 hover:bg-blue-700 hover:text-white px-3"
          onClick={scrollLeft}
        >
          <svg
            class="w-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <button
          type="button"
          class=" text-black rounded-r-md py-2 border-l border-gray-200 hover:bg-blue-700 hover:text-white px-3"
          onClick={scrollRight}
        >
          <svg
            class="w-5 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Carosal;
