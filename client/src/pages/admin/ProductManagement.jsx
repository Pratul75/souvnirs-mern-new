import { Header, ReusableTable } from "../../components";
import { Link } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { useEffect, useMemo, useState } from "react";
import { getStatusStyles } from "../../utils";
import API_WRAPPER from "../../api";

const ProductManagement = () => {
  const [productsList, setProductsList] = useState([]);
  const columns = useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "name",
      },
      {
        Header: "Slug",
        acessor: "slug",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "On Sale",
        accessor: "onSale",
        Cell: ({ row }) => {
          return <p>{row?.original?.onSale ? "YES" : "NO"}</p>;
        },
      },
      {
        Header: "Stock Quantity",
        accessor: "stockQuantity",
      },
      {
        Header: "Stock Status",
        accessor: "stockStatus",
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

  useEffect(() => {
    fetchProductsList();
  }, []);

  return (
    <div>
      <Header
        heading="Add Product"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's "
        // image={HeaderImgTwo}
      />
      <Link
        to={PATHS.adminAddProducts}
        className="btn btn-secondary float-right "
      >
        Add Product
      </Link>

      <ReusableTable columns={columns} data={data} />
    </div>
  );
};

export default ProductManagement;
