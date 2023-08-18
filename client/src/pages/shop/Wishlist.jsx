import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"; // If using React Router
import { toggleRefresh } from "../../features/appConfig/appSlice";
import { debouncedShowToast } from "../../utils";
import { Table } from "../../components";
import ShopBanner from "../../assets/shop/bannerImages/shopBanner.png";
import Banner from "./Banner";
import API_WRAPPER from "../../api";
import { nanoid } from "nanoid";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [apiTrigger, setApiTrigger] = useState(false);
  const dispatch = useDispatch();

  const getWishlistItems = async () => {
    try {
      const response = await API_WRAPPER.get("/wishlist/getmywishlist");
      setWishlistItems(response.data.data.wishlist);
      console.log("WISHLIST RESPONSE: ", response.data.data);
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

  const columns = useMemo(() => {
    return [
      {
        Header: "Product Image",
        accessor: "productId.coverImage",
        Cell: ({ row }) => {
          return (
            <img
              className="w-10 h-10"
              src={row?.original?.productId?.coverImage}
              alt=""
            />
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

      <section>
        {/* ... Rest of your code ... */}
        <Table
          columns={columns}
          data={wishlistItems}
          enableDelete
          showButtons
          onDelete={(row) => removeFromWishlist(row?.productId?._id)}
          tableTitle="Wishlist"
          enablePagination
          pageSize={"10"}
        />

        {/* ... Rest of your code ... */}
        <Link
          to="#" // Replace "#" with the actual checkout path
          className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
        >
          Checkout
        </Link>
        {/* ... Rest of your code ... */}
      </section>
    </div>
  );
};

export default Wishlist;
