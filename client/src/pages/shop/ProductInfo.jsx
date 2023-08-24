import { IoMdArrowBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
import { nanoid } from "nanoid";
const ProductInfo = () => {
  const isLogged = localStorage.getItem("token");
  const [selectedImage, setSelectedImage] = useState();
  const [product, setProduct] = useState();
  const [slug, setSlug] = useState();
  const params = useParams();
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [variantFilters, setVariantFilters] = useState();
  const [selectedVariants, setSelectedVariants] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateSelectedVariants = (key, value) => {
    setSelectedVariants((prevVariants) => ({
      ...prevVariants,
      [key]: value,
    }));
    const newSelectedVariants = {
      ...selectedVariants,
      [key]: value,
    };
    setSelectedVariant(newSelectedVariants);
  };
  console.log("ProductInfo.jsx", selectedVariants);

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
          repellendus dolorum ten etur laborum recusandae iure exercitationem
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
    const token = localStorage.getItem("token");
    if (quantity < 1) {
      return debouncedShowToast("quantity must be greater than 0");
    }
    if (token) {
      console.log("triggered");
      const response = await API_WRAPPER.post("/cart/create", {
        productId: product._id,
        quantity,
      });
      dispatch(toggleRefresh());
      debouncedShowToast("added to cart successfully");
    } else {
      const existingCart = localStorage.getItem("cart");
      if (existingCart) {
        const i = JSON.parse(existingCart).findIndex(
          (a) => a.productId == product._id
        );
        if (i == -1) {
          const updatedcart = [
            ...JSON.parse(existingCart),
            { productId: product._id, quantity },
          ];
          localStorage.setItem("cart", JSON.stringify(updatedcart));
        } else {
          const cartItems = JSON.parse(existingCart);
          cartItems[i].quantity = quantity;
          console.log("ProductInfo.jsx", cartItems);
        }
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify([{ productId: product._id, quantity }])
        );
      }
    }
  };

  const fetchProductData = async () => {
    const response = await API_WRAPPER.get(`/product/${slug}`);
    if (response.data) {
      setProduct(response.data);
      console.log("RESPONSE PRODUCT DATA:", response.data);
      // cheanged to cover image instead of first index of images arr
      setSelectedImage(response.data.coverImage);
      extractVariantsData(response.data?.variants);
      setPrice(
        response?.data?.variants.length > 0
          ? response.data?.variants[0].price
          : response?.data?.price
      );
    }
  };

  const findSelectedVariant = (selectedAttributes) => {
    if (!selectedAttributes || !product?.variants) {
      return null;
    }

    return product.variants.find((variant) => {
      return Object.keys(selectedAttributes).every((key) => {
        return variant.variant[key] === selectedAttributes[key];
      });
    });
  };

  const setSelectedVariant = (variants) => {
    setSelectedVariants(variants);
    const newSelectedVariant = findSelectedVariant(variants);
    setSelectedImage(newSelectedVariant.images[0]);
    setPrice(newSelectedVariant.price);
  };

  const extractVariantsData = async (variants) => {
    let result = [];
    console.log(variants);

    for (let variant of variants) {
      for (const key in variant.variant) {
        console.log("ProductInfo.jsx", key);

        // Find the object in the result array with the matching key
        let existingObject = result.find((obj) => obj[key]);

        if (!existingObject) {
          // If the object with the key doesn't exist, create a new one
          existingObject = { [key]: [] };
          result.push(existingObject);
        }

        // Push the value to the existing object's array
        if (!existingObject[key].includes(variant.variant[key])) {
          existingObject[key].push(variant.variant[key]);
        }
      }
    }

    setVariantFilters(result);
    console.log("ProductInfo.jsx", result);
  };
  useEffect(() => {}, [selectedVariants]);
  useEffect(() => {
    window.scrollTo({
      top: 10,
      behavior: "smooth", // Optional: Add smooth scrolling animation
    });
  }, []);
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

  console.log("ProductInfo.jsx", variantFilters);

  return (
    <div className="mx-4 md:mx-8 lg:mx-16 mt-4">
      <Link onClick={() => navigate(-1)} className="btn">
        <IoMdArrowBack className="text-2xl" />
        Back
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-8">
        <div className="col-span-1">
          <InnerImageZoom src={selectedImage} />
          <div className="flex flex-wrap gap-2 md:gap-4">
            {/* chjanges to conditional rendering because uploaded objects have different schema than created objects */}
            {product?.images && product.images.length > 0
              ? product.images.map((image) => (
                  <Card key={nanoid()} className="">
                    <img
                      onClick={() => {
                        setSelectedImage(image);
                      }}
                      src={image}
                      className="w-16 cursor-pointer hover:scale-110"
                      alt=""
                    />
                  </Card>
                ))
              : product?.variants.map((variantObj) => {
                  return (
                    <img
                      className="w-16 cursor-pointer hover:scale-110"
                      key={nanoid()}
                      src={variantObj.images[0]}
                      alt=""
                      onClick={() => {
                        setSelectedImage(variantObj.images[0]);
                      }}
                    />
                  );
                })}
          </div>
        </div>

        <div className="col-span-1  flex flex-col items-center justify-center px-4 ">
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl">{product?.name}</h1>
            <div className={"gap-2 md:gap-4 flex flex-col"}>
              <div className="flex gap-4">
                <span className="text-4xl font-thin">USD</span>
                {isLogged ? (
                  <span className="text-4xl">{price}</span>
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
            </div>
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
              {variantFilters?.map((attribute) => {
                const key = Object.keys(attribute)[0];
                return (
                  <div key={nanoid()} className="form-control">
                    <label className="label">
                      <span className="label-text">{key}</span>
                    </label>
                    <select
                      className="select select-bordered"
                      onChange={(e) =>
                        updateSelectedVariants(key, e.target.value)
                      }
                      value={
                        selectedVariants ? selectedVariants[key] || "" : ""
                      }
                    >
                      <option value="" disabled selected>
                        select value
                      </option>
                      {attribute[key].map((value) => (
                        <option key={nanoid()} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
              {/* <div className="form-control">
                <label className="label">
                  <span className="label-text">Color</span>
                </label>
                <select className="select select-bordered">
                  <option value="Black">Black</option>
                </select>
              </div> */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  request_quote_modal.showModal();
                }}
                className="btn cursor-pointer  mt-4 w-full"
              >
                Get Quote
              </button>
            </div>
            <div className="col-span-1">
              <h1 className="text-sm">Description</h1>
              <div className="text-xs mt-4 bg-base-200 rounded-xl px-2">
                {product?.description.split(" ").slice(0, 10).join(" ")}
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
