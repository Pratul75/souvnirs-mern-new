import { Header, ReusableTable } from "../../../components";
import CheckoutBannerImage from "../../../assets/bannerImages/checkoutImage.png";
import { useQuery } from "react-query";
import { fetchCheckouts } from "../../../api/apiCalls";

const Checkout = () => {
  const {
    data: checkouts,
    isLoading,
    error,
  } = useQuery("get_all_checkouts", fetchCheckouts, {
    onSuccess: () => console.log("CHECKOUT DATA: ", checkouts.data[0].items),
  });

  if (isLoading) {
    return <p>Loading Checkouts</p>;
  }
  let tableData = [];

  if (!isLoading && !error && checkouts) {
    const items = checkouts.data[0].items; // Assuming the items are the data you want to display
    const combinedProducts = items.map((item) => ({
      customerId: checkouts.data[0].customerId, // Add customerId here
      product_name: item.product_name,
      product_price: item.product_price,
      product_quantity: item.product_quantity,
    }));
    tableData = combinedProducts;
  }

  const columns = [
    {
      Header: "Customer ID", // New column for customerId
      accessor: "customerId",
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

  return (
    <div>
      <Header
        heading="Checkouts"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. est emmeet dolor de futa "
        image={CheckoutBannerImage}
      />

      <div className="mt-4">
        <ReusableTable
          columns={columns}
          data={tableData}
          enablePagination
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default Checkout;
