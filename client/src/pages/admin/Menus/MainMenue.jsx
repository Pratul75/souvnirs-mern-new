import { Link, useParams } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import { Header, ReusableTable } from "../../../components";
import { useEffect, useMemo, useState } from "react";
import { getStatusStyles } from "../../../utils";
import useMenus from "./useMenus";
import API_WRAPPER from "../../../api";

const MainMenus = () => {
  const {
    // handleDelete,
    handleEditMenu,
    handleEditModal,
    setEditedMenu,
    // setSelectedRow,
    // extractedMenuData,
    // menuData,
    menuToBeEdited,
    setPrductid,
    // ChangePosition,
    // fetchMenuData,
  } = useMenus();

  const [menuData, setMenuData] = useState([]);
  const [SelectedRow, setSelectedRow] = useState({});

  const { id } = useParams();

  // useEffect(() => {
  //   setPrductid(id);
  // }, [
  //   handleDelete,
  //   handleEditMenu,
  //   handleEditModal,
  //   setEditedMenu,
  //   setSelectedRow,
  // ]);

  const columns = useMemo(
    () => [
      {
        Header: "Position",
        accessor: "position",
        Cell: ({ row }) => {
          return (
            <input
              style={{
                border: "1px solid",
                borderRadius: "4px",
                width: "15%",
                padding: "3px",
              }}
              onChange={(e) => ChangePosition(e?.target?.value, row?.original)}
              type="number"
              value={row?.original?.position}
            />
          );
        },
      },
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

  const ChangePosition = async (value, dataz) => {
    try {
      // /main-menu/:id
      const UpdateData = await API_WRAPPER?.put(`/main-menu/${dataz?.id}`, {
        position: String(value),
      });
      fetchMenuData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    const response = await API_WRAPPER.get(`/menuById/${id}`);
    if (response && response.data) {
      setMenuData(response.data);
    }
  };

  const extractedMenuData = useMemo(() => {
    return menuData?.map((element) => ({
      id: element._id,
      title: element.title,
      position: element.position,
      status: element.status,
    }));
  }, [menuData]);

  const handleDelete = async () => {
    const response = await API_WRAPPER.delete(`/menu/${SelectedRow?.id}`);
    fetchMenuData();
    window.delete_menu_modal.close();
  };

  return (
    <div>
      <Header
        heading="Menus"
        subheading="This section shows information about all the added menus in the application."
      />
      <div className="flex justify-end mt-4">
        <Link
          className="btn btn-primary"
          to={"/admin/menus/add-menus/add-main-menu"}
        >
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
            refresh={fetchMenuData}
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
