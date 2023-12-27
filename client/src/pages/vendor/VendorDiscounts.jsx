import { Header, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import { getStatusStyles } from "../../utils";
import { Modal } from "../../components";
import ReuseTable from "../../components/ui/Table/ReuseTable";
const VendorDiscounts = () => {
  const [discountsList, setDiscountsList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [apiTrigger, setApiTrigger] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPagesShow, setTotalPagesShow] = useState(0);
  const [productLoading, setProductLoading] = useState(false);
  const [seacrhText, SetSearchTex] = useState("");

  const fetchDiscounts = async () => {
    try {
      setProductLoading(true);
      const response = await API_WRAPPER.get(
        `/discount/get-all-discounts/list?page=${page}&pageSize=${pageSize}&seacrhText=${seacrhText}`
      );
      if (response.status === 200) {
        setProductLoading(false);
        setDiscountsList(response?.data?.discounts);
        setTotalPagesShow(response?.data?.totalPages);
      }
    } catch (error) {
      console.error("ERROR occured whule fetching discounts list", error);
    }
  };

  const handleDelete = (row) => {
    window.delete_discount_modal.showModal();
    setSelectedRow(row);
  };

  const handleClose = () => {
    return window.delete_discount_modal.close();
  };

  const handleSave = (inputValues) => {
    console.log("SAVING THE INPUT VALUES: ", inputValues);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Total Limit",
        accessor: "totalLimit",
      },
      {
        Header: "Use One Times",
        accessor: "useOneTime",
        Cell: (props) => {
          if (props?.row?.original?.useOneTime) {
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
        Header: "Discount",
        accessor: "typeValue",
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
          return getStatusStyles(
            row?.original?.status,
            row?.original,
            fetchDiscounts
          );
        },
      },
    ],
    []
  );
  const data = useMemo(() => discountsList, [discountsList]);

  useEffect(() => {
    fetchDiscounts();
  }, [apiTrigger, page, pageSize, seacrhText]);

  return (
    <div>
      <Header
        heading="Discounts"
        subheading="This subheading is for coupons and discounts page. This is here to let user know that this page has coupons details."
      />
      <div className="mt-4 overflow-x-auto">
        <div className="flex justify-end mb-4">
          {/* <Link
            to={PATHS.adminAddDiscount}
            className="btn bg-themeColor font-thin text-white w-48"
          >
            Add Discounts
          </Link> */}
        </div>
        {/* <ReusableTable
          tableTitle="Discount List"
          columns={columns}
          data={data}
          enablePagination
          pageSize={10}
          showButtons
          enableDeleteonDelete={handleDelete}
        /> */}
        <ReuseTable
          tableTitle="Discount List"
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

export default VendorDiscounts;
