import { useEffect, useState } from "react";
import API_WRAPPER from "../../api";
import { Header, ReusableTable } from "../../components";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const CustomerCheckouts = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const columns = [
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
      Header: "Total Product Price",
      accessor: "items[0].product_price",
      Cell: ({ row }) => {
        let productQunatity = 0;
        row?.original?.items?.map((ite) => {
          productQunatity += Number(ite?.product_price);
        });
        return <div>{productQunatity}</div>;
      },
    },
    {
      Header: "Total Product Quantity",
      accessor: "items[0].product_quantity",
      Cell: ({ row }) => {
        let productQunatity = 0;
        row?.original?.items?.map((ite) => {
          productQunatity += Number(ite?.product_quantity);
        });
        return <div>{productQunatity}</div>;
      },
    },
    {
      Header: "Total Products",
      accessor: "items.length",
    },
    {
      Header: "Total Amount",
      accessor: "",
      Cell: ({ row }) => {
        let productQunatity = 0;
        let productPrice = 0;
        row?.original?.items?.map((ite) => {
          productQunatity += Number(ite?.product_quantity);
          productPrice += Number(ite?.product_price);
        });
        return productQunatity * productPrice;
      },
    },
    {
      Header: "Checkout Date",
      accessor: "createdAt",
      Cell: ({ row }) => {
        return <div>{Date(row?.original?.createdAt).slice(0, 25)}</div>;
      },
    },
  ];

  const CheckOutData = async () => {
    try {
      const getData = await API_WRAPPER.get("/checkout/customer/getall");
      setData(getData?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CheckOutData();
  }, []);

  const handleShowData = (row) => {
    console.log("---++++<", row);
    navigate(`/customer/checkout/details/${row?.customer?._id}/${row?._id}`);
  };

  const handleDelete = async (row) => {
    try {
      const detelteData = await API_WRAPPER.delete(
        `/customer/delete/checkout?id=${row?._id}`
      );
      CheckOutData();
      toast.success("Delete Checkout Succeful");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header
        heading="Checkouts"
        subheading="This is a checkouts page that provides information about all the checkouts created by the customer"
      />
      <ReusableTable
        data={data}
        columns={columns}
        pageSize={10}
        enablePagination
        showButtons
        enableShowDetials
        enableDelete
        onShow={handleShowData}
        onDelete={handleDelete}
      />
      <ToastContainer />
    </div>
  );
};

export default CustomerCheckouts;
