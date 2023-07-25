import { Header, ReusableTable } from "../../components";
import { Link } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { useEffect, useMemo, useState } from "react";
import { debouncedShowToast, getStatusStyles } from "../../utils";
import API_WRAPPER from "../../api";
import { GoPlus } from "react-icons/go";
import { ToastContainer } from "react-toastify";

const ProductManagement = () => {
  const [productsList, setProductsList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [editedRow, setEditedRow] = useState({});
  const [apiTrigger, setApiTrigger] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "name",
      },
      {
        Header: "Slug",
        accessor: "slug",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "On Sale",
        accessor: "onSale",
        Cell: ({ row }) => {
          return (
            <p>
              {row?.original?.onSale ? (
                <span className="text-green-600">YES</span>
              ) : (
                <span className="text-rose-600">NO</span>
              )}
            </p>
          );
        },
      },
      {
        Header: "Stock Quantity",
        accessor: "stockQuantity",
      },
      {
        Header: "Stock Status",
        accessor: "stockStatus",
      },
      {
        Header: "Total Sales",
        accessor: "totalSales",
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

  const data = useMemo(() => productsList, [productsList]);

  const fetchProductsList = async () => {
    try {
      const response = await API_WRAPPER.get("/products/get-all-products");
      if (response.status === 200) {
        setProductsList(response?.data);
        console.log("RESPONSE: ", response?.data);

      }
    } catch (error) {
      console.error({ error, messge: error.message });
    }
  };

  const handleDelete = (row) => {
    console.log("ROW TO BE DELETED: ", row);
    setSelectedRow(row);
    window.product_management_delete_modal.showModal();
  };

  const handleEdit = (row) => {
    window.product_management_edit_modal.showModal();
    setSelectedRow(row);
    console.log("ROW TO BE EDITED: ", row);
  };

  const handleEditChange = (e) => {
    setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
  };

  const submitEditedRow = async () => {
    const response = await API_WRAPPER.put(
      `/products/edit-product/:${selectedRow._id}`,
      editedRow
    );
    if (response.status === 200) {
      setApiTrigger((prevState) => !prevState);
      window.product_management_edit_modal.close();
      debouncedShowToast(response.data.data)
      console.log(
        "EDITED SUCCESSFULLY WITH THE FOLLOWING RESPONSE: ",
        response?.status
      );
    } else {
      debouncedShowToast(response.data.data.error, "error")
    }
  };

  const deleteSelectedRow = async () => {
    const response = await API_WRAPPER.delete(
      `/products/delete-product/:${selectedRow._id}`
    );
    if (response.status === 200) {
      setApiTrigger((prevState) => !prevState);
      console.log(
        "SELECTED ROW IS DELETED WITH FOLLOWING RESPONSE: ",
        response?.data
      );
      debouncedShowToast(response?.data?.data, "success")
    } else {
      debouncedShowToast(response?.data?.data.error, "error")
    }
  };

  useEffect(() => {
    fetchProductsList();
  }, [apiTrigger]);

  return (
    <div>
      <Header
        heading="Product Management"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's "
      // image={HeaderImgTwo}
      />
      <div className="w-full gap-4 mt-14">
        <div className="flex justify-end">
          <Link
            to={PATHS.adminAddProducts}
            className="btn btn-accent ml-4 w-48"
          >
            <GoPlus size={20} />
            Add Product
          </Link>
        </div>

        <div className="mt-4">
          <ReusableTable
            tableTitle="Products List"
            columns={columns}
            data={data}
            showButtons
            enableEdit
            enableDelete
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* edit modal  */}
      <dialog id="product_management_edit_modal" className="modal">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitEditedRow();
          }}
          method="dialog"
          className="modal-box"
        >
          <h3 className="font-bold">Edit Product</h3>
          <hr className="my-4" />
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control col-span-2">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow?.name}
                className="input input-accent"
                type="text"
                name="name"
                id=""
              />
            </div>
            <div className="form-control col-span-2">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow?.description}
                className="input input-accent"
                type="text"
                name="description"
                id=""
              />
            </div>

            <div className="form-control col-span-1">
              <label className="label">
                <span className="label-text">Stock Quantity</span>
              </label>
              <input
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow?.stockQuantity}
                className="input input-accent"
                type="text"
                name="stockQuantity"
                id=""
              />
            </div>
            {/* "IN_STOCK", "OUT_OF_STOCK", "BACK_ORDER" */}
            <div className="form-control col-span-1">
              <label className="label">
                <span className="label-text">Stock Status</span>
              </label>
              <select
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow?.stockStatus}
                className="select select-accent"
                name="stockStatus"
              >
                <option value="IN_STOCK">IN STOCK</option>
                <option value="OUT_OF_STOCK">IN STOCK</option>
                <option value="BACK_ORDER">BACK ORDER</option>
              </select>
            </div>
            <div className="form-control col-span-1">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow?.price}
                className="input input-accent"
                type="text"
                name="price"
                id=""
              />
            </div>
            <div className="form-control col-span-1">
              <label className="label">
                <span className="label-text">Total Sales</span>
              </label>
              <input
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow?.totalSales}
                className="input input-accent"
                type="text"
                name="totalSales"
                id=""
              />
            </div>

            <div className="form-control col-span-1">
              <label className="label">
                <span className="label-text">On Sale</span>
              </label>
              <select
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow?.onSale}
                className="select select-accent"
                name="onSale"
                id=""
              >
                <option value={true}>YES</option>
                <option value={false}>NO</option>
              </select>
            </div>
            <div className="form-control col-span-1">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow?.status}
                className="select select-accent"
                name="status"
                id=""
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="DEACTIVE">DEACTIVE</option>
                <option value="PENDING">PENDING</option>
              </select>
            </div>
          </div>

          <div className="modal-action flex gap-4">
            <button type="submit" className="btn btn-accent">
              Save Changes
            </button>
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() => window.product_management_edit_modal.close()}
              className="btn"
            >
              Close
            </button>
          </div>
        </form>
      </dialog>

      {/* delete modal */}
      <dialog id="product_management_delete_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Are you sure you want to delete the selected product?
          </p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button onClick={deleteSelectedRow} className="btn btn-error">
              Delete
            </button>
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
      <ToastContainer />
    </div>
  );
};

export default ProductManagement;
