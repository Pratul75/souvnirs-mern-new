import { IoMdArrowBack } from "react-icons/io";
import ProductImagePrimary from "../../assets/shop/productImages/productImagePrimary.png";
import { Link, useParams } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import { CiLogin } from "react-icons/ci";
import { ProductsListWithFilters, Ratings, Tabs } from "../../components";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { productListFiltersAndProducts } from "../../mappings";
import API_WRAPPER from "../../api";
import { useEffect, useState } from "react";

const ProductInfo = () => {
  const isLogged = localStorage.getItem("token");
  const [product, setProduct] = useState();
  const params = useParams();
  console.log(params);

  const tabs = [
    {
      label: "Description",
      content: (
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          quo numquam quae dolorum, quam quasi suscipit illum nemo nobis unde
          commodi soluta error exercitationem ab nostrum sequi pariatur
          provident voluptatum!
        </p>
      ),
    },
    {
      label: "Specification",
      content: (
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          repellendus dolorum tenetur laborum recusandae iure exercitationem
          quis possimus vel atque nam quidem ut nobis, iusto nemo, magni
          asperiores suscipit. Quae? Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Laboriosam similique, repellat necessitatibus cum
          cumque ex excepturi aliquid optio ipsa eligendi beatae impedit
          recusandae! Omnis ipsum voluptatem possimus tenetur itaque esse?
        </p>
      ),
    },
    {
      label: "Review",
      content: (
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          repellendus dolorum tenetur laborum recusandae iure exercitationem
          quis possimus vel atque nam quidem ut nobis, iusto nemo, magni
          asperiores suscipit. Quae?
        </p>
      ),
    },
  ];

  const fetchProductData = async () => {
    await API_WRAPPER.get(`/product/${slug}`);
  };
  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <div className="mx-16 mt-4">
      <Link to={PATHS.landingPage} className="btn">
        <IoMdArrowBack className="text-2xl" />
        Back
      </Link>

      <div className="grid grid-cols-3 mt-4 gap-8">
        <div className="col-span-1">
          <img src={ProductImagePrimary} alt="primary image" />
        </div>
        <div className="col-span-1">
          <h1 className="font-bold text-2xl">
            Android Television Super Salon New DGT -256
          </h1>
          <div
            className={`flex items-center ${
              !isLogged && "justify-between"
            } gap-4`}
          >
            <span className="text-4xl font-thin">USD</span>
            {isLogged ? (
              <span className="text-4xl">400</span>
            ) : (
              <Link to={PATHS.login} className="join cursor-pointer">
                <div className="bg-base-200 join-item flex items-center px-2">
                  <span className="text-sm">
                    To revel price please signin/sign up
                  </span>
                </div>
                <div className="p-4 join-item bg-primary">
                  <CiLogin className="text-2xl text-white" />
                </div>
              </Link>
            )}
          </div>
          <div className="flex gap-4 my-2">
            <Ratings rating={3} />
            <p>(1 Review)</p>
          </div>

          <form className="grid grid-cols-2 gap-2">
            <div className="col-span-1">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Quantity</span>
                </label>
                <input
                  className="input input-bordered"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Color</span>
                </label>
                <select className="select select-bordered">
                  <option value="Black">Black</option>
                </select>
              </div>
              <button className="btn  mt-4 w-full">Get Quote</button>
            </div>
            <div className="col-span-1">
              <div className="text-xs mt-7 bg-base-200 rounded-xl px-2 py-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia accusamus
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Size (inch)</span>
                </label>
                <input
                  className="input input-bordered"
                  type="text"
                  placeholder="4*3*7"
                />
              </div>
              <button className="btn btn-primary mt-4 w-full">
                <AiOutlineShoppingCart className="text-2xl text-white" />
                Add To Cart
              </button>
            </div>
          </form>
        </div>
        <div className="col-span-1 border-l flex flex-col items-center justify-center px-4">
          <p className="text-start py-4">Ongoing Offers!</p>
          <div className="gap-4 flex flex-col">
            <div className="join">
              <div className="flex justify-center items-center bg-primary text-white font-bold join-item w-full">
                FLAT $250 OFF
              </div>
              <div className="text-center bg-base-200 p-4 join-item">
                <span>
                  Flat $250 off on minimum merchendise value $999! Use code
                  <span className="text-primary font-bold">FEST250</span>
                </span>
              </div>
            </div>
            <div className="join">
              <div className="flex justify-center items-center bg-primary text-white font-bold join-item w-full">
                FLAT $250 OFF
              </div>
              <div className="text-center bg-base-200 p-4 join-item">
                <span>
                  Flat $250 off on minimum merchendise value $999! Use code
                  <span className="text-primary font-bold">FEST250</span>
                </span>
              </div>
            </div>
          </div>
          <div className="my-2 border-b w-full">
            <span className="text-xs font-bold text-primary">
              Get to know how to reduce fright cost
            </span>
          </div>
          <div className="py-4">
            <p className="font-thin text-primary text-xs underline">
              Check Sample Availablity
            </p>
          </div>
        </div>
      </div>
      <Tabs tabs={tabs} alignCenter />

      <ProductsListWithFilters
        heading="Top Seasonal Gifts"
        filters={productListFiltersAndProducts.filters}
        products={productListFiltersAndProducts.products}
      />
    </div>
  );
};

export default ProductInfo;
