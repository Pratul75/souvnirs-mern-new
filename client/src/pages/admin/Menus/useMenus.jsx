import { useEffect, useMemo, useState } from "react";
import API_WRAPPER from "../../../api";

const useMenus = () => {
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
  return {
    handleDelete,
    handleEditMenu,
    handleEditModal,
    extractedMenuData,
    subMenuData,
    setEditedMenu,
    setSelectedRow,
    childMenuData,
    selectedRow,
    menuData,
    menuToBeEdited,
  };
};

export default useMenus;
