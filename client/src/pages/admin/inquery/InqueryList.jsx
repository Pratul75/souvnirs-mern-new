import React, { useEffect, useMemo, useState } from "react";
import { Header, ReusableTable } from "../../../components";
import dashboardBannerImage from "../../../assets/bannerImages/dashboardBannerImage.png";
import ReuseTable from "../../../components/ui/Table/ReuseTable";
import API_WRAPPER from "../../../api";
import { getStatusStyles } from "../../../utils";

const statusList = ["Accept", "Decline", "Other"];

export const InqueryList = () => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({
    status: "",
    inuput: "",
    varientData: {},
  });

  const getInqueryDetails = async () => {
    try {
      const result = await API_WRAPPER.get("/get/inquery/list");
      setData(result?.data?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getInqueryDetails();
  }, []);

  const columns = useMemo(
    () => [
      // {
      //   Header: "Product Image",
      //   Cell: ({ row }) => {
      //     const img = row?.original?.coverImage;
      //     return (
      //       <Link
      //         to={`/productInfo/${row?.original?.slug}`}
      //         className="cursor-pointer"
      //       >
      //         <img
      //           className="w-12 h-12 text-center rounded-lg hover:scale-105"
      //           src={
      //             !img?.includes("res.cloudinary") &&
      //             !img?.includes("cdn.shopify")
      //               ? `${baseUrl}/${img}`
      //               : img
      //           }
      //         />
      //       </Link>
      //     );
      //   },
      // },
      // {
      //   Header: "Product Name",
      //   accessor: "name",
      // },
      {
        Header: "Customer Name",
        accessor: "name",
      },
      {
        Header: "Customer Email",
        accessor: "email",
      },
      {
        Header: "Customer Contact",
        accessor: "contact",
      },
      // {
      //   Header: "Customer Expected Date",
      //   accessor: "expected_date",
      // },
      // {
      //   Header: "Customer Time Extension",
      //   accessor: "time_extension",
      // },
      {
        Header: "Customer City",
        accessor: "city",
      },
      {
        Header: "Order details & Specifications",
        accessor: "msg",
      },
      {
        Header: "Reason not accept",
        accessor: "otherMsg",
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
    setEditData((pre) => ({ ...pre, varientData: row }));
    window.order_management_edit_modalshow.showModal();
  };

  const handleDelete = () => {};

  const handleSubmitData = async () => {
    try {
      const responce = await API_WRAPPER.post("/edit/data/inquery", editData);
      getInqueryDetails();
      console.log("0000=====>", responce);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Header
        heading="Inquery List"
        // subheading="This is admin dashboard which provides all the details in a very conscise and user friendly way."
        image={dashboardBannerImage}
      />
      <div>
        <ReusableTable
          tableTitle="Inquery List"
          columns={columns}
          data={data}
          showButtons
          enableEdit
          // enableDelete
          onEdit={handleEdit}
          // onDelete={handleDelete}
          enablePagination
          pageSize={10}
          //   setPageSizeshow={setPageSize}
          //   setPageNumber={setPage}
          //   pageSizeShow={pageSize}
          //   pageNumber={page}
          //   totalPagesShow={totalPagesShow}
          //   productLoading={productLoading}
          //   SetSearchTex={SetSearchTex}
          //   seacrhText={seacrhText}
        />
      </div>

      <dialog id="order_management_edit_modalshow" className="modal">
        <form
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   handleEditSubmit();
          // }}
          method="dialog"
          className="modal-box"
        >
          <h3 className="font-bold text-lg">Hello!</h3>
          <div>
            <div className="form-control col-span-1">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                onChange={(e) =>
                  setEditData((pre) => ({ ...pre, status: e.target.value }))
                }
                // defaultValue={orderToBeEdited.order_status}
                className="select select-primary"
                name="status"
                id=""
              >
                <option disabled>{"Choose status"}</option>
                {statusList?.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            {editData?.status == "Other" && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Other Reason</span>
                </label>
                <input
                  onChange={(e) =>
                    setEditData((pre) => ({ ...pre, inuput: e.target.value }))
                  }
                  className="input input-primary"
                  type="text"
                  name="invoice_id"
                  id=""
                />
              </div>
            )}
          </div>
          <div className="modal-action">
            <button
              type="submit"
              onClick={handleSubmitData}
              className="btn btn-primary"
            >
              Save Changes
            </button>
            <button
              onClick={() => window.order_management_edit_modal.close()}
              className="btn"
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};
