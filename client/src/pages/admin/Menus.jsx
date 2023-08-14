import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import { Header, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";
import { useEffect, useMemo, useState } from "react";

const Menus = () => {
  const [menuData, setMenuData] = useState([]);
  const [subMenuData, setSubMenuData] = useState([]);
  const [childMenuData, setChildMenuData] = useState([]);

  const fetchMenuData = async () => {
    const response = await API_WRAPPER.get("/main-menu");
    if (response && response.data) {
      setMenuData(response.data);
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

  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        fetchMenuData(),
        fetchSubmenuData(),
        fetchChildmenuData(),
      ]);
    }

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Menu",
        accessor: "menu",
      },
    ],
    []
  );

  const extractedMenuData = useMemo(() => {
    return menuData.map((element) => ({
      title: element.title,
      status: element.status,
    }));
  }, [menuData]);

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
            // onDelete={handleDelete}
            // onEdit={handleEdit}
          />
        )}

        {/* edit modal */}
        {/* delete modal */}
      </div>
    </div>
  );
};

export default Menus;
