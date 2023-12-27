import { MdCurrencyExchange } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";
import { Card } from "../../../components";
import API_WRAPPER from "../../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ReturnExchangeAdd = () => {
  const [transactions, setTransactions] = useState({});
  const [latestDiscount, setLatestDiscount] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getProductData();
    getLatestDiscountData();
  }, []);

  const getProductData = async () => {
    try {
      const response = await API_WRAPPER.get(
        "/dashboard/transactions/reporters"
      );
      setTransactions(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getLatestDiscountData = async () => {
    try {
      const response = await API_WRAPPER.get("/discount/latest-discount");
      setLatestDiscount(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNavigate = () => {
    navigate("/admin/discounts");
  }; ///admin/discounts

  return (
    <div className="w-full grid grid-cols-3 gap-4 mt-4">
      <div className="col-span-3 md:col-span-1">
        <Card>
          <div
            onClick={() => {
              navigate("/admin/refund");
            }}
            className="p-4 flex flex-col cursor-pointer"
          >
            <MdCurrencyExchange className="text-green-500 text-3xl mb-1" />
            <h3 className="text-2xl font-semibold mb-4">Return</h3>
            <h3 className="text-green-500 text-xl font-md">
              {" "}
              {transactions?.AllReturnTrasication?.length}
            </h3>
            {/* <p className="text-xs text-green-500">Over last month 1.3% ↑</p> */}
          </div>
        </Card>
      </div>
      <div className="col-span-3 md:col-span-1">
        <Card>
          <div
            onClick={() => {
              navigate("/admin/replacement");
            }}
            className="p-4 flex flex-col cursor-pointer"
          >
            <TbTruckReturn className="text-orange-500 text-3xl mb-1" />
            <h3 className="text-2xl font-semibold mb-4">Exchange</h3>
            <h3 className="text-orange-500 text-xl font-md">
              {transactions?.AllExchangeTrasication?.length}
            </h3>
            {/* <p className="text-xs text-orange-500">Over last month 2.4% ↓</p> */}
          </div>
        </Card>
      </div>
      <div className="col-span-3 md:col-span-1">
        <Card>
          <div className="p-4 bg-orange-400 rounded-xl h-full">
            <h3 className="text-white text-2xl">
              Discount {latestDiscount?.typeValue}
              {latestDiscount?.typeTitle == "percentage" ? "%" : ""}
            </h3>
            <h3 className="text-white text-2xl">{latestDiscount?.title}</h3>
            <p className="text-white ">Action in honor of the company&apos;s</p>
            <p className="mb-4 text-white">5th anniversary</p>
            <button
              onClick={handleNavigate}
              className="btn btn-sm border-none bg-red-500 rounded-full px-4 py-1 text-white"
            >
              More Info
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReturnExchangeAdd;
