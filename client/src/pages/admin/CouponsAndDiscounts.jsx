import { Header, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";
import { useEffect, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
const CouponsAndDiscounts = () => {
  const [discountsList, setDiscountsList] = useState([]);
  const [discountId, setDiscountId] = useState(null);
  const [apiTrigger, setApiTrigger] = useState(false);

  const fetchDiscounts = async () => {
    try {
      const response = await API_WRAPPER.get("/discount/get-all-discounts");
      if (response.status === 200) {
        console.log("DISCOUNTS LISTS: ", response.data);
        setDiscountsList(response?.data);
      }
    } catch (error) {
      console.error("ERROR occured whule fetching discounts list", error);
    }
  };

  const deleteDiscount = async () => {
    const response = await API_WRAPPER.delete(
      `/discount/delete-discount/:${discountId}`
    );
    setApiTrigger((prevState) => !prevState);
    console.log("DELETE DISCOUNT RESPONSE: ", response?.data);
  };

  const handleDiscountDelete = (id) => {
    window.delete_discount_modal.showModal();
    console.log("DISCOUNT ID:", id);
    setDiscountId(id);
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
      // {
      //   Header: "Type Title",
      //   accessor: "typeTitle",
      // },
      // {
      //   Header: "Requirement Title",
      //   accessor: "requirementTitle",
      // },
      // {
      //   Header: "Requirement Value",
      //   accessor: "requirementValue",
      // },
      // {
      //   Header: "Eligiblity Title",
      //   accessor: "eligiblityTitle",
      // },
      // {
      //   Header: "Eligiblity Value",
      //   accessor: "eligiblityValue",
      // },
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
        Header: "Collection ID",
        accessor: "collectionId",
        Cell: (props) => {
          return (
            <>
              {props.row.original.collectionId.map((id) => {
                const shortenedId = id.slice(-4);
                return <p key={nanoid()}>{shortenedId}</p>;
              })}
            </>
          );
        },
      },
      {
        Header: "Product ID",
        accessor: "productId",
        Cell: (props) => {
          return (
            <>
              {props.row.original.productId.map((id) => (
                <p className="" key={id}>
                  {id}
                </p>
              ))}
            </>
          );
        },
      },
      // {
      //   Header: "Category ID",
      //   accessor: "categoryId",
      // },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );
  const data = useMemo(() => discountsList, [discountsList]);

  useEffect(() => {
    fetchDiscounts();
  }, [apiTrigger]);

  return (
    <div>
      <Header
        heading="Coupons and Discounts"
        subheading="This subheading is for coupons and discounts page. This is here to let user know that this page has coupons details."
      />
      <div className="mt-4 overflow-x-auto">
        <h1 className="text-2xl">Discounts List</h1>
        <Link
          to={PATHS.adminAddDiscount}
          className="btn bg-themeColor font-thin text-white w-full my-4"
        >
          Add Discounts
        </Link>
        <ReusableTable
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
            Are you sure you want to delete the selected discount?
          </p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button onClick={deleteDiscount} className="btn btn-error">
              Delete
            </button>
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default CouponsAndDiscounts;
