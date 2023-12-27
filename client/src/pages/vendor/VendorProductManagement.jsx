import { Header, Modal, ReusableTable } from "../../components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import { useEffect, useMemo, useState } from "react";
import {
  debouncedShowToast,
  getStatusStyles,
  getStockStatusStyles,
} from "../../utils";
import API_WRAPPER, { baseUrl } from "../../api";
import { GoPlus } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import { BsUpload } from "react-icons/bs";
import ProductManagementBannerImage from "../../assets/bannerImages/productManagementImage.png";
import { Dropzone } from "../../components";
import ReuseTable from "../../components/ui/Table/ReuseTable";
import { saveAs } from "file-saver";

const ProductManagement = () => {
  const [productsList, setProductsList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [editedRow, setEditedRow] = useState({});
  const [apiTrigger, setApiTrigger] = useState(false);
  const [bulkData, setBulkData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isValidCSV, setIsValidCSV] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPagesShow, setTotalPagesShow] = useState(0);
  const [productLoading, setProductLoading] = useState(false);
  const [seacrhText, SetSearchTex] = useState("");

  const columns = useMemo(
    () => [
      {
        Header: "Product Image",
        Cell: ({ row }) => {
          const img = row?.original?.coverImage;
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
        Header: "Product Name",
        accessor: "name",
      },
      {
        Header: "Variant",
        Cell: ({ row }) => {
          return (
            <ul>
              {row?.original?.variant?.map((item) => (
                <li>{item?.name}</li>
              ))}
            </ul>
          );
        },
      },
      {
        Header: "Category Name",
        accessor: "category[0].name",
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
        Header: "Stock Quantity",
        accessor: "stockQuantity",
      },
      {
        Header: "Price",
        accessor: "price",
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
      setProductLoading(true);
      const response = await API_WRAPPER.get(
        `/get/products?page=${page}&pageSize=${pageSize}&seacrhText=${seacrhText}`
      );
      if (response.status === 200) {
        setProductLoading(false);
        setProductsList(response?.data.productsList);
        setTotalPagesShow(response?.data?.totalPages);
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
      navigate(
        `${PATHS.vendorEditProduct}/${row._id}?variantID=${row?.result._id}`
      );
    } else {
      navigate(`${PATHS.vendorEditProduct}/${row._id}/`);
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
      buFormData.append("file", bulkData);
      if (bulkData) {
        const response = await API_WRAPPER.post(
          "/vendor/products/bulk-upload",
          buFormData
        );
        if (response.status == 200) {
          // toast.success("uploaded successfully");
          window.product_management_Product_success.showModal();
          setLoading(false);
          fetchProductsList();
        }
      }
      console.log("ProductManagement.jsx", response);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const handleDownloadExcel = () => {
    // Function to handle downloading the XLSX file
    // Replace 'sample.xlsx' with your file name or fetch it from an API or a specific URL
    const url =
      "https://storage.cloud.google.com/staging.souvnirs-be.appspot.com/1702463462252Template456.xlsx"; //`${baseUrl}/1701254699154new.xlsx`;

    // Use 'saveAs' from file-saver library to initiate file download
    saveAs(url, "sample.xlsx");
  };

  const handleFileUpload = (event) => {
    console.log("...?", event.target?.files[0]);
    const file = event.target.files[0];
    setBulkData(file);
  };

  useEffect(() => {
    fetchProductsList();
  }, [apiTrigger, page, pageSize, seacrhText]);

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
                  // onChange={(e) => bulkUpload(e.target.files[0])}
                >
                  <BsUpload size={20} />
                  Bulk Upload
                </p>
              </li>
              <li>
                <Link to={PATHS.vendorAddProduct}>
                  <GoPlus size={20} />
                  Add Product
                </Link>
              </li>
            </ul>
          </details>
        </div>

        <div className="mt-4">
          <ReuseTable
            tableTitle="Product List"
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
      </div>

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
            <h3 className="font-bold text-xl ">Import products by XLSX</h3>
            <h4 className="mt-2">
              Download a sample XLSX template to see an examble of the format
              required.
            </h4>
            <hr className="mt-4" />
            <div className="w-full h-80 rounded-xl border-[1px] border-base-200 mt-4">
              {/* <Dropzone onFilesChange={(data) => setBulkData(data)} /> */}
              <input
                type="file"
                // value={bulkData}
                accept=".csv, .xlsx"
                onChange={(e) => {
                  handleFileUpload(e);
                  // setBulkData(e.target.files[0]);
                }}
              />
              {isValidCSV == false && <p>CSV or XLSX file is invalid</p>}
            </div>
            <div className="modal-action">
              <button
                onClick={handleDownloadExcel}
                className="btn bg-themeColor text-white flex items-center"
              >
                {/* Tailwind CSS icon for download */}
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                Download XLSX FORMATE
              </button>
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

      <dialog id="product_management_Product_success" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Changes submitted</h3>
          <p className="py-4">
            Thanks for submitting your changes. if approved, changes will be
            reflected within 24 hours.
          </p>
          <div className="modal-action">
            {/* <button onClick={deleteSelectedRow} className="btn btn-error">
              Delete
            </button> */}
            <button className="btn">Done</button>
          </div>
        </form>
      </dialog>
      <ToastContainer />
    </div>
  );
};

export default ProductManagement;
