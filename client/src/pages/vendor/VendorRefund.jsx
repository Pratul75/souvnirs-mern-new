import { Header, ReusableTable } from "../../components";
// import HeaderImgTwo from "../../assets/images/headerImgTwo.png";
import API_WRAPPER from "../../api";
import { useEffect, useMemo, useState } from "react";
import { debouncedShowToast, getStatusStyles } from "../../utils";
import { nanoid } from "nanoid";

const VendorRefund = () => {
  const [refundList, setRefundList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [editedRow, setEditedRow] = useState({});
  const [apiTrigger, setApiTrigger] = useState(false);

  const getRefundsList = async () => {
    try {
      const response = await API_WRAPPER.get("/refund/get-all-refunds");
      if (response.status === 200) {
        setRefundList(response?.data);
        // refund specifics are already provided
        console.log("REFUND LIST: ", response?.data);
      }
    } catch (error) {
      console.error("Error occured while fetching all refunds");
    }
  };
  const columns = [
    {
      Header: "Order ID",
      accessor: "orderId",
    },
    {
      Header: "Product ID",
      accessor: "productId",
      Cell: ({ row }) => {
        return (
          <>
            {row.original.productId.map((id) => (
              <p className="" key={nanoid()}>
                {id}
              </p>
            ))}
          </>
        );
      },
    },
    {
      Header: "Quantity",
      accessor: "quantity",
      Cell: ({ row }) => {
        return (
          <>
            {row.original.quantity.map((id) => (
              <p key={nanoid()}>{id}</p>
            ))}
          </>
        );
      },
    },
    {
      Header: "Price",
      accessor: "price",
      Cell: ({ row }) => {
        return (
          <>
            {row.original.price.map((id) => (
              <p key={nanoid()}>{id}</p>
            ))}
          </>
        );
      },
    },
    {
      Header: "Total Price",
      accessor: "totalPrice",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) => {
        return getStatusStyles(row?.original?.status);
      },
    },
  ];

  const handleDelete = (row) => {
    console.log("ROW TO BE DELETED: ", selectedRow);
    setSelectedRow(row);
    window.refund_delete_modal.showModal();
  };

  const handleEdit = (row) => {
    console.log("ROW TO BE EDITED: ", selectedRow);
    setSelectedRow(row);
    window.refund_edit_modal.showModal();
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedRow({ ...editedRow, [name]: value });
  };

  const handleDeleteSubmit = async () => {
    try {
      const response = await API_WRAPPER.delete(
        `/refund/delete-refund/:${selectedRow.id}`
      );
      if (response.status === 200) {
        console.log("DELETED REFUND: ", response?.data);
        setApiTrigger((prevState) => !prevState);
      }
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };

  useEffect(() => {
    getRefundsList();
  }, [apiTrigger]);

  const tableData = refundList.map((refundItem) => {
    return {
      id: refundItem._id,
      orderId: refundItem.orderId,
      productId: refundItem.refundDetails.map(
        (refundDetailItem) => refundDetailItem.productId
      ),
      quantity: refundItem.refundDetails.map(
        (refundDetailItem) => refundDetailItem.quantity
      ),
      price: refundItem.refundDetails.map(
        (refundDetailItem) => refundDetailItem.price
      ),
      totalPrice: refundItem.totalPrice,
      status: refundItem.status,
    };
  });

  const data = useMemo(() => tableData, [tableData]);

  return (
    <div>
      <Header
        heading="Refunds"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
        // image={HeaderImgTwo}
      />
      <div className="mt-8">
        <ReusableTable
          tableTitle="Refund List"
          columns={columns}
          data={data}
          showButtons
          enableEdit
          enableDelete
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
      {/* edit modal */}
      <dialog id="refund_edit_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Edit</h3>
          <div>
            {selectedRow.refundDetails &&
              selectedRow.refundDetails.map((refundItem, index) => (
                <div key={index} className="form-control">
                  <label className="label">
                    <span className="label-text">Product ID</span>
                  </label>
                  <input
                    className="input input-primary"
                    type="text"
                    name={`productId_${index}`} // Use a unique name for each input
                    value={refundItem.productId}
                    onChange={handleEditChange}
                  />

                  <label className="label">
                    <span className="label-text">Quantity</span>
                  </label>
                  <input
                    className="input input-primary"
                    type="text"
                    name={`quantity_${index}`} // Use a unique name for each input
                    value={refundItem.quantity}
                    onChange={handleEditChange}
                  />

                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    className="input input-primary"
                    type="text"
                    name={`price_${index}`} // Use a unique name for each input
                    value={refundItem.price}
                    onChange={handleEditChange}
                  />
                </div>
              ))}
          </div>

          <div className="modal-action">
            <button className="btn">Save</button>
            <button
              className="btn"
              onClick={() => window.refund_edit_modal.close()}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>

      {/* delete modal */}
      <dialog id="refund_delete_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Are you sure you want to delete the selected refund?
          </p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() => handleDeleteSubmit()}
              className="btn btn-error"
            >
              Delete
            </button>
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default VendorRefund;
