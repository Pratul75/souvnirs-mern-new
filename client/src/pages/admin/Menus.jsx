import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import { Header, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";
import { useEffect, useMemo, useState } from "react";

const Menus = () => {
  const [menuData, setMenuData] = useState();
  const [subMenuData, setSubMenuData] = useState();
  const [childMenuData, setChildMenuData] = useState();
  const fetchMenuData = async () => {
    const response = await API_WRAPPER.get("/main-menu");
    console.log("Menus.jsx", response);
    response && response.data && setMenuData(response.data);
  };
  const fetchSubmenuData = async () => {
    const response = await API_WRAPPER.get("/sub-menu");
    setSubMenuData(response.data);
  };
  const fetchChildmenuData = async () => {
    const response = await API_WRAPPER.get("/child-menu");
    setChildMenuData(response.data);
  };

  console.log("Menus.jsx", menuData);

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
  const extractedMenuData = useMemo(
    () => extractTitlesAndStatuses(menuData),
    [menuData]
  );

  function extractTitlesAndStatuses(data) {
    console.log("Menus.jsx", data);
    const extractedData = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const extractedItem = {
        title: element.title,
        status: element.status,
      };
      extractedData.push(extractedItem);
    }
    console.log("CONVERTED DATA :", extractedData);

    return extractedData;
  }

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
  return (
    <div>
      <Header
        heading="Menus"
        subheading="This section shows information about all the added menus in the application."
      />
      <div className="mt-5">
        {/* {menuData && (
          // <ReusableTable
          //   tableTitle="Main menu List"
          //   data={extractedMenuData()}
          //   columns={columns}
          //   showButtons
          //   enableDelete
          //   enableEdit
          //   enablePagination
          //   pageSize={10}

          //   // onDelete={handleDelete}
          //   // onEdit={handleEdit}
          // />
        )} */}

        {/* edit modal */}

        {/* delete modal */}
      </div>

      <div className="flex justify-end mt-4">
        <Link className="btn btn-primary" to={PATHS.adminAddMenus}>
          Add Menu
        </Link>
      </div>
    </div>
  );
};

export default Menus;
