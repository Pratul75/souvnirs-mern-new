import { Header, ReusableTable } from "../../components";
import { useEffect, useMemo, useState } from "react";
import API_WRAPPER from "../../api";
import ShipmentBannerImage from "../../assets/bannerImages/shipmentImage.png";

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

  const getOrders = async () => {
    try {
      const response = await API_WRAPPER.get("/order/get/shipped-orders");
      setOrdersList(response?.data);
    } catch (error) {
      console.error("Error occured while fetching orders");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Vendor Name",
        accessor: "vendor_id.firstName",
      },
      {
        Header: "Courier ID",
        accessor: "courier_id",
      },
      {
        Header: "Order Status",
        accessor: "order_status",
      },
    ],
    []
  );

  const data = useMemo(() => ordersList, [ordersList]);
  console.log("ffffffffffffff", data, columns);

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
    console.log("+++>//", OrderEditedObject);
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
          <ReusableTable
            tableTitle="Shipment List"
            columns={columns}
            data={data}
            showButtons
            enableDelete
            enableEdit
            pageSize={10}
            onDelete={handleDeleteModal}
            onEdit={handleEditModal}
          />
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
