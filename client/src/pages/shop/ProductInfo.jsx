import { IoMdArrowBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import { CiLogin } from "react-icons/ci";
import { Card, ProductsListWithFilters, Ratings, Tabs } from "../../components";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { productListFiltersAndProducts } from "../../mappings";
import API_WRAPPER, { baseUrl } from "../../api";
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
  const [imagesList, setImagesList] = useState();
  const [product, setProduct] = useState();
  const [slug, setSlug] = useState();
  const params = useParams();
  const [quantity, setQuantity] = useState(50);
  const [price, setPrice] = useState(0);
  const [variantFilters, setVariantFilters] = useState();
  const [selectedVariants, setSelectedVariants] = useState({});
  const [overImage, setOverImage] = useState();
  const [customizedImage, setCustomizedImage] = useState();
  const [currency, setCurrency] = useState("ruppee");
  const [mrp, setMrp] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("ProductInfo.jsx", selectedVariants);
  console.log("ProductInfo.jsx", variantFilters);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setOverImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

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

  function checkVariantsMatch(variantFilters, selectedVariants) {
    for (const filter of variantFilters) {
      const [key, values] = Object.entries(filter)[0];
      const selectedValue = selectedVariants[key];
      console.log("ProductInfo.jsx", key, selectedValue);

      if (!selectedValue) {
        return false;
      }
    }
    return true;
  }

  const addToCart = async (e) => {
    e.preventDefault();
    const isTrue = checkVariantsMatch(variantFilters, selectedVariants);
    console.log("ProductInfo.jsx", isTrue);
    if (!isTrue) {
      debouncedShowToast("select all attributes to add to cart");
      return;
    }
    const token = localStorage.getItem("token");
    if (quantity < 50) {
      debouncedShowToast("minimum quantity to buy is 50");
      return;
    }
    if (token) {
      console.log("triggered");
      const response = await API_WRAPPER.post("/cart/create", {
        productId: product._id,
        quantity,
        variant: selectedVariants,
      });

      dispatch(toggleRefresh());
      debouncedShowToast("added to cart successfully");
    } else {
      const existingCart = localStorage.getItem("cart");
      if (existingCart) {
        const i = JSON.parse(existingCart).findIndex(
          (a) => a.productId == product._id && a.variant == selectedVariants
        );
        if (i == -1) {
          const updatedcart = [
            ...JSON.parse(existingCart),
            { productId: product._id, quantity, variant: selectedVariants },
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
          JSON.stringify([
            { productId: product._id, quantity, variant: selectedVariants },
          ])
        );
      }
      debouncedShowToast("Login to view cart", "success");
      window.my_modal_2.showModal();
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
      if (response?.data?.variants?.length < 1) {
        setImagesList(response.data.images);
      }
      setMrp(
        response?.data?.variants.length > 0 && response.data?.variants[0].mrp
      );

      if (response?.data?.variants.length > 0) {
        if (response?.data?.variants[0]?.dynamic_price?.length > 0) {
          // Handle the case when dynamic_price has length > 0
          // You can access the dynamic_price[0]["price"] here
          setPrice(response?.data?.variants[0]?.dynamic_price[0]["price"]);
        } else {
          // Handle the case when dynamic_price has length 0
          // You can access response.data?.variants[0].price here
          setPrice(response.data?.variants[0].price);
        }
      } else {
        // Handle the case when variants has length 0
        // You can access response?.data?.price here
        setPrice(response?.data?.price);
      }

      updatePriceBasedOnQuantity(50);
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
  console.log(selectedVariants);

  const setSelectedVariant = (variants) => {
    setSelectedVariants(variants);
    const newSelectedVariant = findSelectedVariant(variants);
    setImagesList(newSelectedVariant.images);
    console.log(newSelectedVariant);
    if (newSelectedVariant.images.length < 1) {
      setSelectedImage(product.coverImage);
    } else {
      setSelectedImage(newSelectedVariant.images[0]);
    }
    if (newSelectedVariant.dynamic_price) {
      updatePriceBasedOnQuantity(quantity, currency);
    }
    setMrp(newSelectedVariant.mrp);
    setPrice(newSelectedVariant.price);
  };

  function updatePriceBasedOnQuantity(quantity) {
    const newSelectedVariant = findSelectedVariant(selectedVariants);

    if (newSelectedVariant.dynamic_price) {
      let updatedArray = [...newSelectedVariant.dynamic_price];
      let selectedPriceObj = null;

      for (let i = 0; i < updatedArray.length; i++) {
        const obj = updatedArray[i];
        const minQuantity = parseInt(obj.minQuantity);

        if (quantity >= minQuantity) {
          if (
            !selectedPriceObj ||
            minQuantity > parseInt(selectedPriceObj.minQuantity)
          ) {
            selectedPriceObj = { ...obj };
          }
        }
      }

      if (selectedPriceObj !== null) {
        // Set the currency to "ruppee"
        selectedPriceObj.currency = "ruppee";
        setPrice(selectedPriceObj.price);
      } else {
        // Handle the case where no matching quantity range is found.
        return null;
      }
    }
  }

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

  console.log("PRODUCTS: ", product);
  return (
    <>
      <div className="mx-4 md:mx-8 lg:mx-16 mt-4">
        <Link onClick={() => navigate(-1)} className="btn">
          <IoMdArrowBack className="text-2xl" />
          Back
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4 gap-4">
          <div className="col-span-3 flex flex-row bg-base-200 gap-8 rounded-xl p-4">
            <div className="flex w-full justify-between gap-4">
              <div className="flex flex-col">
                <InnerImageZoom
                  className="rounded-xl h-[400px] hover:shadow-xl transition-all ease-in-out duration-300 mb-4"
                  src={
                    !selectedImage?.includes("res.cloudinary") &&
                    !selectedImage?.includes("cdn.shopify")
                      ? `${baseUrl}/${selectedImage}`
                      : selectedImage
                  }
                />
                <div className="flex flex-wrap gap-2 md:gap-4">
                  {/* chjanges to conditional rendering because uploaded objects have different schema than created objects */}
                  {imagesList?.map((img) => (
                    <Card key={nanoid()}>
                      <img
                        onClick={() => {
                          setSelectedImage(img);
                        }}
                        src={
                          !img?.includes("res.cloudinary") &&
                          !img?.includes("cdn.shopify")
                            ? `${baseUrl}/${img}`
                            : img
                        }
                        className="w-16 cursor-pointer rounded-xl hover:scale-110"
                        alt=""
                      />
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex flex-col">
                  <div className="flex flex-col w-full relative">
                    <div className="flex justify-between w-96">
                      <h1 className="font-bold text-2xl">{product?.name}</h1>
                      {product?.customization && (
                        <label
                          htmlFor="customize_drawer"
                          className="btn btn-primary drawer-button"
                        >
                          Customize
                        </label>
                      )}
                    </div>
                    <br />
                    <div className="gap-2 md:gap-4 flex flex-col">
                      <div className="flex gap-4 items-center">
                        <span className="text-4xl font-thin">
                          {currency == "ruppee" ? "₹‎" : "USD"}
                        </span>
                        {isLogged ? (
                          <>
                            <span className="line-through">{mrp}</span>
                            <span className="text-4xl">{price}</span>
                          </>
                        ) : (
                          <Link
                            to={PATHS.login}
                            className="join cursor-pointer"
                          >
                            <div className="bg-base-200 join-item flex items-center px-2">
                              <span className="text-sm">
                                To reveal the price, please sign in or sign up
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
                    <Ratings rating={4.5} />
                    <p>(1 Review)</p>
                  </div>
                </div>

                <form className="max-h-96 overflow-y-scroll">
                  <div className="flex flex-col">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Quantity</span>
                      </label>
                      <input
                        className="input input-bordered mb-1"
                        type="number"
                        name=""
                        id=""
                        min={50}
                        onChange={(e) => {
                          setQuantity(e.target.value);
                          updatePriceBasedOnQuantity(e.target.value);
                        }}
                        value={quantity}
                      />
                    </div>

                    {variantFilters?.map((attribute) => {
                      const key = Object.keys(attribute)[0];
                      return (
                        <div key={nanoid()} className="form-control mb-1">
                          <label className="label">
                            <span className="label-text">{key}</span>
                          </label>
                          <select
                            className="select select-bordered min-w-full"
                            onChange={(e) =>
                              updateSelectedVariants(key, e.target.value)
                            }
                            value={
                              selectedVariants
                                ? selectedVariants[key] || ""
                                : ""
                            }
                          >
                            <option value="" disabled selected>
                              Select value
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
                    <div className="my-5">
                      <button
                        className="btn btn-primary w-full p-2 "
                        onClick={(e) => {
                          addToCart(e);
                        }}
                      >
                        <button className="flex gap-4">
                          <AiOutlineShoppingCart className="text-xl text-white " />
                          <span>Add To Cart</span>
                        </button>
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.request_quote_modal.showModal();
                        }}
                        className="btn btn-primary cursor-pointer mt-4 w-full"
                      >
                        Get Quote
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-1 border-l flex flex-col items-center justify-center px-4">
            <p className="text-start py-4">Ongoing Offers!</p>
            <div className="gap-4 flex flex-col">
              <div className="join">
                <div className="flex pl-2 justify-center items-center bg-primary  text-white font-semibold join-item w-full">
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
                <div className="flex pl-2 justify-center items-center bg-primary  text-white font-semibold join-item w-full">
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

      <dialog id="customization_modal" className="modal">
        <div className="modal-box">
          <div className="modal-content">
            <div className="relative">
              <img
                className="block w-full"
                src={
                  !product?.coverImage?.includes("res.cloudinary") &&
                  !product?.coverImage?.includes("cdn.shopify")
                    ? `${baseUrl}/${product?.coverImage}`
                    : product?.coverImage
                }
                alt="Cover Image"
              />
              {overImage && (
                <img
                  className="absolute"
                  style={{
                    top: `${product?.customization?.yAxis}%`,
                    left: `${product?.customization?.xAxis}%`,
                    height: `${product?.customization?.height}px`,
                    width: `${product?.customization?.width}px`,
                  }}
                  src={overImage}
                  alt="Overlay Image"
                />
              )}
            </div>

            <div className="mt-0">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border p-2"
              />
            </div>
          </div>
          <div className="modal-action mt-6">
            <div>
              <button
                className="btn"
                onClick={() => {
                  window.customization_modal.close();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box flex flex-col gap-2">
          <h3 className="font-bold text-lg">Adding Items to cart!</h3>
          <p className="py-4 flex flex-col gap-2">
            login to view cart
            <button
              className="btn block w-40 btn-primary"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* request quote modal */}
      <dialog id="request_quote_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Get Quote for {product?.name}</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Enter your Name</span>
            </label>
            <input className="input input-bordered" type="text" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Enter your Contact</span>
            </label>
            <input className="input input-bordered" type="text" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Enter your Company Details</span>
            </label>
            <input className="input input-bordered" type="text" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">City</span>
            </label>
            <input className="input input-bordered" type="text" />
          </div>
          <button
            onClick={() => window.request_quote_modal.close()}
            className="btn btn-primary mt-4"
          >
            Request Meeting
          </button>
          <button
            onClick={() => window.request_quote_modal.close()}
            className="btn  mt-4 ml-4"
          >
            Close
          </button>
        </div>
      </dialog>

      <div className="drawer">
        <input
          id="customize_drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">{/* Page content here */}</div>
        <div className="drawer-side">
          <label htmlFor="customize_drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-[50vw] min-h-full bg-base-200 text-base-content">
            <div className="modal-content">
              <h1 className="text-4xl my-8 text-shopPrimaryColor">
                Customize Product
              </h1>
              <div className="relative">
                <img
                  className="rounded-xl"
                  src={
                    !product?.coverImage?.includes("res.cloudinary") &&
                    !product?.coverImage?.includes("cdn.shopify")
                      ? `${baseUrl}/${product?.coverImage}`
                      : product?.coverImage
                  }
                  alt="Cover Image"
                />
                {overImage && (
                  <img
                    className="absolute"
                    style={{
                      top: `${product?.customization?.yAxis}%`,
                      left: `${product?.customization?.xAxis}%`,
                      height: `${product?.customization?.height}px`,
                      width: `${product?.customization?.width}px`,
                    }}
                    src={overImage}
                    alt="Overlay Image"
                  />
                )}
              </div>

              <div className="flex justify-between mt-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                />
              </div>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
