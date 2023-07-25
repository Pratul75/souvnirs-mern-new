import { useEffect, useMemo, useState } from "react";
import { Header } from "../../components";

const VendorProductInventory = () => {
  const [productsList, setProductsList] = useState([]);
  const [apiTrigger, setApiTrigger] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "name",
      },
      {
        Header: "Product Price",
        accessor: "price",
      },
      {
        Header: "Stock Quantity",
        accessor: "stockQuantity",
      },
      {
        Header: "Stock Status",
        accessor: "stockStatus",
      },
    ],
    []
  );
  const data = useMemo(() => productsList, [productsList]);

  const getAllProducts = () => {};

  useEffect(() => {
    getAllProducts();
  });

  return (
    <div>
      <Header
        heading="Product Inventory"
        subheading="This is a subheading for vendor's product inventory page. It is here because it is required to provide brief information about the page"
      />
    </div>
  );
};

export default VendorProductInventory;
