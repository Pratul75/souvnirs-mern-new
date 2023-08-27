import { Menu } from "antd";
import {
  UserOutlined,
  ShopOutlined,
  TeamOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";

const MegaMenu = () => {
  return <>{/* render menus here */}</>;
};
const ShopNavbar = () => {
  return (
    <div>
      <Menu
        mode="horizontal"
        items={[
          {
            label: "Fashion",
            key: "fashion",
            icon: <ShopOutlined />,
            children: [
              {
                label: "Men",
                key: "mens",
                icon: <UserOutlined />,
              },
              {
                label: "Women",
                key: "women",
                icon: <UserOutlined />,
              },
              {
                label: "Kids",
                key: "kids",
                icon: <TeamOutlined />,
              },
            ],
          },
          {
            label: "Home Decor",
            key: "home_decor",
            children: [
              {
                label: "Interior Decor",
                key: "interior-decor",
                icon: <FullscreenExitOutlined />,
              },
              {
                label: "Exterior Decor",
                key: "exterior-decor",
                icon: <FullscreenOutlined />,
              },
            ],
          },
          {
            label: "Electronics",
            key: "electronics",
            children: [{ label: <MegaMenu />, key: "megamenu" }],
          },
        ]}
      ></Menu>
    </div>
  );
};

export default ShopNavbar;
