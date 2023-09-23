import { Carousel } from "antd";
import ProductCard from "../cards/ProductCard";
import { nanoid } from "nanoid";

const Carosal = ({ productList }) => (
  // * carosal not needed as the functionality of scroll is sufficient for the component
  // <Carousel autoplay className="my-8 hidden">
  <div className="flex flex-col h-[50vh] overflow-y-scroll md:h-full md:flex-row md:overflow-x-scroll mt-8">
    <div className="md:flex gap-4">
      {productList?.data?.slice(0, 25)?.map((product) => {
        return (
          <ProductCard
            image={product.coverImage}
            key={nanoid()}
            title={product.name}
            price={product.mrp}
            slug={product.slug}
            rating={4.0}
          />
        );
      })}
    </div>
  </div>
  // </Carousel>
);

export default Carosal;
