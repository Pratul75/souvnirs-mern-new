import { useEffect, useMemo, useState } from "react";
// import OrderManagementBannerImg from "../../assets/images/orderManagementBanner.png";
import { Header, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";
import { getStatusStyles } from "../../utils";
import ReuseTable from "../../components/ui/Table/ReuseTable";
import { Link } from "react-router-dom";

let orderStatus = [
  "ordered",
  "processing",
  "shipped",
  "delivered",
  "decline",
  "refund",
  "replace",
];

const VendorOrderManagement = () => {
  const [orderTableList, setOrderTableList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [editedRow, setEditedRow] = useState({});
  const [apiTrigger, setApiTrigger] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPagesShow, setTotalPagesShow] = useState(0);
  const [productLoading, setProductLoading] = useState(false);
  const [seacrhText, SetSearchTex] = useState("");

  const getOrderTableData = async () => {
    try {
      setProductLoading(true);
      const response = await API_WRAPPER.get(
        `/order/all/get-orders?page=${page}&pageSize=${pageSize}&seacrhText=${seacrhText}`
      );
      if (response.status === 200) {
        console.log("ORDER TABLE DATA: ", response?.data);
        setProductLoading(false);
        setOrderTableList(response?.data?.orders);
        setTotalPagesShow(response?.data?.totalPages);
        console.log("ORDER TABLE DATA: ", orderTableList);
      }
    } catch (error) {
      setProductLoading(false);
      console.error("Error occured while getting all order table list", error);
    }
  };

  const handleDeleteOrder = (row) => {
    setSelectedRow(row);
    window.order_management_delete_modal.showModal();
    console.log("ROW TO BE DELETED: ", row);
  };

  const handleEditOrder = (row) => {
    console.log("+++++>>", row);
    setSelectedRow(row);
    window.order_management_edit_modal.showModal();
    console.log("ROW TO BE EDITED: ", row);
  };

  const handleEditChange = (e) => {
    setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
  };

  const submitEditedRow = async () => {
    const response = await API_WRAPPER.put(
      `/order/update-order/:${selectedRow._id}`,
      editedRow
    );
    if (response.status === 200) {
      setApiTrigger((prevState) => !prevState);
      window.order_management_edit_modal.close();
      console.log(
        "EDITED SUCCESSFULLY WITH THE FOLLOWING RESPONSE: ",
        response?.status
      );
    }
  };
  const deleteSelectedRow = async () => {
    console.log("VendorOrderManagement.jsx", selectedRow);
    const response = await API_WRAPPER.delete(
      `/order/delete-order/:${selectedRow._id}`
    );
    if (response.status === 200) {
      setApiTrigger((prevState) => !prevState);
      console.log(
        "SELECTED ROW IS DELETED WITH FOLLOWING RESPONSE: ",
        response?.data
      );
    }
  };

  // const columns = useMemo(
  //   () => [
  //     {
  //       Header: "Invoice ID",
  //       accessor: "invoiceId",
  //     },
  //     {
  //       Header: "Product Name",
  //       accessor: "productName",
  //     },
  //     {
  //       Header: "Vendor Name",
  //       accessor: "vendorName",
  //     },
  //     {
  //       Header: "Customer Name",
  //       accessor: "customerName",
  //     },
  //     {
  //       Header: "Price",
  //       accessor: "price",
  //     },
  //     {
  //       Header: "Status",
  //       accessor: "status",
  //       Cell: ({ row }) => {
  //         return getStatusStyles(row?.original?.status);
  //       },
  //     },
  //   ],
  //   []
  // );

  const columns = useMemo(
    () => [
      {
        Header: "Invoice ID",
        accessor: "invoice_id",
        Cell: ({ row }) => {
          return (
            <Link
              style={{ color: "blue" }}
              to={`/vendor/invoice/page/${row?.original?.invoice_id}/${row?.original?._id}`}
            >
              {row?.original?.invoice_id}
            </Link>
          );
        },
      },
      // payment_method
      {
        Header: "Payment Method",
        accessor: "payment_method",
      },
      {
        Header: "Billing ID",
        accessor: "billing_id",
      },
      {
        Header: "Coupon Code",
        accessor: "coupon_code",
      },
      {
        Header: "Courier ID",
        accessor: "courier_id",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Order Status",
        accessor: "order_status",
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
  const data = useMemo(() => orderTableList, [orderTableList]);

  console.log(">>>>>>>>....>>>>", data);
  useEffect(() => {
    getOrderTableData();
  }, [apiTrigger, seacrhText, page, pageSize]);
  return (
    <div>
      <Header
        heading="Order Management"
        subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et "
        // image={OrderManagementBannerImg}
      />
      <div className="mt-10">
        {/* <ReusableTable
          tableTitle="Orders List"
          columns={columns}
          data={data}
          showButtons
          enableDelete
          enableEdit
          onDelete={handleDeleteOrder}
          onEdit={handleEditOrder}
        /> */}

        <ReuseTable
          tableTitle="Order List"
          columns={columns}
          data={data}
          showButtons
          enableEdit
          enableDelete
          onEdit={handleEditOrder}
          onDelete={handleDeleteOrder}
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

        {/* edit modal */}
        <dialog id="order_management_edit_modal" className="modal">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitEditedRow();
            }}
            method="dialog"
            className="modal-box"
          >
            <h3 className="font-bold text-lg">Hello!</h3>
            <div>
              {/* <div className="form-control">
                <label className="label">
                  <span className="label-text">Invoice ID</span>
                </label>
                <input
                  onChange={(e) => handleEditChange(e)}
                  defaultValue={selectedRow?.invoiceId}
                  className="input input-primary"
                  type="text"
                  name="invoice_id"
                  id=""
                />
              </div> */}
              {/* <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  onChange={(e) => handleEditChange(e)}
                  defaultValue={selectedRow?.productName}
                  className="input input-primary"
                  type="text"
                  name="productName"
                  id=""
                />
              </div> */}
              {/* <div className="form-control">
                <label className="label">
                  <span className="label-text">Vendor Name</span>
                </label>
                <input
                  onChange={(e) => handleEditChange(e)}
                  defaultValue={selectedRow?.vendorName}
                  className="input input-primary"
                  type="text"
                  name="vendorName"
                  id=""
                />
              </div> */}
              {/* <div className="form-control">
                <label className="label">
                  <span className="label-text">Customer Name</span>
                </label>
                <input
                  onChange={(e) => handleEditChange(e)}
                  defaultValue={selectedRow?.customerName}
                  className="input input-primary"
                  type="text"
                  name="customerName"
                  id=""
                />
              </div> */}
              {/* <div className="form-control col-span-1">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  onChange={(e) => handleEditChange(e)}
                  defaultValue={selectedRow?.status}
                  className="select select-primary"
                  name="status"
                  id=""
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="DEACTIVE">DEACTIVE</option>
                  <option value="PENDING">PENDING</option>
                </select>
              </div> */}
              <div className="form-control col-span-1">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  // onChange={(e) =>
                  //   setOrderEditedObject((prevState) => {
                  //     return { ...prevState, order_status: e.target.value }; ///////////////jjjjjjjjjjjj
                  //   })
                  // }
                  onChange={(e) => handleEditChange(e)}
                  defaultValue={selectedRow?.order_status}
                  className="select select-primary"
                  name="order_status"
                  id=""
                >
                  {orderStatus?.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button type="submit" className="btn btn-error">
                Save Changes
              </button>
              <button
                onClick={() => window.order_management_edit_modal.close()}
                className="btn"
              >
                Close
              </button>
            </div>
          </form>
        </dialog>

        <dialog id="order_management_delete_modal" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Are you sure you want to delete the selected order?
            </p>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-error" onClick={deleteSelectedRow}>
                Delete
              </button>
              <button
                className="btn"
                onClick={() => {
                  window.order_management_delete_modal.close();
                }}
              >
                Close
              </button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default VendorOrderManagement;
