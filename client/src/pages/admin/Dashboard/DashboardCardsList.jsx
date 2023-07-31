import { useEffect, useState } from "react";
import { DashboardCard } from "../../../components";
import {
  NoOfOrders,
  NoOfProducts,
  NoOfVendors,
  TotalSalesIcon,
} from "../../../icons";
import API_WRAPPER from "../../../api";
import { decodeToken } from "react-jwt";
import { AiFillHeart } from "react-icons/ai";
import { BsCashCoin } from "react-icons/bs";

const DashboardCardsList = () => {
  const [cardData, setCardData] = useState();
  const [role, setRole] = useState();
  const fetchdashboardCardsData = async () => {
    const response = await API_WRAPPER.get("/dashboard/cards");
    console.log("DashboardCardsList.jsx", response);
    setCardData(response?.data);
    const token = localStorage.getItem("token");
    const { role } = decodeToken(token);
    setRole(role);
  };

  useEffect(() => {
    fetchdashboardCardsData();
  }, []);
  return (
    <div>
      {" "}
      {role && role === "admin" && (
        <div
          className={`grid grid-cols-${
            role === "admin" ? "4" : "3"
          } gap-4 mt-4`}
        >
          <DashboardCard
            number={cardData?.sales}
            subheading="Total Sales"
            iconColor="bg-red-500"
            iconSvg={<TotalSalesIcon />}
          />
          <DashboardCard
            number={cardData?.orders}
            subheading="No. of Orders"
            iconSvg={<NoOfOrders />}
            iconColor="bg-green-500"
          />
          <DashboardCard
            number={cardData?.products}
            subheading="Total No. of Products"
            iconSvg={<NoOfProducts />}
            iconColor="bg-orange-500"
          />

          <DashboardCard
            number={cardData?.vendors}
            subheading="No. of Vendors"
            iconSvg={<NoOfVendors />}
            iconColor="bg-blue-500"
          />
        </div>
      )}{" "}
      {role && role === "vendor" && (
        <div
          className={`grid grid-cols-${
            role === "admin" ? "4" : "3"
          } gap-4 mt-4`}
        >
          <DashboardCard
            number={cardData?.sales}
            subheading="Total Sales"
            iconColor="bg-red-500"
            iconSvg={<TotalSalesIcon />}
          />
          <DashboardCard
            number={cardData?.orders}
            subheading="No. of Orders"
            iconSvg={<NoOfOrders />}
            iconColor="bg-green-500"
          />
          <DashboardCard
            number={cardData?.products}
            subheading="Total No. of Products"
            iconSvg={<NoOfProducts />}
            iconColor="bg-orange-500"
          />
        </div>
      )}
      {role && role === "customer" && (
        <div className={`grid grid-cols-4 gap-4 mt-4`}>
          <DashboardCard
            number={cardData?.orders}
            subheading="Total orders"
            iconColor="bg-red-500"
            iconSvg={<NoOfProducts />}
          />
          <DashboardCard
            number={cardData?.wishlist}
            subheading="No. of items in  Wishlist"
            iconSvg={<AiFillHeart />}
            iconColor="bg-green-500"
          />
          <DashboardCard
            number={cardData?.cart}
            subheading="No. of items in  cart"
            iconSvg={<NoOfOrders />}
            iconColor="bg-orange-500"
          />
          <DashboardCard
            number={cardData?.orderValue}
            subheading="Total order value"
            iconSvg={<BsCashCoin />}
            iconColor="bg-orange-500"
          />
        </div>
      )}
    </div>
  );
};

export default DashboardCardsList;
