import React, { useEffect, useMemo, useState } from "react";
import { Header } from "../../../components";
import API_WRAPPER, { baseUrl } from "../../../api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getStatusStyles, getStockStatusStyles } from "../../../utils";
import ReuseTable from "../../../components/ui/Table/ReuseTable";
import { ToastContainer, toast } from "react-toastify";

export const CollectionDetails = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [storeData, setStoreData] = useState({});
  const [productLoading, setProductLoading] = useState(false);
  const [error, seterror] = useState("");
  const [seacrhText, setSeacrhText] = useState("");
  const [disapprovalComment, setDisapprovalComment] = useState("");
  const [totalPage, setTotalPage] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  const alterApproval = async (id, approved, comment = "") => {
    await API_WRAPPER.post(`/product/approval/${id}`, { approved, comment });
    // setApiTrigger((prev) => !prev);
    window.disapproval_modal.close();
    collectionData();
  };

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
      //   {
      //     Header: "Variant",
      //     Cell: ({ row }) => {
      //       return (
      //         <ul>
      //           {row?.original?.variant?.map((item) => (
      //             <li>{item?.name}</li>
      //           ))}
      //         </ul>
      //       );
      //     },
      //   },
      {
        Header: "Category Name",
        accessor: "category[0].name",
      },
      {
        Header: "Vendor Name",
        accessor: "vendor.firstName",
        Cell: ({ row }) => {
          console.log("===>III", row);
          return (
            <div>
              {row?.original?.vendor?.firstName}&nbsp;
              {row?.original?.vendor?.lastName}
            </div>
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
                  Approve
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
                  Disapprove
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

  const collectionData = async () => {
    try {
      setProductLoading(true);
      const resource = await API_WRAPPER.post(
        `/admin/get/all/list/products/${id}`,
        { seacrhText, page, pageSize }
      );
      setProductLoading(false);
      setData(resource?.data?.data);
      setTotalPage(resource?.data?.totalPage);
      console.log("----<", resource?.data);
    } catch (error) {
      console.log(error);
      setProductLoading(false);
    }
  };

  useEffect(() => {
    collectionData();
  }, [seacrhText, page, pageSize]);

  const handleDelete = (row) => {
    setStoreData(row);
    window.product_management_delete_modal1.showModal();
  };

  const handleEdit = (row) => {
    navigate(`/admin/edit-product/${row?._id}`);
  };

  const deleteSelectedRow = async () => {
    console.log("----->>>>>>>000", storeData);
    try {
      const deleteData = await API_WRAPPER.post("/products/delete/collection", {
        productId: storeData?._id,
        collectiontitle: id,
      });
      collectionData();
      window.product_management_delete_modal1.close();
      toast.success("delete product from collection successfully");
    } catch (error) {
      window.product_management_delete_modal1.close();
    }
  };

  return (
    <div>
      <Header heading="Checkout Details" />
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
          totalPagesShow={totalPage}
          productLoading={productLoading}
          SetSearchTex={setSeacrhText}
          seacrhText={seacrhText}
        />
      </div>

      <dialog id="product_management_delete_modal1" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Are you sure you want to delete the selected product from
            Collection?
          </p>
          <div className="modal-action">
            <button onClick={deleteSelectedRow} className="btn btn-error">
              Delete
            </button>
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
      <dialog id="disapproval_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Do you want to disapprove {selectedRow.name}
          </h3>
          <label htmlFor="" className="label">
            comment
          </label>
          <input
            onChange={(e) => setDisapprovalComment(e.target.value)}
            className="input input-primary"
          />{" "}
          <span className="text-red-600">{error && error}</span>
          <div className="modal-action">
            <button
              className="btn btn-primary"
              onClick={() => {
                if (!disapprovalComment) {
                  seterror("please enter a comment");
                  return;
                }
                // console.log("{}}{", selectedRow);
                alterApproval(selectedRow._id, false, disapprovalComment);
              }}
            >
              Disapprove
            </button>
            <button
              onClick={() => {
                window.disapproval_modal.close();
                // seterror("");
                // setDisapprovalComment("");
              }}
              className="btn"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
      <ToastContainer />
    </div>
  );
};
