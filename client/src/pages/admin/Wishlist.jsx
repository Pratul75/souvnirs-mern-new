import { useEffect, useMemo, useState } from "react";
import { Header, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";
import { getStatusStyles } from "../../utils";
import { ToastContainer, toast } from "react-toastify";

// wishlist
const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [selectedWishlist, setSelectedWishlist] = useState({});

  const fetchWishlist = async () => {
    console.log("Wishlist.jsx", "triggerd api");
    try {
      const response = await API_WRAPPER.get("/wishlist/getmywishlist");
      if (response.status === 200) {
        setWishlist(response?.data?.data?.wishlist);
        console.log("RESPONSE: ", response?.data?.data?.wishlist);
      }
    } catch (error) {
      console.error({ error, messge: error.message });
    }
    console.log("CustomerWishlist.jsx", wishlist);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Customer Name",
        accessor: "customer.firstName",
      },
      { Header: "Customer Email", accessor: "customer.email" },

      {
        Header: "Product Name",
        accessor: "product.name",
      },
      {
        Header: "product Price",
        accessor: "product.price",
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
  const data = useMemo(() => wishlist, [wishlist]);
  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleDelete = (row) => {
    setSelectedWishlist(row);
    window.whishlist_delete_modal.showModal();
  };

  const handleDeleteSubmit = async () => {
    const response = await API_WRAPPER.delete(
      `/wishlist/delete/getmywishlist/${selectedWishlist?._id}`
    );
    fetchWishlist();
    toast.success("Wishlist deleted");
  };

  return (
    <div>
      <Header
        heading="Admin Wishlist"
        subheading="A wish list  provides all the products added by the customer to wishlist . Customer can edit and delete the wishlist produts  from this UI"
      />
      <div className="w-full gap-4 mt-14">
        <div className="mt-4">
          <ReusableTable
            tableTitle="Wishlist"
            columns={columns}
            data={data}
            pageSize={"10"}
            showButtons
            enablePagination
            enableDelete
            onDelete={handleDelete}
          />
        </div>
      </div>
      <dialog id="whishlist_delete_modal" className="modal">
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
              onClick={() => window.whishlist_delete_modal.close()}
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

export default Wishlist;
