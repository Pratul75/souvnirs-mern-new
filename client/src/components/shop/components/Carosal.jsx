import { Carousel } from "antd";
import ProductCard from "../cards/ProductCard";
import { nanoid } from "nanoid";

const Carosal = ({ productList }) => (
  <Carousel autoplay className="my-8 hidden">
    <div>
      <h3 className="flex gap-4">
        {productList?.data?.slice(0, 5)?.map((product) => {
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
      </h3>
    </div>
    <div>
      <h3 className="flex gap-4">
        {productList?.data?.slice(6, 11)?.map((product) => {
          return (
            <ProductCard
              image={product.coverImage}
              key={nanoid()}
              title={product.name}
              price={product.mrp}
              slug={product.slug}
              rating={3.5}
            />
          );
        })}
      </h3>
    </div>
    <div>
      <h3 className="flex gap-4">
        {productList?.data?.slice(12, 17)?.map((product) => {
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
      </h3>
    </div>
    <div>
      <h3 className="flex gap-4">
        {productList?.data?.slice(18, 23)?.map((product) => {
          return (
            <ProductCard
              image={product.coverImage}
              key={nanoid()}
              title={product.name}
              price={product.mrp}
              slug={product.slug}
              rating={4.5}
            />
          );
        })}
      </h3>
    </div>
  </Carousel>
);

export default Carosal;
