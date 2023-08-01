import { Header, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import { getStatusStyles } from "../../utils";
const Discounts = () => {
  const [couponsList, setCouponsList] = useState([]);
  const [couponId, setCouponId] = useState(null);
  const [apiTrigger, setApiTrigger] = useState(false);

  const fetchCoupons = async () => {
    try {
      const response = await API_WRAPPER.get("/coupon/get-all-coupons");
      if (response.status === 200) {
        console.log("COUPONS LISTS: ", response.data);
        setCouponsList(response?.data);
      }
    } catch (error) {
      console.error("ERROR occured whule fetching discounts list", error);
    }
  };

  const deleteCoupons = async () => {
    const response = await API_WRAPPER.delete(
      `/discount/delete-discount/:${couponId}`
    );
    setApiTrigger((prevState) => !prevState);
    console.log("DELETE DISCOUNT RESPONSE: ", response?.data);
  };

  const handleDiscountDelete = (id) => {
    window.delete_discount_modal.showModal();
    console.log("DISCOUNT ID:", id);
    setCouponId(id);
  };

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

  useEffect(() => {
    fetchCoupons();
  }, [apiTrigger]);

  return (
    <div>
      <Header
        heading="Coupons"
        subheading="This subheading is for coupons and discounts page. This is here to let user know that this page has coupons details."
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
          onDelete={handleDiscountDelete}
        />
      </div>
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

export default Discounts;
