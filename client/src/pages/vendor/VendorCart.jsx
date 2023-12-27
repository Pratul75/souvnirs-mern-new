import { Header, ReusableTable } from "../../components";
// import HeaderImgTwo from "../../assets/images/headerImgTwo.png";
import API_WRAPPER from "../../api";
import { useEffect, useMemo, useState } from "react";
import { debouncedShowToast, getStatusStyles } from "../../utils";
import { ToastContainer } from "react-toastify";
import ReuseTable from "../../components/ui/Table/ReuseTable";

const VendorCart = () => {
  const [cartList, setCartList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [editedCart, setEditedCart] = useState({});
  const [apiTrigger, setApiTrigger] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPagesShow, setTotalPagesShow] = useState(0);
  const [productLoading, setProductLoading] = useState(false);
  const [seacrhText, SetSearchTex] = useState("");

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: `customer.firstName`,
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

  const handleEditChange = (e) => {
    setEditedCart({ ...editedCart, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      setProductLoading(true);
      const response = await API_WRAPPER.put(
        `/cart/update-cart/:${selectedRow._id}`,
        editedCart
      );
      if (response?.status) {
        setProductLoading(false);
        setApiTrigger((prevState) => !prevState);
        debouncedShowToast("Selected row updated successfully!");
        window.cart_edit_modal.close();
      }
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };

  const getCartList = async () => {
    try {
      const response = await API_WRAPPER.get(
        `/cart/get-all-carts/list?page=${page}&pageSize=${pageSize}&seacrhText=${seacrhText}`
      );
      if (response.status === 200) {
        console.log("++++_______-___-____-___", response?.data);
        setCartList(response.data?.carts);
        setTotalPagesShow(response.data?.totalPages);
        // debouncedShowToast("Cart list loaded successfully", "success");
        console.log("Cart List: ", response?.data);
      }
      // const response = await API_WRAPPER.get("/cart/get-all-carts");
      // if (response.status === 200) {
      //   setCartList(response.data);
      //   debouncedShowToast("Cart list loaded successfully", "success");
      //   console.log("Cart List: ", response?.data);
      // }
    } catch (error) {
      debouncedShowToast(error.message, "error");
      console.error("Error occured while fetching all cart list", error);
    }
  };

  const handleDelete = (row) => {
    console.log("ROW TO BE DELETED: ", row);
    window.cart_delete_modal.showModal();
    setSelectedRow(row);
  };

  const handleEdit = (row) => {
    window.cart_edit_modal.showModal();
    console.log("ROW TO BE EDITED: ", row);
    setSelectedRow(row);
  };

  useEffect(() => {
    getCartList();
  }, [apiTrigger, page, pageSize, seacrhText]);

  return (
    <>
      <Header
        heading="Cart"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. sdfsdfse drf qwdefd fjhr f4 wedr w wdefd fjhr f4 wedr w  "
        // image={HeaderImgTwo}
      />
      <div className="mt-8">
        {/* <ReusableTable
          tableTitle="Cart List"
          columns={columns}
          data={data}
          showButtons
          enableDelete
          enableEdit
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

export default VendorCart;
