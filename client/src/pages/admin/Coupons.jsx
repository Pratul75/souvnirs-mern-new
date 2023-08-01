import { Header, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { getStatusStyles } from "../../utils";
import DiscountBannerImage from "../../assets/bannerImages/discountImage.png";
const Coupons = () => {
  const [couponsList, setCouponsList] = useState([]);
  const [couponId, setCouponId] = useState(null);
  const [apiTrigger, setApiTrigger] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  const fetchCoupons = async () => {
    try {
      const response = await API_WRAPPER.get("/coupon/get-all-coupons");
      if (response.status === 200) {
        console.log("COUPONS LISTS: ", response.data);
        setCouponsList(response?.data);
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
    // console.log("Coupons.jsx", selectedRow._id);
    e.preventDefault();
    const response = await API_WRAPPER.put(
      `/coupon/update-coupon/:${selectedRow._id}`,
      selectedRow
    );
    console.log("Coupons.jsx", response);
    window.edit_coupon_modal.close();
    setApiTrigger((prev) => !prev);
  };

  const editHandler = async (row) => {
    console.log("Coupons.jsx", row);
    window.edit_coupon_modal.showModal();
    setSelectedRow(row);
  };

  const deleteCoupons = async () => {
    const response = await API_WRAPPER.delete(
      `/coupon/delete-coupon/:${selectedRow._id}`
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
  }, [apiTrigger]);
  console.log("Coupons.jsx", selectedRow);
  return (
    <div>
      <Header
        heading="Coupons"
        subheading="This subheading is for coupons and discounts page. This is here to let user know that this page has coupons details."
        image={DiscountBannerImage}
      />
      <div className="mt-4 overflow-x-auto">
        <h1 className="text-2xl">Coupons List</h1>
        <div className="flex justify-end mb-4">
          <Link
            to={PATHS.adminAddCoupon}
            className="btn bg-themeColor font-thin text-white w-48"
          >
            Add Coupons
          </Link>
        </div>
        <ReusableTable
          tableTitle="Coupon List"
          columns={columns}
          data={data}
          showButtons
          enablePagination
          enableEdit
          enableDelete
          pageSize={10}
          onEdit={editHandler}
          onDelete={handleDiscountDelete}
        />
      </div>
      <dialog id="edit_coupon_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow?.couponCode}
                className="input input-accent"
                type="text"
                name="couponCode"
                id=""
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">title</span>
              </label>
              <input
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow?.title}
                className="input input-accent"
                type="text"
                name="title"
                id=""
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">totalLimit</span>
              </label>
              <input
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow?.totalLimit}
                className="input input-accent"
                type="text"
                name="totalLimit"
                id=""
              />
            </div>

            <div className="form-control col-span-1">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow?.status}
                className="select select-accent"
                name="status"
                id=""
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="DEACTIVE">DEACTIVE</option>
                <option value="PENDING">PENDING</option>
              </select>
            </div>
          </div>

          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button
              type="button"
              onClick={(e) => submitEditedRow(e)}
              className="btn btn-accent"
            >
              Save changes
            </button>
            <button
              onClick={() => window.edit_coupon_modal.close()}
              className="btn"
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
      <dialog id="delete_discount_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-3xl">Hello!</h3>
          <p className="py-4 text-2xl">
            Are you sure you want to delete the selected coupon?
          </p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button onClick={deleteCoupons} className="btn btn-error">
              Delete
            </button>
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default Coupons;
