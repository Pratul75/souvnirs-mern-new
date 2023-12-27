import { useEffect, useMemo, useState } from "react";
import API_WRAPPER from "../../../api";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";

const useMenus = () => {
  const [menuData, setMenuData] = useState([]);
  const [menuToBeEdited, setmenuToBeEdited] = useState({});
  const [subMenuData, setSubMenuData] = useState([]);
  const [childMenuData, setChildMenuData] = useState([]);
  const [apiTrigger, setApiTrigger] = useState(false);
  const [editedMenu, setEditedMenu] = useState({});
  const [selectedRow, setSelectedRow] = useState();
  const [Prductid, setPrductid] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPagesShow, setTotalPagesShow] = useState(0);
  const [productLoading, setProductLoading] = useState(false);
  const [seacrhText, SetSearchTex] = useState("");

  const navigate = useNavigate();

  console.log("===<><><>+++", Prductid);
  const fetchMenuData = async () => {
    const response = await API_WRAPPER.get(
      `/all/menu?page=${page}&pageSize=${pageSize}&seacrhText=${seacrhText}`
    );
    if (response && response.data) {
      //  totalData,
      // page, totalPages, menus,
      setMenuData(response.data?.menus);
      setTotalPagesShow(response.data?.totalPages);
      console.log("MENU DATA000", response.data);
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
      position: element.position,
      status: element.status,
    }));
  }, [menuData]);

  const handleDelete = async (row) => {
    const response = await API_WRAPPER.delete(`/menu/delete/${row.id}`);
    fetchMenuData();
    setApiTrigger((prevState) => !prevState);
    console.log("DELETE RESPONSE: ", response);
    window.delete_menu_modal.close();
  };

  const handleEditModal = (rowToBeEdited) => {
    const { id } = rowToBeEdited;
    navigate(`${PATHS.adminEditMenus}/${id}`);
  };

  const handleEditMenu = async (e) => {
    e.preventDefault();
    const response = await API_WRAPPER.put(
      `/menuById/${menuToBeEdited.id}`,
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
  }, [apiTrigger, Prductid, page, pageSize, seacrhText]);

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
    setPrductid,
    fetchMenuData,
    setPageSize,
    setPage,
    pageSize,
    page,
    totalPagesShow,
    productLoading,
    SetSearchTex,
    seacrhText,
    ChangePosition,
  };
};

export default useMenus;
