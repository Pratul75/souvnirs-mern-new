import { Header, ReusableTable } from "../../../components";
import CheckoutBannerImage from "../../../assets/bannerImages/checkoutImage.png";
import { useQuery } from "react-query";
import { fetchCheckouts } from "../../../api/apiCalls";
import { useState } from "react";
import API_WRAPPER from "../../../api";

const Checkout = () => {
  const [checkOutId, setCheckOutId] = useState();
  const {
    data: checkouts,
    isLoading,
    error,
    refetch,
  } = useQuery("get_all_checkouts", fetchCheckouts, {
    onSuccess: () => console.log("CHECKOUT DATA: ", checkouts?.data[0]?.items),
  });

  const LodingFunction = () => {
    return <p>Loading Checkouts</p>;
  };
  let tableData = [];

  if (!isLoading && !error && checkouts) {
    console.log("+++++++", checkouts);
    if (checkouts?.data.length > 0) {
      const items = checkouts?.data[0]?.items;
      const combinedProducts = items.map((item) => ({
        productId: item.productId,
        customerId: checkouts?.data[0]?.customerId,
        customer: `${checkouts.data[0].customer[0]?.firstName} ${checkouts.data[0].customer[0]?.lastName}`, // Add customerId here
        product_name: item.product_name,
        product_price: item.product_price,
        product_quantity: item.product_quantity,
      }));
      tableData = combinedProducts;
    }
  }

  const columns = [
    {
      Header: "Customer", // New column for customerId
      accessor: "customer",
    },
    {
      accessor: "customerId",
      Cell: ({ value }) => (
        <div
          style={{
            visibility: "hidden",
            width: "10px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {value}
        </div>
      ),
    },
    {
      accessor: "productId",
      Cell: ({ value }) => (
        <div
          style={{
            visibility: "hidden",
            whiteSpace: "nowrap",
            width: "10px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {value}
        </div>
      ),
    },
    {
      Header: "Product Name",
      accessor: "product_name",
      Cell: ({ value }) => (
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {value}
        </div>
      ),
    },
    {
      Header: "Product Price",
      accessor: "product_price",
    },
    {
      Header: "Quantity",
      accessor: "product_quantity",
    },
  ];

  const handleDelete = (row) => {
    setCheckOutId(row);
    window.checkOut_delete_modal.showModal();
  };

  const PopUpDelete = async () => {
    const response = await API_WRAPPER.post(`/remove/customer/checkout`, {
      productId: checkOutId?.productId,
      customerId: checkOutId?.customerId,
    });
    refetch();
  };

  return (
    <>
      <div>
        <Header
          heading="Checkouts"
          subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. est emmeet dolor de futa "
          image={CheckoutBannerImage}
        />

        <div className="mt-4">
          {checkouts?.data.length > 0 ? (
            <ReusableTable
              tableTitle="Checout List"
              columns={columns}
              data={tableData}
              showButtons
              enableDelete
              enablePagination
              pageSize={10}
              onDelete={handleDelete}
            />
          ) : (
            <h4>No Data found</h4>
          )}
        </div>
      </div>
      <dialog id="checkOut_delete_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Are you sure you want to delete the selected cart?
          </p>
          <div className="modal-action flex">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-error" onClick={PopUpDelete}>
              {" "}
              Delete
            </button>
            <button
              onClick={() => window.cart_delete_modal.close()}
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

export default Checkout;
