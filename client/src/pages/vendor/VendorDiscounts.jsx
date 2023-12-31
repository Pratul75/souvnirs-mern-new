import { Header, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import { getStatusStyles } from "../../utils";
import { Modal } from "../../components";
const VendorDiscounts = () => {
  const [discountsList, setDiscountsList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
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

  const handleDelete = (row) => {
    window.delete_discount_modal.showModal();
    setSelectedRow(row);
  };

  const handleClose = () => {
    return window.delete_discount_modal.close();
  };

  const handleSave = (inputValues) => {
    console.log("SAVING THE INPUT VALUES: ", inputValues);
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
      // {
      //   Header: "Collection ID",
      //   accessor: "collectionId",
      //   Cell: (props) => {
      //     return (
      //       <>
      //         {props.row.original.collectionId.map((id) => {
      //           const shortenedId = id.slice(-4);
      //           return <p key={nanoid()}>{shortenedId}</p>;
      //         })}
      //       </>
      //     );
      //   },
      // },
      // {
      //   Header: "Product ID",
      //   accessor: "productId",
      //   Cell: ({ row }) => {
      //     return (
      //       <>
      //         {row?.original?.productId?.map((id) => (
      //           <p className="" key={id}>
      //             {id}
      //           </p>
      //         ))}
      //       </>
      //     );
      //   },
      // },
      // {
      //   Header: "Category ID",
      //   accessor: "categoryId",
      // },
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

  const data = useMemo(() => discountsList, [discountsList]);

  useEffect(() => {
    fetchDiscounts();
  }, [apiTrigger]);

  return (
    <div>
      <Header
        heading="Discounts"
        subheading="This subheading is for coupons and discounts page. This is here to let user know that this page has coupons details."
      />
      <div className="mt-4 overflow-x-auto">
        <div className="flex justify-end mb-4">
          {/* <Link
            to={PATHS.adminAddDiscount}
            className="btn bg-themeColor font-thin text-white w-48"
          >
            Add Discounts
          </Link> */}
        </div>
        <ReusableTable
          tableTitle="Discount List"
          columns={columns}
          data={data}
          enablePagination
          pageSize={10}
          showButtons
          enableDeleteonDelete={handleDelete}
        />
      </div>

    </div>
  );
};

export default VendorDiscounts;
