import React, { useMemo, useState } from "react";
import { Header, ReusableTable } from "../../../components";
import DiscountBannerImage from "../../../assets/bannerImages/discountImage.png";
import { PATHS } from "../../../Routes/paths";
import { Link } from "react-router-dom";
import { getStatusStyles } from "../../../utils";
import API_WRAPPER from "../../../api";
import ReuseTable from "../../../components/ui/Table/ReuseTable";

export const DailyDeal = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPagesShow, setTotalPagesShow] = useState(0);
  const [productLoading, setProductLoading] = useState(false);
  const [seacrhText, SetSearchTex] = useState("");

  const fetchAllDailyDeals = async () => {
    try {
      setProductLoading(true);
      const response = await API_WRAPPER.get(
        `/daily/deals/getData/list?page=${page}&pageSize=${pageSize}&seacrhText=${seacrhText}`
      );
      setProductLoading(false);
      setData(response?.data?.modelData);
      setTotalPagesShow(response?.data?.totalPages);
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };

  useMemo(() => {
    fetchAllDailyDeals();
  }, [page, pageSize, seacrhText]);

  const columns = useMemo(
    () => [
      {
        Header: "Deal Name",
        accessor: "title",
      },
      {
        Header: "Discount",
        accessor: "typeValue",
        Cell: ({ row }) => {
          return `${row?.original?.typeValue}${
            row?.original?.typeTitle == "percentage" ? "%" : null
          }`;
        },
      },
      {
        Header: "Categories",
        accessor: "categoryId",
        Cell: ({ row }) => {
          return (
            <ul className="options">
              {row?.original?.categoryId[0]?.map((option) => (
                <li
                  key={option?._id}
                  onClick={() => handleOptionClick(option?._id)}
                >
                  {option?.name}
                </li>
              ))}
            </ul>
          );
        },
      },
      {
        Header: "Products",
        accessor: "productId",
        Cell: ({ row }) => {
          return (
            <ul className="options">
              {row?.original?.productId[0]?.map((option) => (
                <li
                  key={option?._id}
                  onClick={() => handleOptionClick(option?._id)}
                >
                  {option?.name}
                </li>
              ))}
            </ul>
          );
        },
      },
      {
        Header: "Start Date and Time",
        accessor: "activeDate",
        Cell: ({ row }) => {
          return `${row?.original?.activeDate} ${row?.original?.activeTime}`;
        },
      },
      {
        Header: "End Date and Time",
        accessor: "endDate",
        Cell: ({ row }) => {
          return `${row?.original?.endDate} ${row?.original?.endTime}`;
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => {
          return getStatusStyles(
            row?.original?.status,
            row?.original,
            fetchAllDailyDeals
          );
        },
      },
    ],
    []
  );

  const handleDelete = () => {};

  const handleEdit = () => {};

  return (
    <div>
      <Header
        heading="Daily Deal"
        subheading="This is a sub heading for the add discount section which reminds us to put a brief description about the Add Discounts page"
        image={DiscountBannerImage}
      />
      <div>
        <div className="flex justify-end my-4">
          <Link to={PATHS?.adminAddDiscount} className="btn btn-primary ml-4">
            Add Daily Deal
          </Link>
        </div>
        {/* <ReusableTable
          tableTitle="Daily Deal List"
          columns={columns}
          data={data}
          //   selectedFlatRows={getFlatRowsData}
          showButtons
          enableDelete
          enableEdit
          enablePagination
          pageSize={10}
          onDelete={handleDelete}
          onEdit={handleEdit}
        /> */}
        <ReuseTable
          tableTitle="Daily Deal List"
          columns={columns}
          data={data}
          showButtons
          enableEdit
          enableDelete
          onEdit={handleEdit}
          onDelete={handleDelete}
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
