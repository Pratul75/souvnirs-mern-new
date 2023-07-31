import { useEffect, useMemo, useState } from "react";
import { Header } from "../../components";
import { GoPlus } from "react-icons/go";
// import CategoryBannerImg from "../../assets/images/categoryManagement.png";
import ReusableTable from "../../components/Table";
import { Link } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import API_WRAPPER from "../../api";
import { getStatusStyles } from "../../utils";
import { MultiSelect } from "react-multi-select-component";

const Categories = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [attributesList, setAttributesList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [editedRow, setEditedRow] = useState({});
  const [apiTrigger, setApiTrigger] = useState(false);
  // Add selectedRow.attributes to selectedAttributes

  const [selectedAttributes, setSelectedAttributes] = useState([]);

  const getAllCategories = async () => {
    try {
      const response = await API_WRAPPER.get("/category/get-all-categories");
      if (response.status === 200) {
        console.log("ALL CATEGORIES LIST: ", response.data);
        setCategoriesList(response?.data);
      }
    } catch (error) {
      console.error("Error occurred while fetching all categories", {
        error,
      });
    }
  };

  const convertAttributesList = (arr) => {
    const convertedArr = arr.map(({ _id, name }) => ({
      label: name,
      value: _id,
    }));
    console.log("CONVERTED ARR: ", convertedArr);
    return convertedArr;
  };

  const getAllAttributes = async () => {
    try {
      const response = await API_WRAPPER.get("/attribute/get-all-attributes");
      if (response.status === 200) {
        setAttributesList(response?.data);
        console.log("ATTRIBUTES LIST RESPONSE: ", response?.data);
      }
    } catch (error) {
      console.error("Error occurred in fetching all attributes", error);
    }
  };

  const handleDelete = (row) => {
    console.log("SELECTED ROW: ", row);
    window.categories_delete_modal.showModal();
    setSelectedRow(row);
  };

  const handleEdit = (row) => {
    console.log("SELECTED ROW: ", row);
    window.categories_edit_modal.showModal();
    setSelectedRow(row);
  };

  const handleEditChange = (e) => {
    setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
  };

  const submitEditedRow = async (e) => {
    // e.preventDefault();
    const response = await API_WRAPPER.put(
      `/category/update-category/:${selectedRow._id}`,
      { ...editedRow, attributes: selectedAttributes.map((item) => item.value) }
    );
    if (response?.status === 200) {
      setApiTrigger((prevState) => !prevState);
      window.categories_edit_modal.close();
    }
  };

  const submitDeleteCategory = async (e) => {
    e.preventDefault();
    const response = await API_WRAPPER.delete(
      `/category/delete-category/:${selectedRow._id}`
    );
    if (response.status === 200) {
      console.log("CATEGORY DELETED", response?.data);
      window.categories_delete_modal.close();
      setApiTrigger((prevState) => !prevState);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "HSN Id",
        accessor: "hsn_code",
      },
      {
        Header: "Type",
        accessor: "type",
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

  useEffect(() => {
    getAllCategories();
  }, [apiTrigger]);

  useEffect(() => {
    getAllAttributes();
  }, []);

  useEffect(() => {
    console.log("SELECTED ATTRIBUTES: ", selectedAttributes);
  }, [selectedAttributes]);

  useEffect(() => {
    // Set default selected values for MultiSelect based on selectedRow.attributes
    const defaultSelectedAttributes = selectedRow.attributes
      ? selectedRow.attributes.map((attributeId) => {
        const attribute = attributesList.find(
          (attr) => attr._id === attributeId
        );
        return {
          label: attribute?.name || "", // Set label to attribute name if found, otherwise an empty string
          value: attributeId,
        };
      })
      : [];
    setSelectedAttributes(defaultSelectedAttributes);
  }, [selectedRow, attributesList]);

  return (
    <>
      <Header
        heading="Category Management"
        subheading="This is a subheading for the category management section. This subheading contains necessary details that are required by the user to know about the category page "
      // image={CategoryBannerImg}
      />

      <div className="w-full  gap-4 mt-14">
        <div className="flex justify-end">
          <Link
            to={PATHS.adminAddCategory}
            className="btn bg-themeColor text-white font-thin w-48"
          >
            <GoPlus size={20} />
            Add Category
          </Link>
        </div>
      </div>
      <div className="mt-5">
        <ReusableTable
          tableTitle="Categories List"
          data={categoriesList}
          columns={columns}
          showButtons
          enableDelete
          enableEdit
          enablePagination
          pageSize={10}
          onDelete={handleDelete}
          onEdit={handleEdit}

        />

        {/* edit modal */}
        <dialog id="categories_edit_modal" className="modal">
          <form

            method="dialog"
            className="modal-box"
          >
            <h3 className="font-bold text-lg">Hello!</h3>
            <div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  onChange={(e) => handleEditChange(e)}
                  defaultValue={selectedRow?.name}
                  className="input input-accent"
                  type="text"
                  name="name"
                  id=""
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Type</span>
                </label>
                <input
                  onChange={(e) => handleEditChange(e)}
                  defaultValue={selectedRow?.type}
                  className="input input-accent"
                  type="text"
                  name="type"
                  id=""
                />
              </div>
              <div className="form-control">
                <div className="label">
                  <span>Select Attributes</span>
                </div>
                <MultiSelect
                  options={convertAttributesList(attributesList)}
                  value={selectedAttributes}
                  onChange={setSelectedAttributes}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">HSN ID</span>
                </label>
                <input
                  onChange={(e) => handleEditChange(e)}
                  defaultValue={selectedRow?.hsn_code}
                  className="input input-accent"
                  type="text"
                  name="hsn_code"
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
              <button type="button" onClick={(e) => submitEditedRow(e)} className="btn btn-accent">
                Save changes
              </button>
              <button
                onClick={() => window.categories_edit_modal.close()}
                className="btn"
              >
                Close
              </button>
            </div>
          </form>
        </dialog>

        {/* delete modal */}
        <dialog id="categories_delete_modal" className="modal">
          <form
            onSubmit={(e) => submitDeleteCategory(e)}
            method="dialog"
            className="modal-box"
          >
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <button className="btn btn-error">Delete</button>
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => window.categories_delete_modal.close()}
                className="btn"
              >
                Close
              </button>
            </div>
          </form>
        </dialog>
      </div>
    </>
  );
};

export default Categories;
