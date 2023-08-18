import { useEffect, useMemo, useState } from "react";
import ShopBanner from "../../assets/shop/bannerImages/shopBanner.png";
import Banner from "./Banner";
import API_WRAPPER from "../../api";
import { useDispatch } from "react-redux";
import { toggleRefresh } from "../../features/appConfig/appSlice";
import Loading from "../common/Loading";
import { ReusableTable } from "../../components";

const CartPage = () => {
  const [cartItems, setCartItems] = useState();
  const [apitrigger, setApiTrigger] = useState(false);
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "product_id.coverImage",
      },
      // {
      //   Header: "HSN Id",
      //   accessor: "",
      // },
      // {
      //   Header: "Type",
      //   accessor: "type",
      // },
      // {
      //   Header: "Status",
      //   accessor: "status",
      //   Cell: ({ row }) => {
      //     return getStatusStyles(row?.original?.status);
      //   },
      // },
    ],
    []
  );

  const getCartItems = async () => {
    const response = await API_WRAPPER.get("/cart/mycart");
    console.log("wishlist.jsx", response);
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

  useEffect(() => {
    getCartItems();
  }, [apitrigger]);

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
              <ul className="space-y-4">
                <ReusableTable
                  tableTitle="Categories List"
                  data={cartItems}
                  columns={columns}
                  showButtons
                  enableDelete
                  enableEdit
                  enablePagination
                  pageSize={10}
                  // onDelete={handleDelete}
                  // onEdit={handleEdit}
                />
                {cartItems && cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <li className="flex items-center gap-4">
                      <img
                        src={item.product_id.coverImage}
                        alt=""
                        className="h-16 w-16 rounded object-cover"
                      />

                      <div>
                        <h3 className="text-sm text-gray-900">
                          {item.product_id.name}
                        </h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            {/* <dt className="inline">Size:</dt>
                            <dd className="inline">XXS</dd> */}
                          </div>

                          <div>
                            {/* <dt className="inline">Color:</dt>
                            <dd className="inline">White</dd> */}
                          </div>
                        </dl>
                      </div>

                      <div className="flex flex-1 items-center justify-end gap-2">
                        <form>
                          <label htmlFor="Line1Qty" className="sr-only">
                            {" "}
                            Quantity{" "}
                          </label>

                          <input
                            type="number"
                            min="1"
                            className="input"
                            value={item.product_quantity}
                            onChange={(e) =>
                              cartItemUpdate(item._id, e.target.value)
                            }
                            id="Line1Qty"
                          />
                        </form>

                        <button
                          onClick={() => {
                            // console.log(item._id);
                            deleteCartItem(item._id);
                          }}
                          className="text-gray-600 transition hover:text-red-600"
                        >
                          <span className="sr-only">Remove item</span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <h2>Nothing in cart. Add items to see</h2>
                )}
              </ul>

              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    {/* <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>£250</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>VAT</dt>
                      <dd>£25</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>Discount</dt>
                      <dd>-£20</dd>
                    </div> */}

                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>
                        {cartItems && cartItems.length > 0
                          ? cartItems.reduce((total, item) => {
                              return (
                                total +
                                item.product_quantity * +item.product_id.price
                              );
                            }, 0)
                          : 0}
                      </dd>
                    </div>
                  </dl>

                  <div className="flex justify-end">
                    <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
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
