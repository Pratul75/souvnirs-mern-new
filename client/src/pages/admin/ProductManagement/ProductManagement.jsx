import { Header, ReusableTable } from "../../../components";
import { Link } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import { Suspense, useMemo, useState } from "react";
import { getStatusStyles, getStockStatusStyles } from "../../../utils";
import { GoPlus } from "react-icons/go";
import { ToastContainer } from "react-toastify";
import { BsUpload } from "react-icons/bs";
import ProductManagementBannerImage from "../../../assets/bannerImages/productManagementImage.png";
import Loading from "../../common/Loading";
import useProductManagement from "./useProductManagement";
import { baseUrl } from "../../../api";
import ReuseTable from "../../../components/ui/Table/ReuseTable";
import { saveAs } from "file-saver";

let FilterData = [
  {
    id: 1,
    name: "Price",
    data: [
      {
        sortBy: "highest to lowest",
        icon: "↑",
        value: "high to low",
      },
      {
        sortBy: "lowest to highest",
        icon: "↓",
        value: "low",
      },
    ],
  },
  {
    id: 2,
    name: "Name",
    data: [
      {
        sortBy: "A to Z",
        icon: "↑",
        value: "A to Z",
      },
      {
        sortBy: "Z to A",
        icon: "↓",
        value: "Z to A",
      },
    ],
  },
  {
    id: 3,
    name: "Status",
    data: [
      {
        sortBy: "Active",
        icon: "",
        value: "Active",
      },
      {
        sortBy: "Deactive",
        icon: "",
        value: "Deactive",
      },
      {
        sortBy: "Pending",
        icon: "",
        value: "Pending",
      },
    ],
  },
  {
    id: 4,
    name: "Inventory",
    data: [
      {
        sortBy: "Highest to Lowest",
        icon: "↑",
        value: "High to Low",
      },
      {
        sortBy: "Lowest to Highest",
        icon: "↓",
        value: "Low to High",
      },
    ],
  },
  {
    id: 5,
    name: "Created",
    data: [
      {
        sortBy: "Oldest First",
        icon: "↑",
        value: "Oldest First",
      },
      {
        sortBy: "Newest First",
        icon: "↓",
        value: "Newest First",
      },
    ],
  },
  {
    id: 6,
    name: "Updated",
    data: [
      {
        sortBy: "Oldest First",
        icon: "↑",
        value: "Oldest First",
      },
      {
        sortBy: "Newest First",
        icon: "↓",
        value: "Newest First",
      },
    ],
  },
  {
    id: 7,
    name: "Vendor",
    data: [
      {
        sortBy: "A to Z",
        icon: "↑",
        value: "A to Z",
      },
      {
        sortBy: "Z to A",
        icon: "↓",
        value: "Z to A",
      },
    ],
  },
];

const ProductManagement = () => {
  const {
    alterApproval,
    bulkUpload,
    data,
    deleteSelectedRow,
    disapprovalComment,
    error,
    handleDelete,
    handleEdit,
    loading,
    selectedRow,
    setBulkData,
    setDisapprovalComment,
    seterror,
    setSelectedRow,
    bulkData,
    setPageSize,
    setPage,
    pageSize,
    page,
    totalPagesShow,
    productLoading,
    SetSearchTex,
    seacrhText,
    FilterDataCall,
    ResetFilter,
  } = useProductManagement();
  const [isValidCSV, setIsValidCSV] = useState();
  const [selectedSort, setSelectedSort] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("default-radio-2"); // Initial checked option
  const [presentData, setPresentData] = useState("");

  const options = [
    {
      id: "default-radio-1",
      label: "Default radio",
    },
    {
      id: "default-radio-2",
      label: "Checked state",
    },
    {
      id: "default-radio-3",
      label: "Default radio",
    },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDownloadExcel = () => {
    // Function to handle downloading the XLSX file
    // Replace 'sample.xlsx' with your file name or fetch it from an API or a specific URL
    const url =
      "https://storage.cloud.google.com/staging.souvnirs-be.appspot.com/1702463462252Template456.xlsx"; //`${baseUrl}/1701254699154new.xlsx`;

    // Use 'saveAs' from file-saver library to initiate file download
    saveAs(url, "sample.xlsx");
  };

  const selectOption = (option) => {
    console.log("====>____", option);
    setSelectedOption(option?.id);
    setSelectedSort(option);
    // setIsOpen(false);
  };
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
        Header: "Vendor Name",
        accessor: "vendor.firstName",
        Cell: ({ row }) => {
          console.log("===>III", row);
          return (
            <div>
              {row?.original?.vendor?.firstName}&nbsp;
              {row?.original?.vendor?.lastName}
            </div>
          );
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
        Header: "Stock Quantity",
        accessor: "stockQuantity",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Approval",
        Cell: ({ row }) => {
          // console.log("ProductManagement.jsx", row);
          return (
            <div>
              {row?.original?.approved == false ? (
                <button
                  onClick={() => {
                    // setSelectedRow(row?.original);
                    alterApproval(row?.original?._id, true);
                  }}
                  className="btn btn-sm btn-primary"
                >
                  Approve
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedRow(row?.original);
                    window.disapproval_modal.showModal();
                    // alterApproval(row?.original?._id, true);
                  }}
                  className="btn btn-sm btn-primary"
                >
                  Disapprove
                </button>
              )}
            </div>
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setBulkData(file);

    // Papa.parse(file, {
    //   complete: (result) => {
    //     if (result.data && result.data.length > 0) {
    //       const firstObject = result.data[0];
    //       const expectedKeys = [
    //         "_id",
    //         "name",
    //         "vendorId",
    //         "categoryId",
    //         "slug",
    //         "description",
    //         "coverImage",
    //         "mrp",
    //         "onSale",
    //         "attributes",
    //         "stockStatus",
    //         "images",
    //         "status",
    //         "approved",
    //       ];

    //       // Check if the first object contains all expected keys
    //       const keysMatch = expectedKeys.every((key) =>
    //         firstObject.hasOwnProperty(key)
    //       );

    //       if (keysMatch) {
    //         setIsValidCSV(true);
    //       } else {
    //         setIsValidCSV(false);
    //       }
    //     } else {
    //       setIsValidCSV(false);
    //     }
    //   },
    //   header: true,
    // });
  };

  const handleSelectChange = () => {};

  const handleSort = (item) => {
    console.log("____>MMM", item);
    setPresentData(item?.sortBy);
    FilterDataCall(item, selectedSort);
    setIsOpen(false);
  };

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
                <Link to={PATHS.adminAddProducts}>
                  <GoPlus size={20} />
                  Add Product
                </Link>
              </li>
            </ul>
          </details>
          {/* <div className="w-full">
            <select
              className="w-full p-2 bg-white rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              onChange={handleSelectChange}
              value={selectedSort}
            >
              <option value="">Sort By</option>
              <optgroup label="Price Wise">
                <option value="price-asc">Low to High</option>
                <option value="price-desc">High to Low</option>
              </optgroup>
              <optgroup label="Title Wise">
                <option value="title-asc">A to Z</option>
                <option value="title-desc">Z to A</option>
              </optgroup>
              <optgroup label="Latest Wise">
                <option value="latest">Latest</option>
              </optgroup>
            </select>
          </div> */}
          <div className="relative inline-block text-left">
            <button
              onClick={toggleDropdown}
              className="input input-bordered w-full mx-2 md:w-auto md:mb-0 mt-1 inline-flex items-center"
            >
              {presentData ? presentData : "Select Sort By"}
              <svg
                className={`w-2.5 h-2.5 ml-2.5 ${
                  isOpen ? "transform rotate-180" : ""
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1 4 4 4-4"
                />
              </svg>
            </button>
            {isOpen && (
              <div className="select-primary absolute z-10 w-48 mt-2 bg-base-100 divide-y border divide-gray-100 rounded-lg shadow ">
                <ul
                  className=" p-3 space-y-3 text-sm"
                  aria-labelledby="dropdownRadioButton"
                >
                  {FilterData.map((option) => (
                    <li key={option.id}>
                      <div className="flex items-center">
                        <input
                          id={option.id}
                          type="radio"
                          value={option.id}
                          name="default-radio"
                          checked={selectedOption === option.id}
                          onChange={() => selectOption(option)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor={option.id}
                          className="ml-2 text-sm font-medium"
                        >
                          {option.name}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
                <hr />
                {selectedSort &&
                  selectedSort?.data?.map((itemss, index) => (
                    <ul
                      onClick={() => handleSort(itemss)}
                      className="cursor-pointer hover:bg-blue-500 pl-2 p-0.3"
                    >
                      {itemss.icon} {itemss?.sortBy}
                    </ul>
                  ))}
              </div>
            )}
          </div>
          <div className="relative inline-block text-left">
            <button
              onClick={ResetFilter}
              className="input input-bordered w-full mx-2 md:w-auto md:mb-0 mt-1 inline-flex items-center"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mt-4">
          <Suspense fallback={<Loading />}>
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
          </Suspense>
        </div>
      </div>

      <dialog id="disapproval_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Do you want to disapprove {selectedRow.name}
          </h3>
          <label htmlFor="" className="label">
            comment
          </label>
          <input
            onChange={(e) => setDisapprovalComment(e.target.value)}
            className="input input-primary"
          />{" "}
          <span className="text-red-600">{error && error}</span>
          <div className="modal-action">
            <button
              className="btn btn-primary"
              onClick={() => {
                if (!disapprovalComment) {
                  seterror("please enter a comment");
                  return;
                }
                // console.log("{}}{", selectedRow);
                alterApproval(selectedRow._id, false, disapprovalComment);
              }}
            >
              Disapprove
            </button>
            <button
              onClick={() => {
                window.disapproval_modal.close();
                seterror("");
                setDisapprovalComment("");
              }}
              className="btn"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>

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
            {/* Download XLSX button with Tailwind CSS icon */}
          </div>
        </form>
      </dialog>
      <ToastContainer />
    </div>
  );
};

export default ProductManagement;

//  <div className="w-full">
//    <div className="mb-2">
//      <label className="block font-bold">Select Options:</label>
//      <div className="flex items-center">
//        <input
//          type="checkbox"
//          checked={selectedOptions.length === options.length}
//          onChange={handleSelectAll}
//        />
//        <label className="ml-2">Select All</label>
//      </div>
//    </div>
//    <div className="mb-2">
//      {options.map((option) => (
//        <div key={option}>
//          <label className="block">
//            <input
//              type="checkbox"
//              checked={selectedOptions.includes(option)}
//              onChange={() => toggleOption(option)}
//            />
//            {option}
//          </label>
//        </div>
//      ))}
//    </div>
//    <button
//      className="bg-blue-500 text-white py-2 px-4 rounded"
//      onClick={() => handleSelection(selectedOptions)}
//    >
//      Apply Selection
//    </button>
//  </div>;
