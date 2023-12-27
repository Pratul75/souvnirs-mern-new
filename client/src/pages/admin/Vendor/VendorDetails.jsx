import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API_WRAPPER, { baseUrl } from "../../../api";
import ReuseTable from "../../../components/ui/Table/ReuseTable";
import { getStatusStyles, getStockStatusStyles } from "../../../utils";

export const VendorDetails = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPagesShow, setTotalPagesShow] = useState(0);
  const [productLoading, setProductLoading] = useState(false);
  const [seacrhText, SetSearchTex] = useState("");
  const [data, setProductsList] = useState([]);
  const [selectedRow, setSelectedRow] = useState();
  const { id } = useParams();

  const navigate = useNavigate();

  const getVendorProduct = async () => {
    try {
      setProductLoading(true);
      const response = await API_WRAPPER.get(
        `/get/products?page=${page}&pageSize=${pageSize}&seacrhText=${seacrhText}&vendorId=${id}`
      );
      if (response.status === 200) {
        setProductLoading(false);
        setProductsList(response?.data.productsList);
        setTotalPagesShow(response?.data?.totalPages);
        console.log("RESPONSE: ", response?.data);
      }
    } catch (error) {
      console.error({ error, messge: error.message });
    }
  };

  useMemo(() => {
    getVendorProduct();
  }, [page, pageSize, seacrhText]);

  const columns = useMemo(
    () => [
      {
        Header: "Product Image",
        Cell: ({ row }) => {
          const img = row?.original?.coverImage;
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
        accessor: "name",
      },
      {
        Header: "Variant",
        Cell: ({ row }) => {
          return (
            <ul>
              {row?.original?.variant?.map((item) => (
                <li>{item?.name}</li>
              ))}
            </ul>
          );
        },
      },
      {
        Header: "Stock Status",
        accessor: "stockStatus",
        Cell: ({ row }) => {
          return getStockStatusStyles(row?.original?.stockStatus);
        },
      },
      {
        Header: "Total Sales",
        accessor: "totalSales",
      },
      {
        Header: "Stock Quantity",
        accessor: "stockQuantity",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Approval",
        Cell: ({ row }) => {
          // console.log("ProductManagement.jsx", row);
          return (
            <div>
              {row?.original?.approved == false ? (
                <button
                  onClick={() => {
                    // setSelectedRow(row?.original);
                    alterApproval(row?.original?._id, true);
                  }}
                  className="btn btn-sm btn-primary"
                >
                  Disapprove
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedRow(row?.original);
                    window.disapproval_modal.showModal();
                    // alterApproval(row?.original?._id, true);
                  }}
                  className="btn btn-sm btn-primary"
                >
                  Approve
                </button>
              )}
            </div>
          );
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

  const handleEdit = (row) => {
    navigate(`/admin/edit-product/${row._id}`);
  };

  const deleteSelectedRow = async () => {
    const response = await API_WRAPPER.delete(
      `/products/delete-product/:${selectedRow._id}`
    );
    if (response.status === 200) {
      getVendorProduct();
      setApiTrigger((prevState) => !prevState);
      debouncedShowToast(response?.data?.data, "success");
    } else {
      debouncedShowToast(response?.data?.data.error, "error");
    }
  };

  const handleDelete = (row) => {
    console.log("ROW TO BE DELETED: ", row);
    setSelectedRow(row);
    window.product_management_delete_modal.showModal();
  };

  return (
    <div>
      <ReuseTable
        tableTitle="Product List"
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
      <dialog id="product_management_delete_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Are you sure you want to delete the selected product?
          </p>
          <div className="modal-action">
            <button onClick={deleteSelectedRow} className="btn btn-error">
              Delete
            </button>
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};
