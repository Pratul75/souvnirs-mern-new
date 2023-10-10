import { Header, ReusableTable } from "../../components";
import ReplacementBannerImage from "../../assets/bannerImages/refundImage.png";
import API_WRAPPER from "../../api";
import { useEffect, useMemo, useState } from "react";
import { getStatusStyles } from "../../utils";
import { ToastContainer, toast } from "react-toastify";

const OrderStatus = [
  "ordered",
  "processing",
  "shipped",
  "delivered",
  "decline",
  "refund",
  "replace",
];

const Replacement = () => {
  // /order/get/replace-orders
  const [ReplaceList, setReplaceList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const fetchWishlist = async () => {
    console.log("Wishlist.jsx", "triggerd api");
    try {
      const response = await API_WRAPPER.get("/order/get/replace-orders");
      if (response.status === 200) {
        console.log("RESPONSE:============??????????=> ", response?.data);
        setReplaceList(response?.data);
      }
    } catch (error) {
      console.error({ error, messge: error.message });
    }
    console.log("CustomerWishlist.jsx", wishlist);
  };

  const handleSelectChange = async (row, value) => {
    ///order/update-order/:id
    const response = await API_WRAPPER.put(`/order/update-order/:${row?._id}`, {
      order_status: value,
    });
    fetchWishlist();
  };

  const columns = useMemo(
    () => [
      {
        Header: "Customer Name",
        accessor: "customer.firstName",
        Cell: ({ row }) => {
          return (
            <div>
              <p>
                {row?.original?.customer_id?.firstName}{" "}
                {row?.original?.customer_id?.lastName}
              </p>
            </div>
          );
        },
      },
      { Header: "Order Id", accessor: "courier_id" },
      {
        Header: "Product Name",
        accessor: "product_id.name",
      },
      {
        Header: "Discout",
        accessor: "discounts",
      },
      {
        Header: "Order Status",
        accessor: "order_status",
        Cell: ({ row }) => {
          return (
            <select
              onChange={(e) =>
                handleSelectChange(row?.original, e?.target?.value)
              }
            >
              {OrderStatus?.map((item, index) => (
                <option
                  selected={row?.original?.order_status == item}
                  key={index}
                  value={item}
                >
                  {item}
                </option>
              ))}
              {/* <p>
                {row?.original?.customer_id?.firstName}{" "}
                {row?.original?.customer_id?.lastName}
              </p> */}
            </select>
          );
        },
      },
      {
        Header: "Payment Method",
        accessor: "payment_method",
      },
      {
        Header: "Total Price",
        accessor: "total_price",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => {
          return getStatusStyles(
            row?.original?.status,
            row?.original,
            fetchWishlist
          );
        },
      },
    ],
    []
  );
  // customer_id;

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleDelete = (row) => {
    setSelectedRow(row);
    window.replace_delete_modal.showModal();
  };
  const handleDeleteSubmit = async () => {
    const response = await API_WRAPPER.delete(
      `/order/delete-order/:${selectedRow?._id}`
    );
    toast.success("Delete order");
    fetchWishlist;
    // /order/delete-order/:id
  };

  return (
    <div>
      <Header
        heading="Replacement"
        subheading="This is a subheading for the replacement section. This subheading contins necessary details that"
        image={ReplacementBannerImage}
      />
      <div className="w-full gap-4 mt-14">
        <div className="mt-4">
          <ReusableTable
            tableTitle="Wishlist"
            columns={columns}
            data={ReplaceList}
            pageSize={10}
            showButtons
            enablePagination
            enableDelete
            onDelete={handleDelete}
          />
        </div>
      </div>
      <dialog id="replace_delete_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Are you sure you want to delete the selected refund?
          </p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() => handleDeleteSubmit()}
              className="btn btn-error"
            >
              Delete
            </button>
            <button
              className="btn"
              onClick={() => window.replace_delete_modal.close()}
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
      <ToastContainer />
    </div>
  );
};

export default Replacement;
