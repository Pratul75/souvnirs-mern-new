import { Header, Modal, ReusableTable } from "../../components";
import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import { useEffect, useMemo, useState } from "react";
import {
  debouncedShowToast,
  getStatusStyles,
  getStockStatusStyles,
} from "../../utils";
import API_WRAPPER from "../../api";
import { GoPlus } from "react-icons/go";
import { ToastContainer } from "react-toastify";
import ProductManagementBannerImage from "../../assets/bannerImages/productManagementImage.png";
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
      // {
      //   Header: "Variant",
      //   accessor: ({ row }) => {
      //     return (
      //       <>
      //         {Object.entries(row.original.result.variant).map(([key, vaulue]) => {
      //           <div key={key}>
      //             <span>{key}: </span>
      //             <span>{value}</span>
      //           </div>
      //         })}
      //       </>
      //     );
      //   },
      // },
      {
        Header: "Price",
        accessor: "result.price",
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
    window.edit_product_modal.showModal();
    setSelectedRow(row);
    console.log("ROW TO BE EDITED: ", row);
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
  const bulkUpload = async (e) => {
    try {

      const buFormData = new FormData();
      buFormData.append("file", e)
      const response = await API_WRAPPER.post("/products/bulk-upload", buFormData)

      console.log('ProductManagement.jsx', response);

    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchProductsList();
  }, [apiTrigger]);

  return (
    <div>
      <Header
        heading="Product Management"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's "
        image={ProductManagementBannerImage}
      />
      <div className="w-full gap-4 mt-14">
        <div className="flex justify-end">



          <input type="file" onChange={(e) => bulkUpload(e.target.files[0])} className="file-input file-input-bordered file-input-md input-accent w-xs max-w-xs" />

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
            pageSize={10}
            enablePagination
          />
        </div>
      </div>

      {/* edit modal  */}
      <Modal
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
      />

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
