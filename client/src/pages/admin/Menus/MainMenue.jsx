import { Link, useParams } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import { Header, ReusableTable } from "../../../components";
import { useEffect, useMemo } from "react";
import { getStatusStyles } from "../../../utils";
import useMenus from "./useMenus";

const MainMenus = () => {
  const {
    handleDelete,
    handleEditMenu,
    handleEditModal,
    setEditedMenu,
    setSelectedRow,
    extractedMenuData,
    menuData,
    menuToBeEdited,
    setPrductid,
  } = useMenus();

  const { id } = useParams();

  useEffect(() => {
    setPrductid(id);
  }, []);

  console.log("+++++", id);

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
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

  return (
    <div>
      <Header
        heading="Menus"
        subheading="This section shows information about all the added menus in the application."
      />
      <div className="flex justify-end mt-4">
        <Link className="btn btn-primary" to={PATHS.adminAddMenus}>
          Add Menu
        </Link>
      </div>
      <div className="mt-5">
        {menuData.length > 0 && (
          <ReusableTable
            tableTitle="Main menu List"
            data={extractedMenuData}
            columns={columns}
            showButtons
            enableDelete
            enableEdit
            enablePagination
            pageSize={10}
            onDelete={(row) => {
              setSelectedRow(row);
              window.delete_menu_modal.showModal();
            }}
            onEdit={handleEditModal}
          />
        )}
      </div>
      <dialog id="delete_menu_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Menu</h3>
          <p>Do you want to delete this main menu?</p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() => handleDelete()}
              type="submit"
              className="btn btn-primary"
            >
              Delete
            </button>
            <button
              className="btn"
              onClick={() => {
                window.delete_menu_modal.close();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
      <dialog id="edit_menu_modal" className="modal">
        <form onSubmit={handleEditMenu} method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Edit Menu</h3>
          <div className="form-control py-4">
            <input
              onChange={(e) =>
                setEditedMenu((prevState) => {
                  return { ...prevState, title: e.target.value };
                })
              }
              className="input input-primary "
              defaultValue={menuToBeEdited.title}
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="form-control">
            <select
              onChange={(e) =>
                setEditedMenu((prevState) => {
                  return { ...prevState, status: e.target.value };
                })
              }
              defaultValue={menuToBeEdited.status}
              className="select select-primary"
              name=""
              id=""
            >
              <option value="ACTIVE">Active</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default MainMenus;
