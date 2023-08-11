import { useEffect, useMemo, useState } from "react";
import { Header, ReusableTable, Modal } from "../../components";
import { debouncedShowToast, getStatusStyles } from "../../utils";
import API_WRAPPER from "../../api";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import CustomerListBannerImage from "../../assets/bannerImages/customerListImage.png";
const Customer = () => {
  const [customerList, setCustomerList] = useState([]);
  const [apiTrigger, setApiTrigger] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const navigate = useNavigate();

  const getAllCustomers = async () => {
    try {
      const response = await API_WRAPPER.get("customers/get-customers");
      if (response.status === 200) {
        setCustomerList(response?.data?.customers);
        console.log("CUSTOMER DATA: ", response?.data?.customers);
        debouncedShowToast("Successfully loaded customer list", "success");
      }
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };

  const deleteCustomer = async () => {
    try {
      const response = await API_WRAPPER.delete(
        `/customers/delete-customer/:${selectedRow?._id}`
      );
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };

  const updateCustomer = async (updatedObj) => {
    try {
      const response = await API_WRAPPER.put(
        `customers/update-customer/:${selectedRow?._id}`,
        updatedObj
      );
      if (response.status === 200) {
        debouncedShowToast("Updated customer successfully", "success");
        setApiTrigger((prevState) => !prevState);
      }
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Mobile",
        accessor: "mobile",
      },
      {
        Header: "Organisation Name",
        accessor: "organizationName",
      },
      {
        Header: "Country",
        accessor: "country",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Pin Code",
        accessor: "pincode",
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
  const data = useMemo(() => customerList, [customerList]);

  const handleDelete = (row) => {
    console.log("ROW TO BE DELETED: ", row);
    setSelectedRow(row);
  };

  const handleEdit = (row) => {
    console.log("ROW TO BE EDITED: ", row);
    navigate(`${PATHS.EditCustomer}/${row._id}`);
  };
  const handleDeleteModalClose = () => {
    return window.edit_customer_modal.close();
  };

  const handleSave = (inputValues) => {
    console.log("SAVING THE INPUT VALUES: ", inputValues);
    updateCustomer(inputValues);
  };
  useEffect(() => {
    getAllCustomers();
  }, [apiTrigger]);

  useEffect(() => {
    console.log("CUSTOMER LIST: ", customerList);
  }, [customerList]);

  return (
    <div className="relative">
      <Header
        heading="Customer"
        subheading="This is a customers page which provides information regarding all the customers that are present in the application"
        image={CustomerListBannerImage}
      />
      <div className="mt-4 overflow-x-auto">
        <div className="flex justify-end mb-4">
          <Link
            to={PATHS.adminCreateCustomer}
            className="btn bg-themeColor font-thin text-white w-48"
          >
            Create new
          </Link>
        </div>
      </div>

      <ReusableTable
        tableTitle="Customer List Table"
        columns={columns}
        data={data}
        showButtons
        enableDelete
        enableEdit
        enablePagination
        pageSize={10}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <Modal
        id="edit_customer_modal"
        title="Are you sure you want to delete the selected value?"
        onClose={handleDeleteModalClose}
        onSave={handleSave}
        defaultValues={{
          firstName: selectedRow?.firstName,
          lastName: selectedRow?.lastName,
          email: selectedRow?.email,
          mobile: selectedRow?.mobile,
          organizationName: selectedRow?.organizationName,
          country: selectedRow?.country,
          city: selectedRow?.city,
          pincode: selectedRow?.pincode,
          status: selectedRow?.status,
        }}
        inputs={[
          {
            label: "First Name",
            type: "text",
            name: "firstName",
          },
          {
            label: "Last Name",
            type: "text",
            name: "lastName",
          },
          {
            label: "Email",
            type: "text",
            name: "email",
          },
          {
            label: "Mobile",
            type: "tel",
            name: "mobile",
          },
          {
            label: "Organisation Name",
            type: "text",
            name: "organizationName",
          },
          {
            label: "Country",
            type: "text",
            name: "country",
          },
          {
            label: "City",
            type: "text",
            name: "city",
          },
          {
            label: "Pin Code",
            type: "text",
            name: "pincode",
          },

          {
            label: "Status",
            type: "select",
            name: "status",
          },
        ]}
      />
      <ToastContainer />
    </div>
  );
};

export default Customer;
