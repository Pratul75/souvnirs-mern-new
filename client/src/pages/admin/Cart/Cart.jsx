import { Header, ReusableTable } from "../../../components";
// import HeaderImgTwo from "../../assets/images/headerImgTwo.png";
import { useMemo } from "react";
import { getStatusStyles } from "../../../utils";
import { ToastContainer } from "react-toastify";
import CartBannerImage from "../../../assets/bannerImages/productManagementImage.png";
import useCart from "./useCart";
import API_WRAPPER, { baseUrl } from "../../../api";
import ReuseTable from "../../../components/ui/Table/ReuseTable";
import { Link } from "react-router-dom";
const Cart = () => {
  const {
    cartList,
    handleDelete,
    handleEdit,
    handleEditChange,
    onHandleSubmit,
    selectedRow,
    getCartList,
    setPageSize,
    setPage,
    pageSize,
    page,
    totalPagesShow,
    productLoading,
    SetSearchTex,
    seacrhText,
  } = useCart();

  const PopUpDelete = async () => {
    const response = await API_WRAPPER.delete(
      `/cart/delete-cart/${selectedRow._id}`
    );
    getCartList();
  };

  const columns = useMemo(
    () => [
      {
        Header: "Image",
        accessor: `product.coverImage`,
        Cell: ({ row }) => {
          const img = row?.original?.product?.coverImage;
          return (
            <Link
              to={`/productInfo/${row?.original?.slug}`}
              className="cursor-pointer"
            >
              <img
                className="w-12 h-12 text-center rounded-lg hover:scale-105"
                src={
                  !img?.includes("res.cloudinary") &&
                  !img?.includes("cdn.shopify")
                    ? `${baseUrl}/${img}`
                    : img
                }
              />
            </Link>
          );
        },
      },
      {
        Header: "Name",
        accessor: `customer.firstName`,
      },
      {
        Header: "Name",
        accessor: `customer.email`,
      },
      {
        Header: "Product Name",
        accessor: "product.name",
      },
      {
        Header: "Product Price",
        accessor: "product.price",
      },
      {
        Header: "Product Quantity",
        accessor: "product_quantity",
      },
      {
        Header: "Total Order value",
        // accessor: "product.price",
        Cell: ({ row }) => {
          return (
            <>
              {row?.original?.product?.price * row?.original?.product_quantity}
            </>
          );
        },
      },
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

  const data = useMemo(() => cartList, [cartList]);

  return (
    <>
      <Header
        heading="Cart"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. sdfsdfse drf qwdefd fjhr f4 wedr w wdefd fjhr f4 wedr w  "
        image={CartBannerImage}
      />
      <div className="mt-8">
        {/* <ReusableTable
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
        /> */}
        <ReuseTable
          tableTitle="Cart List"
          columns={columns}
          data={data}
          showButtons
          enableEdit
          enableDelete
          onEdit={handleEdit}
          onDelete={handleDelete}
          enablePagination
          pageSize={10}
          setPageSizeshow={setPageSize}
          setPageNumber={setPage}
          pageSizeShow={pageSize}
          pageNumber={page}
          totalPagesShow={totalPagesShow}
          productLoading={productLoading}
          SetSearchTex={SetSearchTex}
          seacrhText={seacrhText}
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
            <button className="btn btn-error" onClick={PopUpDelete}>
              Delete
            </button>
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
