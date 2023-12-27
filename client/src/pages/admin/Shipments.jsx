import { Header, ReusableTable } from "../../components";
import { useEffect, useMemo, useState } from "react";
import API_WRAPPER from "../../api";
import ShipmentBannerImage from "../../assets/bannerImages/shipmentImage.png";
import ReuseTable from "../../components/ui/Table/ReuseTable";

let orderStatus = [
  "ordered",
  "processing",
  "shipped",
  "delivered",
  "decline",
  "refund",
  "replace",
];
const Shipment = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [orderToBeEdited, setOrderToBeEdited] = useState("");
  const [OrderEditedObject, setOrderEditedObject] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPagesShow, setTotalPagesShow] = useState(0);
  const [productLoading, setProductLoading] = useState(false);
  const [seacrhText, SetSearchTex] = useState("");

  const getOrders = async () => {
    try {
      setProductLoading(true);
      const response = await API_WRAPPER.get(
        `/order/shipped/get-orders/list?page=${page}&pageSize=${pageSize}&seacrhText=${seacrhText}`
      );
      setProductLoading(false);
      setOrdersList(response?.data?.orders);
      setTotalPagesShow(response?.data?.totalPages);
    } catch (error) {
      console.error("Error occured while fetching orders");
    }
  };

  useEffect(() => {
    getOrders();
  }, [page, pageSize, seacrhText]);

  const columns = useMemo(
    () => [
      {
        Header: "order id",
        accessor: "_id",
      },
      {
        Header: "Product name",
        accessor: "product.name",
      },
      {
        Header: "Vendor Name",
        accessor: "vendor_id.firstName",
        Cell: ({ row }) => {
          return (
            <p>
              {row?.original?.vendor_id?.firstName}&nbsp;
              {row?.original?.vendor_id?.lastName}
            </p>
          );
          console.log("+++>//", row?.original?.vendor_id);
        },
      },
      {
        Header: "Customer Name",
        accessor: "customer.firstName",
        Cell: ({ row }) => {
          return (
            <p>
              {row?.original?.customer?.firstName}&nbsp;
              {row?.original?.customer?.lastName}
            </p>
          );
        },
      },
      {
        Header: "Tracking ID",
        accessor: "courier_id",
      },
      // {
      //   Header: "Order Status",
      //   accessor: "order_status",
      // },
      {
        Header: "Order Date and time",
        accessor: "createdAt",
        Cell: ({ row }) => {
          const inputDate = new Date(row?.original?.createdAt);
          const day = String(inputDate.getDate()).padStart(2, "0");
          const month = String(inputDate.getMonth() + 1).padStart(2, "0");
          const year = String(inputDate.getFullYear()).slice(-2); // Extract the last two digits of the year
          const hours = String(inputDate.getUTCHours()).padStart(2, "0");
          const minutes = String(inputDate.getUTCMinutes()).padStart(2, "0");
          const seconds = String(inputDate.getUTCSeconds()).padStart(2, "0");

          return (
            <p>{`${day}-${month}-${year} ${hours}:${minutes}:${seconds}`}</p>
          );
        },
      },
      {
        Header: "Shipped Date and time",
        accessor: "updatedAt",
        Cell: ({ row }) => {
          const inputDate = new Date(row?.original?.updatedAt);
          const day = String(inputDate.getDate()).padStart(2, "0");
          const month = String(inputDate.getMonth() + 1).padStart(2, "0");
          const year = String(inputDate.getFullYear()).slice(-2); // Extract the last two digits of the year
          const hours = String(inputDate.getUTCHours()).padStart(2, "0");
          const minutes = String(inputDate.getUTCMinutes()).padStart(2, "0");
          const seconds = String(inputDate.getUTCSeconds()).padStart(2, "0");

          return (
            <p>{`${day}-${month}-${year} ${hours}:${minutes}:${seconds}`}</p>
          );
        },
      },
    ],
    []
  );

  const data = useMemo(() => ordersList, [ordersList]);

  const handleEditModal = (row) => {
    setOrderToBeEdited(row);
    setOrderEditedObject((pre) => ({
      ...pre,
      order_status: row?.order_status,
    }));
    window.shipped_management_edit_modal.showModal();
  };

  const handleDeleteModal = (row) => {
    setOrderToBeEdited(row);
    window.shipped_management_delete_modal.showModal();
  };
  const handleDeleteSubmit = async () => {
    // /order/delete-order/:6517d9f1725f345937da7918
    const response = await API_WRAPPER.delete(
      `/order/delete-order/:${orderToBeEdited._id}`
    );
    getOrders();
    window.shipped_management_delete_modal.close();
  };
  const handleEditSubmit = async () => {
    // /order/update-order/:id // put
    const response = await API_WRAPPER.put(
      `/order/update-order/:${orderToBeEdited._id}`,
      OrderEditedObject
    );
    if (response.status === 200) {
      getOrders();
      window.shipped_management_edit_modal.close();
    }
  };

  return (
    <>
      <div>
        <Header
          heading="Shipments"
          subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. sdfsdfse drf qwdefd fjhr f4 wedr w"
          image={ShipmentBannerImage}
        />

        <div className="mt-20">
          <ReuseTable
            tableTitle="Shipment List"
            columns={columns}
            data={data}
            // showButtons
            // enableEdit
            // enableDelete
            // onEdit={handleEditModal}
            // onDelete={handleDeleteModal}
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
          {/* <ReusableTable
            tableTitle="Shipment List"
            columns={columns}
            data={data}
            showButtons
            enableDelete
            enableEdit
            pageSize={10}
            onDelete={handleDeleteModal}
            onEdit={handleEditModal}
          /> */}
        </div>
      </div>
      <dialog id="shipped_management_edit_modal" className="modal">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditSubmit();
          }}
          method="dialog"
          className="modal-box"
        >
          <h3 className="font-bold text-lg">Hello!</h3>
          <div>
            <div className="form-control col-span-1">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                onChange={(e) =>
                  setOrderEditedObject((prevState) => {
                    return { ...prevState, order_status: e.target.value }; ///////////////jjjjjjjjjjjj
                  })
                }
                defaultValue={orderToBeEdited.order_status}
                className="select select-primary"
                name="status"
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
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
            <button
              onClick={() => window.shipped_management_edit_modal.close()}
              className="btn"
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
      {/* delete  */}
      <dialog id="shipped_management_delete_modal" className="modal">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDeleteSubmit();
          }}
          method="dialog"
          className="modal-box"
        >
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Are you sure you want to delete the selected order?
          </p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button type="submit" className="btn btn-primary">
              Delete
            </button>
            <button
              onClick={() => window.shipped_management_delete_modal.close()}
              className="btn"
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default Shipment;
