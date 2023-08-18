import React, { useEffect, useMemo, useState } from "react";
import ShopBanner from "../../assets/shop/bannerImages/shopBanner.png";
import Banner from "./Banner";
import API_WRAPPER from "../../api";
import { useDispatch } from "react-redux";
import { toggleRefresh } from "../../features/appConfig/appSlice";
import Loading from "../common/Loading";
import { ReusableTable } from "../../components";
import { Link, useNavigate } from "react-router-dom";
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [apitrigger, setApiTrigger] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCartItems = async () => {
    const response = await API_WRAPPER.get("/cart/mycart");
    console.log("CART DATA: ", response.data);
    setCartItems(response.data);
  };

  const deleteCartItem = async (id) => {
    await API_WRAPPER.delete(`/cart/delete-cart/${id}`);
    setApiTrigger((a) => !a);
    dispatch(toggleRefresh());
  };

  const cartItemUpdate = async (id, quantity) => {
    console.log(id, quantity);
    await API_WRAPPER.put("/cart/update", { id, quantity });
    setApiTrigger((a) => !a);
    dispatch(toggleRefresh());
  };

  // Update the quantity of a cart item
  const updateQuantity = (id, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === id) {
        return { ...item, product_quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    cartItemUpdate(id, newQuantity);
  };

  const checkoutHandler = async () => {
    const response = await API_WRAPPER.post(`/checkout`);
    if (response.status == 200) {
      navigate("/checkout");
    }
  };

  useEffect(() => {
    getCartItems();
  }, [apitrigger]);
  console.log("CART ITEMS: ", cartItems);

  const columns = [
    {
      Header: "Image",
      accessor: "product_id.coverImage",
      Cell: ({ row }) => {
        return (
          <Link to={`/productInfo/${row.original.product_id.slug}`}>
            <img
              className="w-10 h-10"
              src={row.original.product_id.coverImage}
              alt=""
            />
          </Link>
        );
      },
    },
    {
      Header: "Product Name",
      accessor: "product_id.name",
    },
    {
      Header: "Price",
      accessor: "product_id.price",
    },
    {
      Header: "Quantity",
      accessor: "product_quantity",
      Cell: ({ row }) => {
        const { _id, product_quantity } = row.original;

        // Increase quantity handler
        const increaseQuantity = () => {
          const newQuantity = product_quantity + 1;
          cartItemUpdate(_id, newQuantity); // Update on the server
          updateQuantity(_id, newQuantity); // Update in local state
        };

        // Decrease quantity handler
        const decreaseQuantity = () => {
          if (product_quantity > 1) {
            const newQuantity = product_quantity - 1;
            cartItemUpdate(_id, newQuantity); // Update on the server
            updateQuantity(_id, newQuantity); // Update in local state
          }
        };

        return (
          <div>
            {/* ... (your existing JSX for input) */}
            <button
              type="button"
              onClick={decreaseQuantity}
              className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
            >
              &minus;
            </button>
            <input
              type="number"
              id="Quantity"
              value={product_quantity} // Bind value to product_quantity
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value, 10);
                if (!isNaN(newQuantity)) {
                  cartItemUpdate(_id, newQuantity); // Update on the server
                  updateQuantity(_id, newQuantity); // Update in local state
                }
              }}
              // ... (rest of your input attributes)
            />
            <button
              type="button"
              onClick={increaseQuantity}
              className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
            >
              +
            </button>
          </div>
        );
      },
    },
  ];

  const tableData = useMemo(() => {
    return cartItems;
  }, [cartItems]);

  return (
    <div>
      <Banner bannerImage={ShopBanner} text={"Cart"} navigation={"Home/Cart"} />

      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Your Cart
              </h1>
            </header>

            <div className="mt-8">
              <ReusableTable
                columns={columns}
                data={tableData}
                pageSize={10}
                showButtons
                enableDelete
                onDelete={(row) => deleteCartItem(row._id)}
                enablePagination
              />{" "}
              {/* Use the Table component with correct props */}
              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <div className="flex justify-end">
                    <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                      {/* Discount icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="-ms-1 me-1.5 h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                        />
                      </svg>
                      <p className="whitespace-nowrap text-xs">
                        2 Discounts Applied
                      </p>
                    </span>
                  </div>

                  <div className="flex justify-end">
                    <a
                      href="#"
                      onClick={checkoutHandler}
                      className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                    >
                      Checkout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
