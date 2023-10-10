import { useMemo } from "react";
import { Header } from "../../../components";
import { GoPlus } from "react-icons/go";
import { Table as ReusableTable } from "../../../components";
import { Link } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import { getStatusStyles } from "../../../utils";
import { MultiSelect } from "react-multi-select-component";
import CategoryManagementBanner from "../../../assets/bannerImages/categoryManagementImage.png";
import useCategories from "./useCategories";
const Categories = () => {
  const {
    attributesList,
    categoriesList,
    convertAttributesList,
    handleDelete,
    handleEdit,
    handleEditChange,
    selectedRow,
    submitDeleteCategory,
    submitEditedRow,
    selectedAttributes,
    setSelectedAttributes,
    getAllCategories,
  } = useCategories();

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
          return getStatusStyles(
            row?.original?.status,
            row?.original,
            getAllCategories
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <Header
        heading="Category Management"
        subheading="This is a subheading for the category management section."
        image={CategoryManagementBanner}
      />

      <div className="w-full  gap-4 mt-14">
        <div className="flex justify-end">
          <Link to={PATHS.adminAddCategory} className="btn btn-primary">
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
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  onChange={(e) => handleEditChange(e)}
                  defaultValue={selectedRow?.name}
                  className="input input-primary"
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
                  className="input input-primary"
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
                  className="input input-primary"
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
                  className="select select-primary"
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
                className="btn btn-primary"
              >
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
