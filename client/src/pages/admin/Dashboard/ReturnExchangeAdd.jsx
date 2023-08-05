import { MdCurrencyExchange } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";
import { Card } from "../../../components";
const ReturnExchangeAdd = () => {
  return (
    <div className="w-full grid grid-cols-3 gap-4 mt-4">
      <div className="col-span-3 md:col-span-1">
        <Card>
          <div className="p-4 flex flex-col ">
            <MdCurrencyExchange className="text-green-500 text-3xl mb-1" />
            <h3 className="text-2xl font-semibold mb-4">Return</h3>
            <h3 className="text-green-500 text-xl font-md">310</h3>
            <p className="text-xs text-green-500">Over last month 1.3% ↑</p>
          </div>
        </Card>
      </div>
      <div className="col-span-3 md:col-span-1">
        <Card>
          <div className="p-4 flex flex-col">
            <TbTruckReturn className="text-orange-500 text-3xl mb-1" />
            <h3 className="text-2xl font-semibold mb-4">Exchange</h3>
            <h3 className="text-orange-500 text-xl font-md">310</h3>
            <p className="text-xs text-orange-500">Over last month 1.3% ↓</p>
          </div>
        </Card>
      </div>

      <div className="col-span-3 md:col-span-1">
        <Card>
          <div className="p-4 bg-orange-400 rounded-xl h-full">
            <h3 className="text-white text-2xl">Discount 5%</h3>
            <h3 className="text-white text-2xl">for repairs</h3>
            <p className="text-white ">Action in honor of the company&apos;s</p>
            <p className="mb-4 text-white">5th anniversary</p>
            <button className="btn btn-sm border-none bg-red-500 rounded-full px-4 py-1 text-white">
              More Info
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReturnExchangeAdd;
