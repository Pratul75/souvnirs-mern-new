import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // If using React Router
import { toggleRefresh } from "../../features/appConfig/appSlice";
import { debouncedShowToast } from "../../utils";
import { Table } from "../../components";
import ShopBanner from "../../assets/shop/bannerImages/wishlistBanner.png";
import Banner from "./Banner";
import API_WRAPPER, { baseUrl } from "../../api";
import { PATHS } from "../../Routes/paths";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [apiTrigger, setApiTrigger] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setCartProducts = async () => {
    const token = localStorage.getItem("token");
    console.log("token---->--->-->", token, wishlistItems);
    if (token) {
      for (let i = 0; i < wishlistItems?.length; i++) {
        const response = await API_WRAPPER.post("/cart/create", {
          productId: wishlistItems[i]?.productId?._id,
          quantity: 50,
          // variant: ,
        });
        const responses = await API_WRAPPER.post("/wishlist/create", {
          productId: wishlistItems[i]?.productId?._id,
        });
      }
    }
    dispatch(toggleRefresh());
    navigate("/cart_page");
  };

  const getWishlistItems = async () => {
    try {
      const response = await API_WRAPPER.get("/wishlist/getmywishlist");
      setWishlistItems(response.data.data.wishlist);
      console.log("WISHLIST RESPONSE: ", response.data.data?.wishlist);
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      const response = await API_WRAPPER.post("/wishlist/create", {
        productId: id,
      });
      setApiTrigger((a) => !a);
      if (response.status === 200) {
        debouncedShowToast("Removed from wishlist", "success");
        dispatch(toggleRefresh());
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  useEffect(() => {
    getWishlistItems();
  }, [apiTrigger]);

  const handleImageShow = (productImage) => {
    if (productImage?.variant_id) {
      if (
        !productImage?.variant_id?.images[0]?.includes("res.cloudinary") &&
        !productImage?.variant_id?.images[0]?.includes("cdn.shopify")
      ) {
        return `${baseUrl}/${productImage?.variant_id?.images[0]}`;
      } else {
        return productImage?.variant_id?.images[0];
      }
    } else {
      if (
        !productImage?.productId?.coverImage?.includes("res.cloudinary") &&
        !productImage?.productId?.coverImage?.includes("cdn.shopify")
      ) {
        return `${baseUrl}/${productImage?.productId?.coverImage}`;
      } else {
        return productImage?.productId?.coverImage;
      }
    }
  };

  const columns = useMemo(() => {
    return [
      {
        Header: "Image",
        accessor: "productId.images",
        Cell: ({ row }) => {
          return (
            <Link to={`/productInfo/${row.original?.productId.slug}`}>
              <img
                className="w-10 h-10"
                src={handleImageShow(row.original)}
                alt=""
              />
            </Link>
          );
        },
      },
      {
        Header: "Product Name",
        accessor: "productId.name",
      },
      {
        Header: "Price",
        accessor: "productId.price",
      },
    ];
  }, []);

  return (
    <div>
      <Banner
        bannerImage={ShopBanner}
        text={"Wishlist"}
        navigation={"Home/Wishlist"}
      />

      <section className="mt-16">
        {wishlistItems.length > 0 ? (
          <Table
            columns={columns}
            data={wishlistItems}
            enableDelete
            showButtons
            onDelete={(row) => removeFromWishlist(row?.productId?._id)}
            enablePagination
            pageSize={"10"}
          />
        ) : (
          <div>No Product found</div>
        )}
        <br />
        {wishlistItems.length > 0 && (
          <Link
            // to={PATHS.checkout}
            onClick={setCartProducts}
            className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600 w-32 ml-auto"
          >
            Add to Cart
          </Link>
        )}
      </section>
    </div>
  );
};

export default Wishlist;
