import {
  Header,
  DashboardCard,
  Tabs,
  DashboardPieChartCard,
  VendorListComponent,
} from "../../components";
import HeaderImgOne from "../../assets/images/headerImgOne.png";
import ProductOverviewOneImg from "../../assets/images/productOverviewImgOne.png";
import ProductOverviewImgTwo from "../../assets/images/productOverviewImgTwo.png";
import PieChartDashboard from "../../assets/images/pieChartDashboard.png";
import NewUsersGreenChart from "../../assets/images/newUsersGreenChart.png";
import BarChartImg from "../../assets/images/barChartImg.png";
import DetailsCard from "../../components/DashboardChartCard";
import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  TotalSalesIcon,
  TotalSalesBlack,
  RevenueIconBlack,
  AbandomCartBlack,
  NoOfOrders,
  NoOfProducts,
  NoOfVendors,
  AdsSpentBlack,
  BlueIncomeIcon,
  GreenProductsIcon,
  SalesRedIcon,
  GrayVendors,
} from "../../icons";
import { useEffect, useMemo, useState } from "react";
import ReusableTable from "../../components/Table";
import API_WRAPPER from "../../api";
const AdminDashboard = () => {
  const [productCount, setProductCount] = useState(null);
  const [vendorsCount, setVendorsCount] = useState(null);
  const getProductsCount = async () => {
    const response = await API_WRAPPER.get("/products/get-products-count");
    console.log("PRODUCTS COUNT: ", response.data.count);
    if (response.status === 200) {
      setProductCount(response?.data?.count);
    }
  };
  const getVendorsCount = async () => {
    const response = await API_WRAPPER.get("/vendors/get-vendors-count");
    console.log("VENDORS COUNT: ", response.data.count);
    if (response.status === 200) {
      setVendorsCount(response?.data?.count);
    }
  };

  useEffect(() => {
    getProductsCount();
    getVendorsCount();
  }, []);

  const tabs = [
    {
      label: "Total Sales",
      content: (
        <div className="flex gap-4 bg-white">
          {/* add barchart later */}
          <img src={BarChartImg} />
          <div className="w-full flex flex-col gap-2">
            <DetailsCard
              SvgIcon={<TotalSalesBlack />}
              label="Total Sales"
              totalAmount={1800}
              dynamicAmount={-245}
              percentage={"30.6%"}
              percentageColor={"text-red-400"}
            />
            <DetailsCard
              SvgIcon={<RevenueIconBlack />}
              label="Revenue"
              totalAmount={5667}
              dynamicAmount={2100}
              percentage={"30.6%"}
              percentageColor={"text-green-400"}
            />
            <DetailsCard
              SvgIcon={<AbandomCartBlack />}
              label="Abandom Cart"
              totalAmount={128}
              dynamicAmount={-26}
              percentage={"5%"}
              percentageColor={"text-red-400"}
            />
            <DetailsCard
              SvgIcon={<AdsSpentBlack />}
              label="Ads Spent"
              totalAmount={2500}
              dynamicAmount={200}
              percentage={"10.6%"}
              percentageColor={"text-green-400"}
            />
          </div>
        </div>
      ),
    },
    {
      label: "By Month",
      content: (
        <div className="flex gap-4 bg-white">
          {/* add barchart later */}
          <img className="w-52" src={BarChartImg} />
          <div className="w-full flex flex-col gap-2">
            <DetailsCard
              SvgIcon={<TotalSalesBlack />}
              label="Total Sales"
              totalAmount={1800}
              dynamicAmount={-245}
              percentage={"30.6%"}
              percentageColor={"text-red-400"}
            />
            <DetailsCard
              SvgIcon={<RevenueIconBlack />}
              label="Revenue"
              totalAmount={5667}
              dynamicAmount={2100}
              percentage={"30.6%"}
              percentageColor={"text-green-400"}
            />
            <DetailsCard
              SvgIcon={<AbandomCartBlack />}
              label="Abandom Cart"
              totalAmount={128}
              dynamicAmount={-26}
              percentage={"5%"}
              percentageColor={"text-red-400"}
            />
            <DetailsCard
              SvgIcon={<AdsSpentBlack />}
              label="Ads Spent"
              totalAmount={2500}
              dynamicAmount={200}
              percentage={"10.6%"}
              percentageColor={"text-green-400"}
            />
          </div>
        </div>
      ),
    },
    { label: "By Year", content: "Content 3" },
    { label: "By Weekly", content: "Content 4" },
  ];

  const transactionTabs = [
    {
      label: "All Transactions",
      content: (
        <div className="flex gap-4 bg-white">
          {/* add barchart later */}
          <div className="w-full flex flex-col gap-2">
            <DetailsCard
              SvgIcon={<TotalSalesBlack />}
              label="Total Sales"
              totalAmount={1800}
              dynamicAmount={-245}
              percentage={"30.6%"}
              percentageColor={"text-red-400"}
            />
            <DetailsCard
              SvgIcon={<RevenueIconBlack />}
              label="Revenue"
              totalAmount={5667}
              dynamicAmount={2100}
              percentage={"30.6%"}
              percentageColor={"text-green-400"}
            />
            <DetailsCard
              SvgIcon={<AbandomCartBlack />}
              label="Abandom Cart"
              totalAmount={128}
              dynamicAmount={-26}
              percentage={"5%"}
              percentageColor={"text-red-400"}
            />
            <DetailsCard
              SvgIcon={<AdsSpentBlack />}
              label="Ads Spent"
              totalAmount={2500}
              dynamicAmount={200}
              percentage={"10.6%"}
              percentageColor={"text-green-400"}
            />
          </div>
        </div>
      ),
    },
    {
      label: "Pending",
      content: (
        <div className="flex gap-4 bg-white">
          {/* add barchart later */}
          <div className="w-full flex flex-col gap-2">
            <DetailsCard
              SvgIcon={<TotalSalesBlack />}
              label="Total Sales"
              totalAmount={1800}
              dynamicAmount={-245}
              percentage={"30.6%"}
              percentageColor={"text-red-400"}
            />
            <DetailsCard
              SvgIcon={<RevenueIconBlack />}
              label="Revenue"
              totalAmount={5667}
              dynamicAmount={2100}
              percentage={"30.6%"}
              percentageColor={"text-green-400"}
            />
            <DetailsCard
              SvgIcon={<AbandomCartBlack />}
              label="Abandom Cart"
              totalAmount={128}
              dynamicAmount={-26}
              percentage={"5%"}
              percentageColor={"text-red-400"}
            />
            <DetailsCard
              SvgIcon={<AdsSpentBlack />}
              label="Ads Spent"
              totalAmount={2500}
              dynamicAmount={200}
              percentage={"10.6%"}
              percentageColor={"text-green-400"}
            />
          </div>
        </div>
      ),
    },
    {
      label: "Success",
      content: (
        <div className="flex gap-4 bg-white">
          {/* add barchart later */}
          <div className="w-full flex flex-col gap-2">
            <DetailsCard
              SvgIcon={<TotalSalesBlack />}
              label="Total Sales"
              totalAmount={1800}
              dynamicAmount={-245}
              percentage={"30.6%"}
              percentageColor={"text-red-400"}
            />
            <DetailsCard
              SvgIcon={<RevenueIconBlack />}
              label="Revenue"
              totalAmount={5667}
              dynamicAmount={2100}
              percentage={"30.6%"}
              percentageColor={"text-green-400"}
            />
            <DetailsCard
              SvgIcon={<AbandomCartBlack />}
              label="Abandom Cart"
              totalAmount={128}
              dynamicAmount={-26}
              percentage={"5%"}
              percentageColor={"text-red-400"}
            />
            <DetailsCard
              SvgIcon={<AdsSpentBlack />}
              label="Ads Spent"
              totalAmount={2500}
              dynamicAmount={200}
              percentage={"10.6%"}
              percentageColor={"text-green-400"}
            />
          </div>
        </div>
      ),
    },
  ];
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Job",
        accessor: "job",
      },
      {
        Header: "Favorite Color",
        accessor: "color",
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        id: 1,
        name: "John Doe",
        job: "Developer",
        color: "Blue",
      },
      {
        id: 2,
        name: "Jane Smith",
        job: "Designer",
        color: "Red",
      },
      // Add more data as needed
    ],
    []
  );

  const handleEdit = (row) => {
    // Handle edit action
    console.log("Edit:", row);
  };

  const handleDelete = (id) => {
    // Handle delete action
    console.log("Delete:", id);
  };

  // specific return statement ius provided here
  return (
    <div className="flex flex-col ">
      <Header
        heading="Welcome back Vishesh Bajpayee"
        subheading="Seamlessly manage and monitor all aspects of your online store from a centralized hub. Gain valuable insights, streamline operations, and maximize revenue with a user-friendly interface designed to simplifdy your tasks. "
        image={HeaderImgOne}
      />
      <div className="flex gap-4 mt-4">
        <DashboardCard
          number={13323}
          subheading="Total Sales"
          iconColor="bg-error"
          iconSvg={<TotalSalesIcon />}
        />
        <DashboardCard
          number={232}
          subheading="No of Orders"
          iconColor="bg-success"
          iconSvg={<NoOfOrders />}
        />
        <DashboardCard
          number={productCount}
          subheading="Total No. of Products "
          iconColor="bg-orange-500"
          iconSvg={<NoOfProducts />}
        />
        <DashboardCard
          number={vendorsCount}
          subheading="No. of Vendors"
          iconColor="bg-blue-500"
          iconSvg={<NoOfVendors />}
        />
      </div>
      {/* tabs to show data */}
      <Tabs tabs={tabs} />
      {/* product overview and add product */}
      <div className="flex gap-4 w-full">
        <div className="p-4 w-3/4  border-[1px] border-gray-300 mt-8 bg-white rounded-xl">
          <h1>Product overview</h1>
          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-4">
              <div>
                <span className="text-gray-400">Total Product</span>
                <p>35,686</p>
              </div>
              <img src={ProductOverviewOneImg} alt="" />
            </div>
            <div className="flex gap-4">
              <div>
                <span className="text-gray-400">Total Product</span>
                <p>35,686</p>
              </div>
              <img src={ProductOverviewImgTwo} alt="" />
            </div>
            <button className="btn btn-sm btn-info text-white rounded-full">
              Add New Page
            </button>
          </div>
        </div>
        <div className="p-4 w-1/4  border-[1px] border-gray-300 mt-8 rounded-xl flex flex-col gap-4 ">
          <div className="w-full flex gap-5">
            <button className="btn btn-square">I</button>
            <div>
              <h6>Add New Product</h6>
              <p className="text-gray-400">@producDetails</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button className="btn btn-circle btn-info text-white font-thin ">
              +2
            </button>
            <button className="btn btn-circle btn-info ">
              <AiOutlinePlus color="white" />
            </button>
          </div>
        </div>
      </div>
      {/* Transactions, Total Income, Pending Inquiries */}
      <div>
        <div className="w-full">
          <div className="flex  gap-4">
            {/* transactions */}
            <div className="w-1/3">
              <h4 className="font-semibold">Transactions</h4>
              <div>
                <Tabs tabs={transactionTabs} />
              </div>
            </div>
            {/* total income */}
            <div className="w-1/3  border-[1px] border-gray-300 p-4 mt-8 rounded-xl">
              <h4 className="font-bold ">Total Income</h4>
              <div className="flex justify-center">
                <img className=" w-3/3 my-4" src={PieChartDashboard} alt="" />
              </div>
              <div className="flex gap-2">
                <DashboardPieChartCard
                  label="Income"
                  labelColor="bg-blue-500"
                  amount={2321}
                  addAmount={123}
                  icon={<BlueIncomeIcon />}
                />
                <DashboardPieChartCard
                  label="Sales"
                  labelColor="bg-red-500"
                  amount={2321}
                  addAmount={123}
                  icon={<SalesRedIcon />}
                />
              </div>
              <div className="flex gap-2 mt-2">
                <DashboardPieChartCard
                  label="Products"
                  labelColor="bg-green-500"
                  amount={2321}
                  addAmount={123}
                  icon={<GreenProductsIcon />}
                />
                <DashboardPieChartCard
                  label="Vendors"
                  labelColor="bg-gray-500"
                  amount={2321}
                  addAmount={123}
                  icon={<GrayVendors />}
                />
              </div>
            </div>
            {/* pending enquiries */}
            <div className="w-1/3 p-4 mt-8 rounded-xl border-[1px] border-gray-300">
              <div className="flex justify-between py-4 border-b-[1px] border-gray-300">
                <h5>Pending Enquiries</h5>
                <p className="underline text-blue-500">view all</p>
              </div>
              <div className="p-4 border-b-[1px] ">
                <p>Incoming requests</p>
              </div>
              <div className="p-4 border-b-[1px] ">
                <p>You have 2 pending requests..</p>
              </div>
              <div className="p-4 border-b-[1px] ">
                <p>You have 3 pending orders</p>
              </div>
              <div className="p-4 border-b-[1px] ">
                <p>New Order Reveiceds</p>
              </div>
              <div className="mt-6 text-blue-500 flex justify-end">
                Show More
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  New Row*/}
      <div className="flex gap-4 w-full mt-4">
        <div className="w-1/2 p-4 border-[1px] border-gray-400 rounded-xl">
          <div className="flex justify-between items-center">
            <h1 className="font-bold">New Users</h1>
            <select className="select">
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
          <div className="flex gap-4 justify-between items-end w-1/2 ">
            <img className="object-cover" src={NewUsersGreenChart} />
            <button className="btn outline rounded-full w-full">
              view more
            </button>
          </div>
        </div>
        <div className="w-1/2 p-3 border-[1px] border-gray-400 rounded-xl flex items-center justify-center hover:bg-blue-500 transition-all duration-300 ease-in-out hover:text-white hover:text-2xl cursor-pointer hover:font-bold">
          <span>view all transaction history</span>
        </div>
      </div>

      {/* new row */}
      <div className="flex gap-4 w-full mt-4">
        <div className="w-1/3 p-4 border-[1px] border-gray-400 rounded-xl overflow-y-auto">
          <div className="w-full flex items-center justify-between">
            <h5 className="font-semibold">Vendor List</h5>
            <button className="btn btn-square btn-outline btn-error">
              <BsThreeDotsVertical />
            </button>
          </div>
          <div className="flex  flex-col gap-2 mt-2">
            <DashboardPieChartCard
              label="Income"
              labelColor="bg-blue-500"
              amount={2311}
              addAmount={231}
              icon={<BlueIncomeIcon />}
            />
            <DashboardPieChartCard
              label="Query 1"
              labelColor="bg-green-500"
              amount={7234}
              addAmount={323}
              icon={<GreenProductsIcon />}
            />
            <VendorListComponent />
          </div>
        </div>
        {/* recent */}
        <div className="w-2/3 p-4  border-[1px] border-gray-400 rounded-xl ">
          Orders Table
          <ReusableTable
            columns={columns}
            data={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
