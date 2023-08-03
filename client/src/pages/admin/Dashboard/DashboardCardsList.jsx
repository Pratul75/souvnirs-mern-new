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
      {role && (
        <div className="grid gap-4 mt-4">
          {/* Admin Dashboard */}
          {role === "admin" && (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <DashboardCard
                number={cardData?.sales}
                subheading="Total Sales"
                iconColor="bg-red-500"
                textColor="text-red-500"
                iconSvg={<TotalSalesIcon />}
              />
              <DashboardCard
                number={cardData?.orders}
                subheading="No. of Orders"
                iconSvg={<NoOfOrders />}
                iconColor="bg-green-500"
                textColor="text-green-500"
              />
              <DashboardCard
                number={cardData?.products}
                subheading="Total No. of Products"
                iconSvg={<NoOfProducts />}
                iconColor="bg-orange-500"
                textColor="text-orange-500"
              />
              <DashboardCard
                number={cardData?.vendors}
                subheading="No. of Vendors"
                iconSvg={<NoOfVendors />}
                iconColor="bg-blue-500"
                textColor="text-blue-500"
              />
            </div>
          )}

          {/* Vendor Dashboard */}
          {role === "vendor" && (
            <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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

          {/* Customer Dashboard */}
          {role === "customer" && (
            <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <DashboardCard
                number={cardData?.orders}
                subheading="Total orders"
                iconColor="bg-red-500"
                iconSvg={<NoOfProducts />}
              />
              <DashboardCard
                number={cardData?.wishlist}
                subheading="No. of items in Wishlist"
                iconSvg={<AiFillHeart />}
                iconColor="bg-green-500"
              />
              <DashboardCard
                number={cardData?.cart}
                subheading="No. of items in cart"
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
      )}
    </div>
  );
};

export default DashboardCardsList;
