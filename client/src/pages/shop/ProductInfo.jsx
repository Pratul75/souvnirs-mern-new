import { IoMdArrowBack } from "react-icons/io";
import ProductImagePrimary from "../../assets/shop/productImages/productImagePrimary.png";
import { Link, useParams } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import { CiLogin } from "react-icons/ci";
import { Card, ProductsListWithFilters, Ratings, Tabs } from "../../components";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { productListFiltersAndProducts } from "../../mappings";
import API_WRAPPER from "../../api";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { debouncedShowToast } from "../../utils";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { toggleRefresh } from "../../features/appConfig/appSlice";

const ProductInfo = () => {
  const isLogged = localStorage.getItem("token");
  const [selectedImage, setSelectedImage] = useState();
  const [product, setProduct] = useState();
  const [slug, setSlug] = useState();
  const params = useParams();
  const [quantity, setQuantity] = useState(0);
  4;
  const dispatch = useDispatch();

  const tabs = [
    {
      label: "Description",
      content: product?.description && parse(product.description),
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
  const addToCart = async (e) => {
    e.preventDefault();
    if (quantity < 1) {
      return debouncedShowToast("quantity must be greater than 0");
    }
    console.log("triggered");
    const response = await API_WRAPPER.post("/cart/create", {
      productId: product._id,
      quantity,
    });
    dispatch(toggleRefresh());
  };

  const fetchProductData = async () => {
    const response = await API_WRAPPER.get(`/product/${slug}`);
    if (response.data) {
      setProduct(response.data);
      setSelectedImage(response.data.images[0]);
    }
  };
  console.log(product);
  console.log(product);
  useEffect(() => {
    // Set the slug parameter from the URL
    setSlug(params.slug);
  }, [params.slug]); // Add params.slug as a dependency

  useEffect(() => {
    // Fetch product data whenever the slug changes
    if (slug) {
      fetchProductData();
    }
  }, [slug]); // Add slug as a dependency

  return (
    <div className="mx-16 mt-4">
      <Link to={PATHS.landingPage} className="btn">
        <IoMdArrowBack className="text-2xl" />
        Back
      </Link>

      <div className="grid grid-cols-3 mt-4 gap-8">
        <div className="col-span-1">
          <img src={selectedImage} alt="primary image" />
          <div className="flex">
            {product?.images.map((image) => {
              return (
                <Card className="">
                  <img
                    onClick={() => {
                      setSelectedImage(image);
                    }}
                    src={image}
                    className="w-16 cursor-pointer hover:scale-110"
                    alt=""
                  />
                </Card>
              );
            })}
          </div>
        </div>
        <div className="col-span-1">
          <h1 className="font-bold text-2xl">{product?.name}</h1>
          <div
            className={`flex items-center ${
              !isLogged && "justify-between"
            } gap-4`}
          >
            <span className="text-4xl font-thin">USD</span>
            {isLogged ? (
              <span className="text-4xl">
                {product?.variants.length > 0
                  ? product?.variants[0].price
                  : product?.price}
              </span>
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
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
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
                {/* {product?.description} */}
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
              <button
                className="btn btn-primary mt-4 w-full"
                onClick={(e) => {
                  addToCart(e);
                }}
              >
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
      <ToastContainer />
    </div>
  );
};

export default ProductInfo;
