import { Header, Ratings, ReusableTable } from "../../../components";
import ReviewsBannerImage from "../../../assets/bannerImages/reviewsImage.png";
import { useEffect, useState } from "react";
import API_WRAPPER from "../../../api";
import { getStatusStyles } from "../../../utils";
const Reviews = () => {
  const [state, setState] = useState({
    data: [],
    columns: [],
  });
  const [selectedrow, setselectedrow] = useState({});
  const columns = [
    {
      Header: "Product Name",
      accessor: "productDetails.name",
    },
    {
      Header: "Customer Name",
      accessor: "customer",
      Cell: ({ row }) => {
        return (
          <div>
            <p>
              {row?.original?.customerDetails?.firstName}{" "}
              {row?.original?.customerDetails?.lastName}
            </p>
          </div>
        );
      },
    },
    {
      Header: "Vendor Name",
      accessor: "vendor",
      Cell: ({ row }) => {
        return (
          <div>
            <p>
              {row?.original?.vendorDetails?.firstName}{" "}
              {row?.original?.vendorDetails?.lastName}
            </p>
          </div>
        );
      },
    },
    {
      Header: "Review message",
      accessor: "description",
    },
    {
      Header: "Rating",
      accessor: "rating",
      Cell: ({ row }) => {
        return (
          <div>
            <Ratings rating={row?.original?.rating} />
          </div>
        );
      },
    },
    // {
    //   Header: "Status",
    //   accessor: "status",
    //   Cell: ({ row }) => {
    //     return getStatusStyles(
    //       row?.original?.status,
    //       row?.original,
    //       getAllReviews
    //     );
    //   },
    // },
  ];

  const getAllReviews = async () => {
    const response = await API_WRAPPER.get("/review/get-all-reviews");
    setState((pre) => ({ ...pre, data: response?.data }));
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  const handleDeleteSubmit = async () => {
    const response = await API_WRAPPER.delete(
      `/review/delete/get-all-reviews/${selectedrow?._id}`
    );
    getAllReviews();
    window.review_delete_modal.close();
  };

  const handleDelete = async (row) => {
    setselectedrow(row);
    window.review_delete_modal.showModal();
  };

  return (
    <div>
      <Header
        heading="Reviews"
        subheading="This is a subheading for the reviews section. This subheading contins necessary details that are required by user to know "
        image={ReviewsBannerImage}
      />
      <ReusableTable
        tableTitle="Review List"
        data={state?.data}
        columns={columns}
        showButtons
        enableDelete
        onDelete={handleDelete}
        pageSize={10}
        enablePagination
      />
      <dialog id="review_delete_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}

            <button
              onClick={() => handleDeleteSubmit()}
              className="btn btn-error"
            >
              Delete
            </button>
            <button
              onClick={() => window.review_delete_modal.close()}
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

export default Reviews;
