import { Header, ReusableTable } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import { Suspense, useEffect, useMemo, useState } from "react";
import {
  debouncedShowToast,
  getStatusStyles,
  getStockStatusStyles,
} from "../../utils";
import API_WRAPPER from "../../api";
import { GoPlus } from "react-icons/go";
import { ToastContainer } from "react-toastify";
import { BsUpload } from "react-icons/bs";
import ProductManagementBannerImage from "../../assets/bannerImages/productManagementImage.png";
import { Dropzone } from "../../components";
import Loading from "../common/Loading";
const ProductManagement = () => {
  const [productsList, setProductsList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [editedRow, setEditedRow] = useState({});
  const [apiTrigger, setApiTrigger] = useState(false);
  const [bulkData, setBulkData] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: "Product Image",
        accessor: "name",
        Cell: ({ row }) => {
          return (
            <Link
              to={`/productInfo/${row?.original?.slug}`}
              className="cursor-pointer "
            >
              <img
                className="w-12 h-12 text-center rounded-full hover:scale-105"
                src={row?.original?.coverImage}
                alt=""
              />
            </Link>
          );
        },
      },
      {
        Header: "Variant",
        Cell: ({ row }) => {
          if (row?.original?.result?.variant) {
            const keys = Object.keys(row?.original?.result?.variant);

            return keys.map((key) => (
              <p>
                {key}:{row?.original?.result?.variant[key]}
              </p>
            ));
          } else {
            return <p> </p>;
          }
        },
      },
      {
        Header: "Price",
        accessor: "result.price",
        Cell: ({ row }) => {
          console.log("ProductManagement.jsx", row);
          return row.original?.result?.price
            ? row?.original?.result?.price
            : row?.original?.price;
        },
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
        accessor: "result.quantity",
        Cell: ({ row }) => {
          console.log("ProductManagement.jsx", row);
          return row.original?.result?.price
            ? row?.original?.result?.quantity
            : row?.original?.stockQuantity;
        },
      },
      {
        Header: "Stock Status",
        accessor: "stockStatus",
        Cell: ({ row }) => {
          return getStockStatusStyles(row?.original?.stockStatus);
        },
      },
      {
        Header: "Total Sales",
        accessor: "totalSales",
      },
      {
        Header: "Approval",
        Cell: ({ row }) => {
          return (
            <button
              onClick={() => debouncedShowToast("Product Approved", "success")}
              className="btn btn-sm btn-primary"
            >
              Approve
            </button>
          );
        },
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
    console.log("ROW TO BE DELETED: ", row);
    if (row?.result?._id) {
      navigate(`${PATHS.EditProduct}/${row._id}?variantID=${row?.result._id}`);
    } else {
      navigate(`${PATHS.EditProduct}/${row._id}/`);
    }
    // window.edit_product_modal.showModal();
    // setSelectedRow(row);
    // console.log("ROW TO BE EDITED: ", row);
  };

  const handleEditChange = (e) => {
    setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
  };

  const submitEditedRow = async (updatedVal) => {
    const response = await API_WRAPPER.put(
      `/products/edit-product/:${selectedRow._id}`,
      updatedVal
    );
    if (response.status === 200) {
      setApiTrigger((prevState) => !prevState);
      window.product_management_edit_modal.close();
      debouncedShowToast(response.data.data);
      console.log(
        "EDITED SUCCESSFULLY WITH THE FOLLOWING RESPONSE: ",
        response?.status
      );
    } else {
      debouncedShowToast(response.data.data.error, "error");
    }
  };
  const handleSave = (inputValues) => {
    console.log("SAVING THE INPUT VALUES: ", inputValues);
    submitEditedRow(inputValues);
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
      debouncedShowToast(response?.data?.data, "success");
    } else {
      debouncedShowToast(response?.data?.data.error, "error");
    }
  };
  const bulkUpload = async () => {
    try {
      setLoading(true);
      console.log("ProductManagement.jsx", bulkData);
      const buFormData = new FormData();
      buFormData.append("file", bulkData[0]);
      const response = await API_WRAPPER.post(
        "/products/bulk-upload",
        buFormData
      );
      if (response.status == 200) {
        setLoading(false);
      }
      console.log("ProductManagement.jsx", response);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    fetchProductsList();
  }, [apiTrigger]);

  return (
    <div>
      {loading && (
        <div className="w-screen h-screen absolute top-0 left-0 bg-slate-50 opacity-40 flex justify-center items-center z-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      <Header
        heading="Product Management"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's "
        image={ProductManagementBannerImage}
      />
      <div className="w-full gap-4 mt-14 relative">
        <div className="flex absolute right-0">
          <details className="dropdown dropdown-top md:dropdown-left">
            <summary className="m-1 btn bg-themeColor text-white">
              Add Products
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <p
                  onClick={() => window.my_modal_1.showModal()}
                  onChange={(e) => bulkUpload(e.target.files[0])}
                >
                  <BsUpload size={20} />
                  Bulk Upload
                </p>
              </li>
              <li>
                <Link to={PATHS.adminAddProducts}>
                  <GoPlus size={20} />
                  Add Product
                </Link>
              </li>
            </ul>
          </details>
        </div>

        <div className="mt-4">
          <Suspense fallback={<Loading />}>
            <ReusableTable
              columns={columns}
              data={data}
              showButtons
              enableEdit
              enableDelete
              onEdit={handleEdit}
              onDelete={handleDelete}
              pageSize={10}
              enablePagination
            />
          </Suspense>
        </div>
      </div>

      {/* edit modal  */}
      {/* <Modal
        id="edit_product_modal"
        title="Are you sure you want to delete the selected value?"
        onClose={() => {
          window.edit_product_modal.close();
        }}
        onSave={handleSave}
        defaultValues={{
          name: selectedRow?.name,
          description: selectedRow?.description,
          stockQuantity: selectedRow?.stockQuantity,
          stockStatus: selectedRow?.stockStatus,
          price: selectedRow?.price,
          totalSales: selectedRow?.totalSales,
          onSale: selectedRow?.onSale,
          status: selectedRow?.status,
        }}
        inputs={[
          {
            label: "Product Name",
            type: "text",
            name: "name",
          },
          {
            label: "description",
            type: "text",
            name: "description",
          },
          {
            label: "Stock Quantity",
            type: "text",
            name: "stockQ",
          },
          {
            label: "Stock Status",
            type: "text",
            name: "stockStatus",
          },
          {
            label: "price",
            type: "number",
            name: "price",
          },
          {
            label: "Total Sales",
            type: "number",
            name: "totalSales",
          },
          {
            label: "On Sale",
            type: "text",
            name: "onSale",
          },
          {
            label: "Status",
            type: "text",
            name: "status",
          },
        ]}
      /> */}

      {/* delete modal */}
      <dialog id="product_management_delete_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Are you sure you want to delete the selected product?
          </p>
          <div className="modal-action">
            <button onClick={deleteSelectedRow} className="btn btn-error">
              Delete
            </button>
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>

      {/* bulk modal */}
      {/* Open the modal using ID.showModal() method */}

      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box p-0  w-3/4 max-w-5xl">
          <div className="p-4">
            <h3 className="font-bold text-xl ">Import products by CSV</h3>
            <h4 className="mt-2">
              Download a sample SVG template to see an examble of the format
              required.
            </h4>
            <hr className="mt-4" />
            <div className="w-full h-80 rounded-xl border-[1px] border-base-200 mt-4">
              <Dropzone onFilesChange={(data) => setBulkData(data)} />
            </div>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={bulkUpload}
                className="btn bg-themeColor text-white"
              >
                Upload & Preview
              </button>
              <button className="btn">Close</button>
            </div>
          </div>
        </form>
      </dialog>
      <ToastContainer />
    </div>
  );
};

export default ProductManagement;
