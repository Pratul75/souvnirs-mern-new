import { Header, ReusableTable } from "../../../components";
// import HeaderImgTwo from "../../assets/images/headerImgTwo.png";
import { useMemo } from "react";
import { getStatusStyles } from "../../../utils";
import { ToastContainer } from "react-toastify";
import CartBannerImage from "../../../assets/bannerImages/productManagementImage.png";
import useCart from "./useCart";
const Cart = () => {
  const {
    cartList,
    handleDelete,
    handleEdit,
    handleEditChange,
    onHandleSubmit,
    selectedRow,
  } = useCart();

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: `name`,
      },

      {
        Header: "Product Name",
        accessor: "product_name",
      },
      {
        Header: "Product Price",
        accessor: "product_price",
      },
      {
        Header: "Product Quantity",
        accessor: "product_quantity",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => {
          return getStatusStyles(row?.original?.status);
        },
      },
    ],
    []
  );

  const data = useMemo(() => cartList, [cartList]);

  return (
    <>
      <Header
        heading="Cart"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. sdfsdfse drf qwdefd fjhr f4 wedr w wdefd fjhr f4 wedr w  "
        image={CartBannerImage}
      />
      <div className="mt-8">
        <ReusableTable
          tableTitle="Cart List"
          columns={columns}
          data={data}
          showButtons
          enableDelete
          enableEdit
          enablePagination
          pageSize={10}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* edit modal */}
      <dialog id="cart_edit_modal" className="modal">
        <form
          onSubmit={(e) => onHandleSubmit(e)}
          method="dialog"
          className="modal-box"
        >
          <h3 className="font-bold text-lg">Edit</h3>
          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                className="input input-primary"
                type="text"
                name="product_name"
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow.product_name}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Price</span>
              </label>
              <input
                className="input input-primary"
                type="text"
                name="product_price"
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow.product_price}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Quantity</span>
              </label>
              <input
                className="input input-primary"
                type="text"
                name="product_price"
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow.product_quantity}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Quantity</span>
              </label>
              <input
                className="input input-primary"
                type="text"
                name="product_price"
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow.product_quantity}
              />
            </div>
          </div>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
            <button
              onClick={() => window.cart_edit_modal.close()}
              className="btn"
            >
              Close
            </button>
          </div>
        </form>
      </dialog>

      {/* delete modal */}
      <dialog id="cart_delete_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Are you sure you want to delete the selected cart?
          </p>
          <div className="modal-action flex">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-error">Delete</button>
            <button
              onClick={() => window.cart_delete_modal.close()}
              className="btn"
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
      <ToastContainer />
    </>
  );
};

export default Cart;
