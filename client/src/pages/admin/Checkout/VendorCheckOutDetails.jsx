import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API_WRAPPER, { baseUrl } from "../../../api";
import ReuseTable from "../../../components/ui/Table/ReuseTable";

export const VendorDetailsCheckOut = () => {
  const [checkOutListList, setcheckOutListList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPagesShow, setTotalPagesShow] = useState(0);
  const [productLoading, setProductLoading] = useState(false);
  const [seacrhText, SetSearchTex] = useState("");
  const { userId } = useParams();
  const [total, setTotal] = useState({
    totalPrice: 0,
    totalQuantity: 0,
  });
  console.log("..", userId);

  const getCheckoutdata = async () => {
    try {
      setProductLoading(true);
      const result = await API_WRAPPER.get(
        `/checkout/get-checkouts/byId?userId=${userId}&seacrhText=${seacrhText}&pageSize=${pageSize}&page=${page}`
      );
      console.log("result=>", result?.data?.checkouts[0]?.items);
      if (result?.data?.checkouts[0]?.items) {
        setProductLoading(false);
        setcheckOutListList(result?.data?.checkouts[0]?.items);
        setTotalPagesShow(result?.data?.totalPages);
      } else {
        setcheckOutListList([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useMemo(() => {
    getCheckoutdata();
    const totalQuantity = checkOutListList
      ? checkOutListList
      : [].reduce((total, product) => total + product.product_quantity, 0);
    const totalPrice = checkOutListList
      ? checkOutListList
      : [].reduce((total, product) => total + product.product_price, 0);
    setTotal((pre) => ({
      ...pre,
      totalPrice: totalPrice,
      totalQuantity: totalQuantity,
    }));
  }, [seacrhText, page, pageSize]);

  const columns = useMemo(
    () => [
      {
        Header: "Product Image",
        Cell: ({ row }) => {
          const img = row?.original?.product_image;
          return (
            <Link
              to={`/productInfo/${row?.original?.slug}`}
              className="cursor-pointer"
            >
              <img
                className="w-12 h-12 text-center rounded-lg hover:scale-105"
                src={
                  !img?.includes("res.cloudinary") &&
                  !img?.includes("cdn.shopify")
                    ? `${baseUrl}/${img}`
                    : img
                }
              />
            </Link>
          );
        },
      },
      {
        Header: "Product Name",
        accessor: "product_name",
      },
      {
        Header: "Product Quantity",
        accessor: "product_quantity",
      },
      {
        Header: "Product Quantity",
        accessor: "product_price",
      },
      // {
      //   Header: "Status",
      //   accessor: "status",
      //   Cell: ({ row }) => {
      //     return getStatusStyles(row?.original?.status);
      //   },
      // },
    ],
    []
  );

  const data = useMemo(() => checkOutListList, [checkOutListList]);

  return (
    <div>
      <ReuseTable
        tableTitle="User Checkout List"
        columns={columns}
        data={data}
        enablePagination
        setPageSizeshow={setPageSize}
        setPageNumber={setPage}
        pageSize={10}
        pageSizeShow={pageSize}
        pageNumber={page}
        totalPagesShow={totalPagesShow}
        productLoading={productLoading}
        SetSearchTex={SetSearchTex}
        seacrhText={seacrhText}
      />
    </div>
  );
};
