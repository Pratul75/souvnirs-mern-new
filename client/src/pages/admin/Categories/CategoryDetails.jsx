import React, { useEffect, useMemo, useState } from "react";
import { Header, ReusableTable } from "../../../components";
import { Link, useParams } from "react-router-dom";
import API_WRAPPER from "../../../api";
import ReuseTable from "../../../components/ui/Table/ReuseTable";
import { ToastContainer, toast } from "react-toastify";
import { PATHS } from "../../../Routes/paths";
import { GoPlus } from "react-icons/go";

export const CategoryDetails = () => {
  const { id } = useParams();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    data: [],
  });

  const getDatafromApi = async () => {
    try {
      const result = await API_WRAPPER.get(
        `/category/details/products/${id}?pageSize=${pageSize}&page=${page}`
      );
      console.log("====____------>", result?.data);
      setData(result?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDatafromApi();
  }, [page, pageSize]);

  const cloumns = useMemo(
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
        Header: "Stock quantity",
        accessor: "stockQuantity",
      },
      {
        Header: "Product status",
        accessor: "stockStatus",
      },
    ],
    []
  );

  const handleDeleProduct = async (row) => {
    try {
      const result = await API_WRAPPER.put(
        `/delete/product/category?categoryId=${id}&productId=${row?._id}`
      );
      getDatafromApi();
      toast.success("Delete successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header
        heading="Category Details Management"
        subheading="This is a subheading for the category management section."
        // image={CategoryManagementBanner}
      />
      <div className="w-full  gap-4 mt-14">
        <div className="flex justify-end">
          <Link
            to={"/admin/product-management/add-products"}
            className="btn btn-primary"
          >
            <GoPlus size={20} />
            Add Product in Category
          </Link>
        </div>
      </div>
      <ReuseTable
        tableTitle="Category Product List"
        data={data?.data}
        columns={cloumns}
        enablePagination
        enableDelete
        showButtons
        onDelete={handleDeleProduct}
        pageSize={10}
        setPageSizeshow={setPageSize}
        setPageNumber={setPage}
        pageSizeShow={pageSize}
        pageNumber={page}
        totalPagesShow={data?.totalPages}
      />
      <ToastContainer />
    </div>
  );
};
