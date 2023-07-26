import { useEffect, useState } from "react";
import { DashboardCard } from "../../../components";
import {
  NoOfOrders,
  NoOfProducts,
  NoOfVendors,
  TotalSalesIcon,
} from "../../../icons";
import API_WRAPPER from "../../../api";

const DashboardCardsList = () => {
  const [cardData, setCardData] = useState()
  const fetchdashboardCardsData = async () => {
    const response = await API_WRAPPER.get('/dashboard/cards')
    console.log('DashboardCardsList.jsx', response);
    setCardData(response?.data)
  }
  useEffect(() => { fetchdashboardCardsData() }, [])
  return (
    <div>
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
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
    </div>
  );
};

export default DashboardCardsList;
