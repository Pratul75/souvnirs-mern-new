import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import { Header } from "../../components";
import API_WRAPPER from "../../api";
import { useEffect, useState } from "react";

const Menus = () => {
  const [menuData, setMenuData] = useState();
  const fetchMenuData = async (req, res) => {
    const response = await API_WRAPPER.get("/menu");
  };
  useEffect(() => {
    fetchMenuData();
  }, []);
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
    </div>
  );
};

export default Menus;
