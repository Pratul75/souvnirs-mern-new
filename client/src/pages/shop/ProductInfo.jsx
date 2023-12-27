import { IoMdArrowBack } from "react-icons/io";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import { CiLogin } from "react-icons/ci";
import { Card, ProductsListWithFilters, Ratings, Tabs } from "../../components";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { productListFiltersAndProducts } from "../../mappings";
import API_WRAPPER, { baseUrl } from "../../api";
import { useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import { debouncedShowToast } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { toggleRefresh } from "../../features/appConfig/appSlice";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
import { nanoid } from "nanoid";
import Cropper from "react-easy-crop";
const ProductInfo = () => {
  const isLogged = localStorage.getItem("token");
  const [selectedImage, setSelectedImage] = useState();
  const [imagesList, setImagesList] = useState();
  const [product, setProduct] = useState();
  const [slug, setSlug] = useState();
  const params = useParams();
  const [price, setPrice] = useState(0);
  const [variantFilters, setVariantFilters] = useState();
  const [selectedVariants, setSelectedVariants] = useState({});
  const [overImage, setOverImage] = useState();
  const [customizedImage, setCustomizedImage] = useState();
  const [currency, setCurrency] = useState("ruppee");
  const [mrp, setMrp] = useState();
  const [VarientsData, setVarientsData] = useState([]);
  /// Add state to track the cropped image
  const [croppedImage, setCroppedImage] = useState(null);
  // Add a state to toggle the display of the cropped image section
  const [showCroppedImage, setShowCroppedImage] = useState(false);
  const [inqueryData, setInqueryData] = useState({});
  const [Quantitydata, setQuantitydata] = useState(0);
  const [quantity, setQuantity] = useState(50);
  const [checkAttribute, setCheckAttribute] = useState({
    isTrue: false,
    msg: "",
  });
  const [ImageShow, setImageShow] = useState(0);
  const [filtUrl, setFileUrl] = useState(null);
  const [imageIn, setImageIn] = useState(null);
  const [cropedData, setCropedData] = useState(null);
  const [storeData, setstoreData] = useState({
    show: false,
    data: {},
  });
  const [showDrower, setShowDrower] = useState(true);
  const [cropedFileSave, setCropedFileSave] = useState(null);
  const [OfferContent, setOfferContent] = useState({});
  const location = useLocation();

  // Add a function to handle cropping
  const handleCropImage = () => {
    // const getImageCroped = generateCroppedImageFile(imageIn, cropedData);
    generateCroppedImageFile(imageIn, cropedData).then((file) => {
      if (file) {
        setCropedFileSave(file);
        const reader = new FileReader();

        reader.onload = (e) => {
          const dataUrl = e.target.result;
          setFileUrl(dataUrl);
        };

        reader.readAsDataURL(file);
      }
    });
    setImageShow(1);
    setShowCroppedImage(true); // Show the cropped image section
  };
  // crop image states
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCropedData(croppedAreaPixels);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("ProductInfo.jsx", selectedVariants);
  console.log("ProductInfo.jsx", variantFilters);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageIn(file);
    if (file) {
      setImageShow(2);
      const reader = new FileReader();

      reader.onload = (e) => {
        setOverImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const generateCroppedImageFile = (file, cropData) => {
    const { x, y, width, height } = cropData;

    const loadImage = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = (err) => reject(err);
          img.src = e.target.result;
        };

        reader.readAsDataURL(file);
      });
    };

    return loadImage(file)
      .then((originalImage) => {
        // Create a canvas and draw the cropped image on it
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;

        // Draw the image only if it's fully loaded
        if (originalImage.complete && originalImage.naturalWidth > 0) {
          ctx.drawImage(
            originalImage,
            x,
            y,
            width,
            height,
            0,
            0,
            width,
            height
          );

          // Convert the canvas to a Blob
          const blobBin = atob(canvas.toDataURL(file.type).split(",")[1]);
          const array = new Uint8Array(blobBin.length);

          for (let i = 0; i < blobBin.length; i++) {
            array[i] = blobBin.charCodeAt(i);
          }

          // Create a new File object with the same name and type as the original file
          const croppedImageFile = new File([array], file.name, {
            type: file.type,
          });

          return croppedImageFile;
        } else {
          console.error("Original image is not fully loaded.");
          return null;
        }
      })
      .catch((error) => {
        console.error("Error loading image:", error);
        return null;
      });
  };

  // Example usage:
  // const originalImage = document.getElementById("yourOriginalImageElement"); // Replace with your actual image element
  // const cropData = {
  //   x: 0,
  //   y: 0,
  //   width: 910.6666870117188,
  //   height: 118.66667175292969,
  // };

  // const croppedImageFile = generateCroppedImageFile(originalImage, cropData);

  // Now, `croppedImageFile` contains the Blob representing the cropped image.
  // You can use it, for example, to create a download link or upload it to a server.

  console.log("-=-------->--->", product?.customization);

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

  const getWishListdata = async () => {
    try {
      const result = await API_WRAPPER(
        `/check/products/data?productId=${product?._id}`
      );
      if (result?.data?.success) {
        setstoreData({
          show: true,
          data: result?.data?.data[0],
        });
        console.log("resssss---->>>==>>", result?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // if (ImageShow == 1 || showDrower == true) {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [10]);
    // }
  }, [ImageShow, showDrower]);

  const addToCart = async (e) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    e.preventDefault();
    const isTrue = checkVariantsMatch(variantFilters, selectedVariants);
    console.log("ProductInfo.jsx", isTrue);
    if (!isTrue) {
      debouncedShowToast("select all attributes to add to cart");
      return;
    }
    const token = localStorage.getItem("token");
    if (quantity < Quantitydata) {
      debouncedShowToast(`minimum quantity to buy is ${Quantitydata}`);
      return;
    }
    if (token) {
      console.log("triggered-->>>", {
        productId: product._id,
        quantity,
        variant: selectedVariants,
      });
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
      setSelectedImage(response.data?.coverImage);
      extractVariantsData(response.data?.variants);
      setVarientsData(response.data?.variants);
      setQuantitydata(Number(response.data?.minquantity));
      setQuantity(Number(response.data?.minquantity));

      if (response?.data?.variants.length > 0) {
        let imageLists = [];
        response?.data?.variants.map((item, index) => {
          const keys = Object.keys(item?.variant);
          let firstKey = keys[0];
          const firstValue = item?.variant[firstKey];
          item?.images?.map((pro, ind) => {
            // imageLists.push({
            //   [firstKey]: firstValue,
            //   img: pro,
            // });
            imageLists.push(pro);
          });
        });
        // const imageObjects = response.data.images.map((img) => ({
        //   color: "",
        //   img,
        // }));
        const uniqueImages = [
          ...new Set([...imageLists, ...response.data.images]),
        ];
        setImagesList(uniqueImages);
        console.log("====++++====++++=<<<<>...>>>>>Vri", [
          ...imageLists,
          ...response.data.images,
        ]);
      }
      if (response?.data?.variants?.length < 1) {
        const imageObjects = response.data.images.map((img) => ({
          color: "",
          img,
        }));
        // setImagesList(imageObjects);
        setImagesList(response.data.images);
      }

      setMrp(response.data?.mrp);
      setPrice(response.data?.price);
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
    // if (newSelectedVariant.dynamic_price) {
    //   updatePriceBasedOnQuantity(quantity, currency);
    // }
    setMrp(newSelectedVariant.mrp);
    setPrice(newSelectedVariant.price);
  };

  function updatePriceBasedOnQuantity(quantity) {
    if (quantity > 0) {
      const newSelectedVariant = findSelectedVariant(selectedVariants);

      if (newSelectedVariant.dynamic_price) {
        let updatedArray = [...newSelectedVariant.dynamic_price];
        let selectedPriceObj = null;

        for (let i = 0; i < updatedArray.length; i++) {
          const obj = updatedArray[i];
          const minQuantity = parseInt(obj.minQuantity);
          const maxQuantity = parseInt(obj.maxQuantity);

          if (quantity >= minQuantity && quantity <= maxQuantity) {
            if (
              !selectedPriceObj ||
              minQuantity > parseInt(selectedPriceObj.minQuantity)
            ) {
              selectedPriceObj = { ...obj };
            }
          } else if (quantity > maxQuantity) {
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
    } else {
      const newSelectedVariant = findSelectedVariant(selectedVariants);
      console.log("newSelectedVariant==>", newSelectedVariant);
      if (newSelectedVariant) {
        setPrice(newSelectedVariant?.price);
        setMrp(newSelectedVariant?.mrp);
      } else {
        setPrice(product?.price);
        setMrp(product?.mrp);
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

  const handleSubmitInquery = async () => {
    let finalData = { ...inqueryData };
    let checkdata = { check: true, msg: "" };
    if (finalData["email"] == "") {
      checkdata.check = false;
      checkdata.msg = `${"Email"} can not be empty and it should be email formate`;
      return;
    }
    console.log("0000****999-->", finalData);
    if (checkdata.check) {
      finalData.inquery = [inqueryData.inquery];
      const response = await API_WRAPPER.post("/create/inquery", finalData);
      toast.success("Thank you");
      window.request_quote_modal.close();
    } else {
      toast.warning(checkdata?.msg);
    }
  };

  useEffect(() => {
    getWishListdata();
  }, [product]);

  const getActualPrice = (type, per, price) => {
    console.log("type, per, price", { type, per, price });
    let check = type == "percentage" ? true : false;
    if (check) {
      let decimalPercentage = Number(per) / 100;

      // Calculate the subtraction
      let result = Number(price) - decimalPercentage * Number(price);
      return result;
    } else {
      let result = Number(price) - Number(per);
      return result;
    }
  };

  const getLatestDiscount = async () => {
    try {
      const result = await API_WRAPPER.get("/discount/latest-discount");
      setOfferContent(result?.data);
      // console.log(
      //   "------((((((((((((((((((((((9999999999999999999999999--->",
      //   result
      // );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLatestDiscount();
  }, []);

  const handleSaveImage = () => {
    setShowDrower(false);
  };

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
                  className="rounded-xl h-[100%] hover:shadow-xl transition-all ease-in-out duration-300 mb-4"
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
                      {img && (
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
                          className="w-16 cursor-pointer rounded-xl hover:scale-110 h-16"
                          alt=""
                        />
                      )}
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
                          onClick={() => {
                            setShowDrower(true);
                            setImageShow(1);
                          }}
                          htmlFor="customize_drawer"
                          className="btn btn-primary drawer-button"
                        >
                          Customize
                        </label>
                      )}
                    </div>
                    <br />
                    <div className="gap-2 md:gap-4 flex flex-col">
                      {storeData?.show && (
                        <h className="bg-red-400 w-36 p-1 rounded-sm">
                          Deal {storeData?.data?.typeValue}
                          {storeData?.data?.typeTitle == "percentage"
                            ? "%"
                            : ""}{" "}
                          Off
                        </h>
                      )}
                      <div className="flex gap-4 items-center">
                        <span className="text-4xl font-thin">
                          {currency == "ruppee" ? "₹‎" : "USD"}
                        </span>
                        {isLogged ? (
                          <>
                            {/* <span className="line-through">{mrp}</span>
                            <span className="text-4xl">{price}</span> */}

                            {storeData?.show ? (
                              <>
                                <span className="text-1xl mt-2 line-through">
                                  {product?.price}
                                </span>
                                <span className="text-4xl">
                                  {Math.floor(
                                    getActualPrice(
                                      storeData?.data?.typeTitle,
                                      storeData?.data?.typeValue,
                                      price
                                    )
                                  )}
                                </span>
                              </>
                            ) : (
                              <>
                                {" "}
                                <span className="line-through">
                                  {Math.floor(mrp)}
                                </span>
                                <span className="text-4xl">
                                  {Math.floor(price)}
                                </span>
                              </>
                            )}
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
                  {checkAttribute?.isTrue && (
                    <div style={{ color: "red" }}>{checkAttribute?.msg}</div>
                  )}
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
                        // min={Quantitydata}
                        onChange={(e) => {
                          const isTrue = checkVariantsMatch(
                            variantFilters,
                            selectedVariants
                          );
                          if (!isTrue) {
                            setCheckAttribute((pre) => ({
                              ...pre,
                              isTrue: true,
                              msg: "Please select a variant",
                            }));
                            return;
                          } else {
                            setCheckAttribute((pre) => ({
                              ...pre,
                              isTrue: false,
                            }));
                            setQuantity(e.target.value);
                            updatePriceBasedOnQuantity(e.target.value);
                            if (Quantitydata > Number(e.target.value)) {
                              setCheckAttribute((pre) => ({
                                ...pre,
                                isTrue: true,
                                msg: `Can not set quantity below ${Number(
                                  Quantitydata
                                )}`,
                              }));
                            } else {
                              setCheckAttribute((pre) => ({
                                ...pre,
                                isTrue: false,
                              }));
                            }
                          }
                        }}
                        value={quantity}
                      />
                    </div>
                    {/* <ImageMerger
                      imgg1={
                        !product?.coverImage?.includes("res.cloudinary") &&
                        !product?.coverImage?.includes("cdn.shopify")
                          ? `${baseUrl}/${product?.coverImage}`
                          : product?.coverImage
                      }
                      imgg2={filtUrl}
                    /> */}
                    {variantFilters?.map((attribute) => {
                      const key = Object.keys(attribute)[0];
                      return (
                        <div key={nanoid()} className="form-control mb-1">
                          <label className="label">
                            <span className="label-text">{key}</span>
                          </label>
                          <select
                            className="select select-bordered min-w-full"
                            onChange={(e) => {
                              setCheckAttribute((pre) => ({
                                ...pre,
                                isTrue: false,
                              }));
                              let finind = VarientsData?.findIndex(
                                (item) => item?.variant[key] == e.target.value
                              );
                              updateSelectedVariants(key, e.target.value);
                              if (finind >= 0 && VarientsData) {
                                setQuantity(VarientsData[finind]?.quantity);
                                setQuantitydata(VarientsData[finind]?.quantity);
                              }
                            }}
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
                          setInqueryData({
                            ...inqueryData,
                            productId: product._id,
                            inquery: {
                              variant: location?.pathname.split("/")[2],
                            },
                          });
                          window.request_quote_modal.showModal();
                        }}
                        className="btn btn-primary cursor-pointer mt-4 w-full"
                      >
                        Get Quote
                      </button>
                    </div>
                    {/* {!showDrower && (
                      <ImageMerger
                        imgg1={
                          !product?.coverImage?.includes("res.cloudinary") &&
                          !product?.coverImage?.includes("cdn.shopify")
                            ? `${baseUrl}/${product?.coverImage}`
                            : product?.coverImage
                        }
                        imgg2={filtUrl}
                      />
                    )} */}
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
                  {OfferContent?.title}
                </div>
                <div className="text-center bg-base-200 p-4 join-item">
                  <span>
                    Flat ₹{OfferContent?.title} on minimum merchendise value ₹
                    {OfferContent?.totalLimit}! Use code
                    {/* <span className="text-primary font-bold">FEST250</span> */}
                  </span>
                </div>
              </div>
              {/* <div className="join">
                <div className="flex pl-2 justify-center items-center bg-primary  text-white font-semibold join-item w-full">
                  FLAT $250 OFF
                </div>
                <div className="text-center bg-base-200 p-4 join-item">
                  <span>
                    Flat $250 off on minimum merchendise value $999! Use code
                    <span className="text-primary font-bold">FEST250</span>
                  </span>
                </div>
              </div> */}
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
          <div></div>
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
              <span className="label-text">Name</span>
            </label>
            <input
              className="input input-bordered"
              onChange={(e) =>
                setInqueryData({
                  ...inqueryData,
                  inquery:
                    Object.keys(inqueryData?.inquery || {}).length === 0
                      ? { name: e?.target?.value }
                      : { ...inqueryData.inquery, name: e?.target?.value }, // Fix here
                })
              }
              type="text"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Company Details</span>
            </label>
            <input
              onChange={(e) =>
                setInqueryData({
                  ...inqueryData,
                  inquery:
                    Object.keys(inqueryData?.inquery || {}).length === 0
                      ? { company: e?.target?.value }
                      : { ...inqueryData.inquery, company: e?.target?.value }, // Fix here
                })
              }
              className="input input-bordered"
              type="text"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              onChange={(e) =>
                setInqueryData({
                  ...inqueryData,
                  inquery:
                    Object.keys(inqueryData?.inquery || {}).length === 0
                      ? { email: e?.target?.value }
                      : { ...inqueryData.inquery, email: e?.target?.value }, // Fix here
                })
              }
              className="input input-bordered"
              type="text"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Contact</span>
            </label>
            <input
              onChange={(e) =>
                setInqueryData({
                  ...inqueryData,
                  inquery:
                    Object.keys(inqueryData?.inquery || {}).length === 0
                      ? { contact: e?.target?.value }
                      : { ...inqueryData.inquery, contact: e?.target?.value }, // Fix here
                })
              }
              className="input input-bordered"
              type="text"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">City</span>
            </label>
            <input
              onChange={(e) =>
                setInqueryData({
                  ...inqueryData,
                  inquery:
                    Object.keys(inqueryData?.inquery || {}).length === 0
                      ? { city: e?.target?.value }
                      : { ...inqueryData.inquery, city: e?.target?.value }, // Fix here
                })
              }
              className="input input-bordered"
              type="text"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Pincode</span>
            </label>
            <input
              onChange={(e) =>
                setInqueryData({
                  ...inqueryData,
                  inquery:
                    Object.keys(inqueryData?.inquery || {}).length === 0
                      ? { pincode: e?.target?.value }
                      : { ...inqueryData.inquery, pincode: e?.target?.value }, // Fix here
                })
              }
              className="input input-bordered"
              type="number"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Quantity</span>
            </label>
            <input
              onChange={(e) =>
                setInqueryData({
                  ...inqueryData,
                  inquery:
                    Object.keys(inqueryData?.inquery || {}).length === 0
                      ? { quantity: e?.target?.value }
                      : { ...inqueryData.inquery, quantity: e?.target?.value }, // Fix here
                })
              }
              className="input input-bordered"
              type="number"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Exapected delivery date</span>
            </label>
            <input
              type="date"
              onChange={(e) =>
                setInqueryData({
                  ...inqueryData,
                  inquery:
                    Object.keys(inqueryData?.inquery || {}).length === 0
                      ? { expected_date: e?.target?.value }
                      : {
                          ...inqueryData.inquery,
                          expected_date: e?.target?.value,
                        }, // Fix here
                })
              }
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Time Extension</span>
            </label>
            <input
              type="time"
              onChange={(e) =>
                setInqueryData({
                  ...inqueryData,
                  inquery:
                    Object.keys(inqueryData?.inquery || {}).length === 0
                      ? { time_extension: e?.target?.value }
                      : {
                          ...inqueryData.inquery,
                          time_extension: e?.target?.value,
                        }, // Fix here
                })
              }
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Additional information</span>
            </label>
            <textarea
              type="text"
              onChange={(e) =>
                setInqueryData({
                  ...inqueryData,
                  inquery:
                    Object.keys(inqueryData?.inquery || {}).length === 0
                      ? { msg: e?.target?.value }
                      : { ...inqueryData.inquery, msg: e?.target?.value }, // Fix here
                })
              }
              className="input input-bordered"
            />
          </div>
          <button
            onClick={handleSubmitInquery}
            style={{ marginTop: "10px" }}
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

      {showDrower && (
        <div className="drawer">
          <input
            id="customize_drawer"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content">{/* Page content here */}</div>
          <div className="drawer-side">
            <label
              htmlFor="customize_drawer"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-[50vw] min-h-full bg-base-200 text-base-content">
              <div className="modal-content">
                <h1 className="text-4xl my-8 text-shopPrimaryColor">
                  Customize Product
                </h1>

                {overImage && ImageShow !== 1 && (
                  <div className="crop-container">
                    <Cropper
                      image={overImage}
                      crop={crop}
                      zoom={zoom}
                      aspect={4 / 3}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                    {/* // Add a button to trigger cropping */}

                    {showCroppedImage && croppedImage && (
                      <div>
                        <h2>Cropped Image</h2>
                        <img src={croppedImage} alt="Cropped" />
                      </div>
                    )}
                  </div>
                )}
                <div className="controls">
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e) => {
                      setZoom(e.target.value);
                    }}
                    className="zoom-range"
                  />
                  <button
                    onClick={handleCropImage}
                    className="btn btn-primary z-[9999] m-2"
                  >
                    Crop Image
                  </button>
                  {/* <button
                    onClick={handleSaveImage}
                    className="btn btn-primary z-[9999]"
                  >
                    save
                  </button> */}
                  <button
                    onClick={() => setFileUrl(null)}
                    className="btn btn-primary z-[9999] m-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleSaveImage();
                      setImageShow(4);
                    }}
                    style={{ color: "red", border: "1px solid" }}
                    className="btn z-[9999] ml-6"
                  >
                    Close
                  </button>
                </div>
                <div className="relative">
                  {ImageShow == 1 && (
                    <img
                      className="rounded-xl"
                      style={{ opacity: 1 }}
                      src={
                        !product?.coverImage?.includes("res.cloudinary") &&
                        !product?.coverImage?.includes("cdn.shopify")
                          ? `${baseUrl}/${product?.coverImage}`
                          : product?.coverImage
                      }
                      alt="Cover Image"
                    />
                  )}
                  {overImage && ImageShow == 1 && (
                    <img
                      className="absolute"
                      style={{
                        top: `${product?.customization?.yAxis + 3}%`,
                        left: `${product?.customization?.xAxis + 7.9}%`,
                        height: `${product?.customization?.height}%`,
                        width: `${product?.customization?.width}%`,
                        opacity: 0.9,
                        borderRadius: "5px",
                      }}
                      src={filtUrl}
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
      )}
      <ToastContainer />
    </>
  );
};

const ImageMerger = ({ imgg1, imgg2 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const mergeImages = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Load the first image
      const img1 = new Image();
      img1.src = imgg1;

      // Load the second image
      const img2 = new Image();
      img2.src = imgg2;

      // Set the canvas dimensions
      canvas.width = img1.width;
      canvas.height = img1.height;

      // Wait for both images to load
      Promise.all([loadImage(img1), loadImage(img2)])
        .then(([loadedImg1, loadedImg2]) => {
          // Draw the first image
          ctx.drawImage(loadedImg1, 0, 0, canvas.width, canvas.height);

          // Draw the second image at the specified position and dimensions
          const { xAxis, yAxis, width, height } = {
            xAxis: 69.11,
            yAxis: 15.46,
            width: 23,
            height: 30,
          };
          ctx.drawImage(loadedImg2, xAxis, yAxis, width, height);

          // Get the data URL of the merged image
          const mergedDataURL = canvas.toDataURL(loadedImg1.src.split(".")[1]);

          // Do something with the data URL, for example, display it in an image element
          const imgElement = document.createElement("img");
          imgElement.src = mergedDataURL;
          document.body.appendChild(imgElement);
        })
        .catch((error) => console.error("Error loading images:", error));
    };

    const loadImage = (img) => {
      return new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
      });
    };

    mergeImages();
  }, []);

  return <canvas ref={canvasRef} style={{ display: "none" }} />;
};

export default ProductInfo;
