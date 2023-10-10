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
  } = useProductManagement();
  const [isValidCSV, setIsValidCSV] = useState();

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
                  Disapprove
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
                  Approve
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

    Papa.parse(file, {
      complete: (result) => {
        if (result.data && result.data.length > 0) {
          const firstObject = result.data[0];
          const expectedKeys = [
            "_id",
            "name",
            "vendorId",
            "categoryId",
            "slug",
            "description",
            "coverImage",
            "mrp",
            "onSale",
            "attributes",
            "stockStatus",
            "images",
            "status",
            "approved",
          ];

          // Check if the first object contains all expected keys
          const keysMatch = expectedKeys.every((key) =>
            firstObject.hasOwnProperty(key)
          );

          if (keysMatch) {
            setIsValidCSV(true);
          } else {
            setIsValidCSV(false);
          }
        } else {
          setIsValidCSV(false);
        }
      },
      header: true,
    });
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
              {/* <Dropzone onFilesChange={(data) => setBulkData(data)} /> */}
              <input
                type="file"
                accept=".csv"
                onChange={(e) => {
                  handleFileUpload(e);
                  // setBulkData(e.target.files[0]);
                }}
              />
              {isValidCSV == false && <p>CSV file is invalid</p>}
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
