import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import { Card, Header, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";
import { useEffect, useMemo, useState } from "react";
import { getStatusStyles } from "../../utils";

const Menus = () => {
  const [menuData, setMenuData] = useState([]);
  const [menuToBeEdited, setmenuToBeEdited] = useState({});
  const [subMenuData, setSubMenuData] = useState([]);
  const [childMenuData, setChildMenuData] = useState([]);
  const [apiTrigger, setApiTrigger] = useState(false);
  const [editedMenu, setEditedMenu] = useState({});
  const [selectedRow, setSelectedRow] = useState();
  const fetchMenuData = async () => {
    const response = await API_WRAPPER.get("/main-menu");
    if (response && response.data) {
      setMenuData(response.data);
      console.log("MENU DATA", response.data);
    }
  };

  const fetchSubmenuData = async () => {
    const response = await API_WRAPPER.get("/sub-menu");
    setSubMenuData(response.data);
  };

  const fetchChildmenuData = async () => {
    const response = await API_WRAPPER.get("/child-menu");
    setChildMenuData(response.data);
  };

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

  const extractedMenuData = useMemo(() => {
    return menuData.map((element) => ({
      id: element._id,
      title: element.title,
      status: element.status,
    }));
  }, [menuData]);

  const handleDelete = async () => {
    console.log("MENU ROW: ", selectedRow);
    const response = await API_WRAPPER.delete(`/menu/${selectedRow.id}`);
    setApiTrigger((prevState) => !prevState);
    console.log("DELETE RESPONSE: ", response);
    window.delete_menu_modal.close();
  };

  const handleEditModal = (rowToBeEdited) => {
    console.log("ROW TO BE DELETED: ", rowToBeEdited);
    setmenuToBeEdited(rowToBeEdited);
    window.edit_menu_modal.showModal();
  };

  const handleEditMenu = async (e) => {
    e.preventDefault();
    const response = await API_WRAPPER.put(
      `/main-menu/${menuToBeEdited.id}`,
      editedMenu
    );
    if (response.status === 200) {
      window.edit_menu_modal.close();
      setApiTrigger((prevState) => !prevState);
    }
    console.log("EDITED MENU RESPONSE: ", response);
  };

  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        fetchMenuData(),
        fetchSubmenuData(),
        fetchChildmenuData(),
      ]);
    }

    fetchData();
  }, [apiTrigger]);
  console.log(selectedRow);
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

export default Menus;
