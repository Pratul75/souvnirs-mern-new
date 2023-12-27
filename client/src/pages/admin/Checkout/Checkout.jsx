import { Header, ReusableTable } from "../../../components";
import CheckoutBannerImage from "../../../assets/bannerImages/checkoutImage.png";
import { useQuery } from "react-query";
import { fetchCheckouts } from "../../../api/apiCalls";
import { useEffect, useState } from "react";
import API_WRAPPER from "../../../api";
import ReuseTable from "../../../components/ui/Table/ReuseTable";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [checkOutId, setCheckOutId] = useState();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPagesShow, setTotalPagesShow] = useState(0);
  const [productLoading, setProductLoading] = useState(false);
  const [seacrhText, SetSearchTex] = useState("");
  const navigate = useNavigate();

  // const {
  //   data: checkouts,
  //   isLoading,
  //   error,
  //   refetch,
  // } = useQuery("get_all_checkouts", fetchCheckouts, {
  //   onSuccess: () => console.log("CHECKOUT DATA: ", checkouts?.data[0]?.items),
  // });

  const fetchAllCheckOut = async () => {
    try {
      let result = await API_WRAPPER.get(
        `/checkout/get-all-checkouts/list?page=${page}&pageSize=${pageSize}&seacrhText=${seacrhText}`
      );
      setData(result?.data?.checkouts);
      setTotalPagesShow(result?.data?.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("====>+++++++mmmMMMMM-------");
    fetchAllCheckOut();
  }, [page, pageSize, seacrhText]);

  const columns = [
    {
      Header: "Customer", // New column for customerId
      accessor: "customer",
      Cell: ({ value }) => {
        return (
          <div style={{ display: "flex" }}>
            <p>{value?.firstName}&nbsp;</p>
            <p>{value?.lastName}</p>
          </div>
        );
      },
    },
    {
      // Header: ""
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
    // {
    //   accessor: "productId",
    //   Cell: ({ value }) => (
    //     <div
    //       style={{
    //         visibility: "hidden",
    //         whiteSpace: "nowrap",
    //         width: "10px",
    //         overflow: "hidden",
    //         textOverflow: "ellipsis",
    //       }}
    //     >
    //       {value}
    //     </div>
    //   ),
    // },
    // {
    //   Header: "Recent Product Name",
    //   accessor: "items[0].product_name",
    //   Cell: ({ value }) => (
    //     <div
    //       style={{
    //         whiteSpace: "nowrap",
    //         overflow: "hidden",
    //         textOverflow: "ellipsis",
    //       }}
    //     >
    //       {value}
    //     </div>
    //   ),
    // },
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

  const handleShowDetails = (row) => {
    console.log("--", row);
    navigate(`/checkout/details/${row?.customer?._id}/${row?._id}`);
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
          {/* <ReusableTable
            tableTitle="Checout List"
            columns={columns}
            data={data}
            showButtons
            enableDelete
            enablePagination
            pageSize={10}
            onDelete={handleDelete}
          /> */}
          <ReuseTable
            tableTitle="Chekout List"
            columns={columns}
            data={data}
            showButtons
            onShow={handleShowDetails}
            // enableEdit
            enableShowDetials
            // enableDelete
            // onEdit={handleEdit}
            // onDelete={handleDelete}
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
