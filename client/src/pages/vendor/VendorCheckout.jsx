import { useQuery } from "react-query";
import { Header, ReusableTable } from "../../components";
import { useEffect, useState } from "react";
import API_WRAPPER from "../../api";
import { fetchCheckouts } from "../../api/apiCalls";
import CheckoutBannerImage from "../../assets/bannerImages/checkoutImage.png";
import { useNavigate } from "react-router-dom";
import ReuseTable from "../../components/ui/Table/ReuseTable";

const VendorCheckout = () => {
  const [checkOutId, setCheckOutId] = useState();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPagesShow, setTotalPagesShow] = useState(0);
  const [productLoading, setProductLoading] = useState(false);
  const [seacrhText, SetSearchTex] = useState("");
  const navigate = useNavigate();

  const fetchAllCheckOut = async () => {
    try {
      let result = await API_WRAPPER.get(
        `/checkout/get-all-checkouts/list?page=${page}&pageSize=${pageSize}&seacrhText=${seacrhText}`
      );
      console.log("++++>>>", result?.data?.totalData);
      setData(result?.data?.checkouts);
      setTotalPagesShow(result?.data?.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCheckOut();
  }, [page, pageSize, seacrhText]);

  const handleShowDetails = (row) => {
    console.log("--", row);
    navigate(`/checkout/show/details/${row?.customer?._id}`);
  };

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
    {
      Header: "Recent Product Name",
      accessor: "items[0].product_name",
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
      Header: "Recent Product Price",
      accessor: "items[0].product_price",
    },
    {
      Header: "Recent Product Quantity",
      accessor: "items[0].product_quantity",
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
    <div>
      <Header
        heading="Checkouts"
        subheading="This is a subheading for vendor's checkout page. It is here because it is required to provide brief information about the page"
      />
      <div className="mt-4">
        {/* {checkouts?.data.length > 0 ? (
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
        )} */}
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
  );
};

export default VendorCheckout;
