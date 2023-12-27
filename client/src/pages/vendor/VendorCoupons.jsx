import { Header, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import { getStatusStyles } from "../../utils";
import ReuseTable from "../../components/ui/Table/ReuseTable";

const VendorCoupons = () => {
  const [couponsList, setCouponsList] = useState([]);
  const [couponId, setCouponId] = useState(null);
  const [apiTrigger, setApiTrigger] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPagesShow, setTotalPagesShow] = useState(0);
  const [productLoading, setProductLoading] = useState(false);
  const [seacrhText, SetSearchTex] = useState("");

  const fetchCoupons = async () => {
    try {
      const response = await API_WRAPPER.get(
        `/coupon/get-all-coupons/list?page=${page}&pageSize=${pageSize}&seacrhText=${seacrhText}`
      );
      if (response.status === 200) {
        console.log("COUPONS LISTS: ", response.data);
        setCouponsList(response?.data?.coupons);
        setTotalPagesShow(response?.data?.totalPages);
      }
      setApiTrigger((prev = !prev));
    } catch (error) {
      console.error("ERROR occured whule fetching discounts list", error);
    }
  };
  const handleEditChange = (e) => {
    setSelectedRow({ ...selectedRow, [e.target.name]: e.target.value });
  };
  const submitEditedRow = async (e) => {
    e.preventDefault();
    console.log("Coupons.jsx", couponId._id);
    const response = await API_WRAPPER.put(
      `/coupon/update-coupon/:${couponId._id}`
    );
    console.log("Coupons.jsx", response);
  };

  const editHandler = async (row) => {
    console.log("Coupons.jsx", row);
    window.edit_coupon_modal.showModal();
    setSelectedRow(row);
  };

  const deleteCoupons = async () => {
    const response = await API_WRAPPER.delete(
      `/coupon/delete-coupon/:${couponId._id}`
    );
    setApiTrigger((prevState) => !prevState);
    console.log("DELETE DISCOUNT RESPONSE: ", response?.data);
  };

  const handleDiscountDelete = (id) => {
    window.delete_discount_modal.showModal();
    console.log("DISCOUNT ID:", id);
    setCouponId(id);
  };
  console.log("Coupons.jsx", couponId);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "_id",
        Cell: (props) => {
          const id = props.row.original._id;
          const shortenedId = id.slice(-4);
          return <p>{shortenedId}</p>;
        },
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Code",
        accessor: "couponCode",
      },
      {
        Header: "Total Limit",
        accessor: "totalLimit",
      },
      {
        Header: "Use One Times",
        accessor: "useOneTime",
        Cell: (props) => {
          console.log("Coupons.jsx", props);
          if (props?.row?.original?.totalLimit === 1) {
            return <p className="text-emerald-600">YES</p>;
          } else {
            return <p className="text-rose-500">NO</p>;
          }
        },
      },
      {
        Header: "Active Date",
        accessor: "activeDate",
        Cell: (props) => {
          const date = new Date(props.row.original.activeDate);
          const formattedDate = date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          });
          return <p>{formattedDate}</p>;
        },
      },
      {
        Header: "Active Time",
        accessor: "activeTime",
      },
      {
        Header: "End Date",
        accessor: "endDate",
        Cell: (props) => {
          const date = new Date(props.row.original.endDate);
          const formattedDate = date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          });
          return <p>{formattedDate}</p>;
        },
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

  const data = useMemo(() => couponsList, [couponsList]);
  console.log("Coupons.jsx", columns);
  useEffect(() => {
    fetchCoupons();
  }, [apiTrigger, page, pageSize, seacrhText]);
  console.log("Coupons.jsx", selectedRow);
  return (
    <div>
      <Header
        heading="Coupons"
        subheading="This is asubheading for vendor coupons, thijs heading is present because we need to provide the coupons info in header"
      />

      <div className="mt-4 overflow-x-auto">
        {/* <h1 className="text-2xl">Coupons List</h1> */}
        <div className="flex justify-end mb-4">
          {/* <Link
            to={PATHS.adminAddCoupon}
            className="btn bg-themeColor font-thin text-white w-48"
          >
            Add Coupons
          </Link> */}
        </div>
        {/* <ReusableTable
          tableTitle="Coupon List"
          columns={columns}
          data={data}
          showButtons
          enablePagination
          onEdit={editHandler}
          onDelete={handleDiscountDelete}
          pageSize={10}
        /> */}
        <ReuseTable
          tableTitle="Coupons List"
          columns={columns}
          data={data}
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

export default VendorCoupons;
