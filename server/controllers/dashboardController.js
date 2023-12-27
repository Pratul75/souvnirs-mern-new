const cartModal = require("../schema/cartModal");
const Order = require("../schema/orderModal");
const Product = require("../schema/productModal");
const Vendor = require("../schema/vendorModal");
const Wishlist = require("../schema/wishlistModal");
const excelToJson = require("convert-excel-to-json");
const { ObjectId } = require("mongoose").Types;
const fs = require("fs");

const fetchDashboardCardsData = async (req, res) => {
  const { role } = req;
  let sales, orders, products, vendors;
  if (role === "vendor") {
    console.log("dashboardController.js", req.role, req.userId);
    sales = await Order.find({
      order_status: "delivered",
      vendor_id: req.UserId,
    }).count();
    orders = await Order.find({ vendor_id: req.userId }).count();
    products = await Product.find({ vendorId: req.userId }).count();
  } else if (role === "admin") {
    sales = await Order.aggregate([
      {
        $match: {
          order_status: "delivered",
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$total_price" },
        },
      },
    ]);
    sales = sales[0]?.totalSales;
    orders = await Order.find().count();
    products = await Product.find().count();
    vendors = await Vendor.find().count();
  } else if (role === "customer") {
    const wishlist = await Wishlist.find({ customerId: req.userId }).count();
    const orders = await Order.find({ customer_id: req.userId }).count();
    orderValue = await Order.aggregate([
      // Match orders with a valid customer _id (replace 'customer_id_field' with the actual field name)
      { $match: { customer_id: req.userId } },

      // Group by customer _id and calculate the sum of total_price for each customer
      {
        $group: {
          _id: "$customer_id_field", // Group by customer _id (replace 'customer_id_field' with the actual field name)
          total_price: { $sum: "$total_price" }, // Calculate the sum of total_price for each group
        },
      },
    ]);
    const cart = await cartModal.find({ customer_id: req.userId }).count();

    return res.status(200).json({
      orders,
      wishlist,
      cart,
      orderValue: orderValue.length > 0 ? orderValue[0].total_price : 0,
    });
  }
  console.log("sales==>....>>>", sales, orders, products, vendors);

  res.status(200).json({ sales, orders, products, vendors });
};

/**
 * ////////////////////////////////////
 * @param {
 *
 * } req
 * @param {*} res
 * @returns
 * ///////////////////////////////////////////
 * ///////////////////////////////////
 */

const getBarChartData = async (req, res) => {
  const { role, userId } = req;
  if (role === "vendor") {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7); // 6 we
    const r = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
          vendor_id: userId,
        },
        // Filter orders in the last 7 days based on createdAt
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }, // Group by the date in YYYY-MM-DD format
          },
          count: { $sum: 1 }, // Count the number of orders for each date
        },
      },
      {
        $sort: { _id: 1 }, // Sort by date in ascending order
      },
    ]);
    function getLast7Dates() {
      const today = new Date();
      const last7Dates = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        last7Dates.push(formattedDate);
      }

      return last7Dates;
    }
    const sevenMonthsAgo = new Date();
    sevenMonthsAgo.setMonth(sevenMonthsAgo.getMonth() - 7);
    let m = await Order.aggregate([
      {
        $match: { createdAt: { $gte: sevenMonthsAgo }, vendor_id: userId }, // Filter orders in the last 7 months based on createdAt
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$createdAt" }, // Group by the month in YYYY-MM format
          },
          count: { $sum: 1 }, // Count the number of orders for each month
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month in ascending order
      },
    ]);
    // Usage example
    function getLast7Months() {
      const today = new Date();
      const last7Months = [];

      for (let i = 0; i < 7; i++) {
        const month = today.getMonth() - i;
        const year = today.getFullYear();

        // Adjust for months crossing into the previous year
        if (month < 0) {
          month += 12;
          year -= 1;
        }

        const formattedMonth = `${year}-${String(month + 1).padStart(2, "0")}`;
        last7Months.push(formattedMonth);
      }

      return last7Months;
    }
    const sevenYearsAgo = new Date();
    sevenYearsAgo.setFullYear(sevenYearsAgo.getFullYear() - 7); // 7 years ago

    // MongoDB Aggregation pipeline to count orders for the last 7 years (with year and month)
    let y = await Order.aggregate([
      {
        $match: { createdAt: { $gte: sevenYearsAgo }, vendor_id: userId }, // Filter orders in the last 7 years based on createdAt
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y", date: "$createdAt" }, // Group by the year in YYYY format
          },
          count: { $sum: 1 }, // Count the number of orders for each year
        },
      },
      {
        $sort: { _id: 1 }, // Sort by year in ascending order
      },
    ]);
    // Usage example

    function getLast7Years() {
      const today = new Date();
      const last7Years = [];

      for (let i = 0; i < 7; i++) {
        const year = today.getFullYear() - i;
        last7Years.push(year);
      }

      return last7Years;
    }

    // Usage example
    const last7Years = getLast7Years().reverse();
    console.log(last7Years);
    const last7Months = getLast7Months().reverse();
    console.log(last7Months);

    const last7Dates = getLast7Dates().reverse();

    function mixArrays(dateArray, dataArray) {
      const mixedArray = [];
      const labels = [];
      const counts = [];
      let totalsells = 0;

      for (const date of dateArray) {
        let count = 0;
        for (const dataObj of dataArray) {
          if (dataObj._id == date) {
            count = dataObj.count;
            break;
          }
        }
        mixedArray.push({ label: date, count });
        labels.push(date);
        counts.push(count);
      }

      return { labels, counts };
    }

    const totalSales = await Order.aggregate([
      {
        $match: {
          order_status: "delivered",
          vendor_id: userId,
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$total_price" },
        },
      },
    ]);

    const mixeddateData = mixArrays(last7Dates, r);
    const mixedMonthData = mixArrays(last7Months, m);
    const mixedYearData = mixArrays(last7Years, y);
    return res.status(200).json({
      dateData: mixeddateData,
      monthData: mixedMonthData,
      yearData: mixedYearData,
      totalSales: totalSales.length > 0 ? totalSales.length : 0,
    });
  }
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7); // 6 we
  const r = await Order.aggregate([
    {
      $match: { createdAt: { $gte: sevenDaysAgo } }, // Filter orders in the last 7 days based on createdAt
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }, // Group by the date in YYYY-MM-DD format
        },
        count: { $sum: "$total_price" }, // Count the number of orders for each date
      },
    },
    {
      $sort: { _id: 1 }, // Sort by date in ascending order
    },
  ]);
  function getLast7Dates() {
    const today = new Date();
    const last7Dates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      last7Dates.push(formattedDate);
    }

    return last7Dates;
  }
  const sevenMonthsAgo = new Date();
  sevenMonthsAgo.setMonth(sevenMonthsAgo.getMonth() - 7);
  let m = await Order.aggregate([
    {
      $match: { createdAt: { $gte: sevenMonthsAgo } }, // Filter orders in the last 7 months based on createdAt
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m", date: "$createdAt" }, // Group by the month in YYYY-MM format
        },
        count: { $sum: "$total_price" }, // Count the number of orders for each month
      },
    },
    {
      $sort: { _id: 1 }, // Sort by month in ascending order
    },
  ]);
  // Usage example
  function getLast7Months() {
    const today = new Date();
    const last7Months = [];

    for (let i = 0; i < 7; i++) {
      const month = today.getMonth() - i;
      const year = today.getFullYear();

      // Adjust for months crossing into the previous year
      if (month < 0) {
        month += 12;
        year -= 1;
      }

      const formattedMonth = `${year}-${String(month + 1).padStart(2, "0")}`;
      last7Months.push(formattedMonth);
    }

    return last7Months;
  }
  const sevenYearsAgo = new Date();
  sevenYearsAgo.setFullYear(sevenYearsAgo.getFullYear() - 7); // 7 years ago

  // MongoDB Aggregation pipeline to count orders for the last 7 years (with year and month)
  let y = await Order.aggregate([
    {
      $match: { createdAt: { $gte: sevenYearsAgo } }, // Filter orders in the last 7 years based on createdAt
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y", date: "$createdAt" }, // Group by the year in YYYY format
        },
        count: { $sum: "$total_price" }, // Count the number of orders for each year
      },
    },
    {
      $sort: { _id: 1 }, // Sort by year in ascending order
    },
  ]);
  // Usage example

  function getLast7Years() {
    const today = new Date();
    const last7Years = [];

    for (let i = 0; i < 7; i++) {
      const year = today.getFullYear() - i;
      last7Years.push(year);
    }

    return last7Years;
  }

  // Usage example
  const last7Years = getLast7Years().reverse();
  console.log(last7Years);
  const last7Months = getLast7Months().reverse();
  console.log(last7Months);

  const last7Dates = getLast7Dates().reverse();

  function mixArrays(dateArray, dataArray) {
    const mixedArray = [];
    const labels = [];
    const counts = [];

    for (const date of dateArray) {
      let count = 0;
      for (const dataObj of dataArray) {
        if (dataObj._id == date) {
          count = dataObj.count;
          break;
        }
      }
      mixedArray.push({ label: date, count });
      labels.push(date);
      counts.push(count);
    }

    return { labels, counts };
  }

  const totalSales = await Order.aggregate([
    {
      $match: {
        order_status: "delivered",
      },
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$total_price" },
      },
    },
  ]);

  let totalSalesAmount = 0; // Default value in case totalSales is empty
  console.log("====>???", totalSales);
  if (totalSales.length > 0) {
    totalSalesAmount = totalSales[0].totalSales;
  }

  const mixeddateData = mixArrays(last7Dates, r);
  const mixedMonthData = mixArrays(last7Months, m);
  const mixedYearData = mixArrays(last7Years, y);
  let totalDateSells = 0;
  let totalMothsSells = 0;
  let totalYearsSells = 0;
  mixedYearData?.counts?.map((item) => {
    if (item > 0) {
      totalYearsSells += item;
    }
  });
  mixedMonthData?.counts?.map((item) => {
    if (item > 0) {
      totalMothsSells += item;
    }
  });
  mixeddateData?.counts?.map((item) => {
    if (item > 0) {
      totalDateSells += item;
    }
  });
  mixedYearData.totalYearsSells = totalYearsSells;
  mixedMonthData.totalMothsSells = totalMothsSells;
  mixeddateData.totalDateSells = totalDateSells;

  res.status(200).json({
    dateData: mixeddateData,
    monthData: mixedMonthData,
    yearData: mixedYearData,
    totalSales: totalSales.length > 0 ? totalSales[0].totalSales : [],
  });
};

const getProductDataForAdmin = async (req, res) => {
  console.log(req.userId);
  let data = await Product.aggregate([
    {
      $match: {
        updatedAt: {
          $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
        },
        vendorId: req.userId, // Filter products updated in the last 6 months
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$updatedAt" } }, // Group by year-month
        totalCount: { $sum: 1 }, // Calculate the count of products in each group
      },
    },
    {
      $sort: {
        _id: 1, // Sort the results by year-month in ascending order
      },
    },
  ]);
  const orders = await Order.find({
    order_status: { $in: ["ordered", "processing"] },
  });
  const totalOrder = await Order.find();

  function extractDateAndCount(data) {
    const datesArray = data.map((item) => item._id);
    const countsArray = data.map((item) => item.totalCount);
    return {
      dates: datesArray,
      counts: countsArray,
      Pendingorders: orders,
      totalOrder,
    };
  }
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  // Query for orders with status "ordered" or "processing" and createdAt within the last six months

  const result = extractDateAndCount(data);
  res.status(200).json(result);
};

const getDoughNutChartData = async (req, res) => {
  if (req.role === "admin") {
    const products = await Product.find().count();
    const vendors = await Vendor.find().count();
    let sales = await Order.aggregate([
      {
        $match: {
          order_status: "delivered",
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$total_price" },
        },
      },
    ]);
    sales = sales[0]?.totalSales;
    let Totalorders = await Order.aggregate([
      {
        $match: {
          order_status: "delivered",
          payment_status: "success",
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$total_price" },
        },
      },
    ]);
    Totalorders = Totalorders[0]?.totalSales;
    res
      .status(200)
      .json({ products, vendors, income: Totalorders, sales: sales });
  } else if (req.role === "vendor") {
    const products = await Product.find({ vendorId: req.userId }).count();
    res.status(200).json({ products, vendors: 1, income: 0, sales: 0 });
  }
};

const AdminTransactionDetails = async (req, res) => {
  try {
    let AllTrasication,
      AllSuccessTrasication,
      AllPendingTrasication,
      AllExchangeTrasication,
      AllReturnTrasication;
    if (req.role === "vendor") {
      AllTrasication = await Order.aggregate([
        {
          $match: {
            vendor_id: ObjectId(req.userId),
          },
        },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "product_id",
            as: "product",
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        { $limit: 10 },
      ]);
      AllSuccessTrasication = await Order.aggregate([
        {
          $match: {
            payment_status: "success",
            vendor_id: ObjectId(req.userId),
          },
        },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "product_id",
            as: "product",
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        { $limit: 10 },
      ]);
      AllPendingTrasication = await Order.aggregate([
        {
          $match: {
            payment_status: "pending",
            vendor_id: ObjectId(req.userId),
          },
        },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "product_id",
            as: "product",
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        { $limit: 10 },
      ]);
      AllExchangeTrasication = await Order.aggregate([
        {
          $match: {
            order_status: "replace",
            vendor_id: ObjectId(req.userId),
          },
        },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "product_id",
            as: "product",
          },
        },
        // {
        //   $lookup: {
        //     from: "products", // The name of the "products" collection
        //     localField: "product_id",
        //     foreignField: "_id",
        //     as: "product",
        //   },
        // },
        // {
        //   $unwind: "$product", // Deconstruct the "product" array created by $lookup
        // },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);
      AllReturnTrasication = await Order.aggregate([
        {
          $match: {
            order_status: "refund",
            vendor_id: ObjectId(req.userId),
          },
        },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "product_id",
            as: "product",
          },
        },
        // {
        //   $lookup: {
        //     from: "products", // The name of the "products" collection
        //     localField: "product_id",
        //     foreignField: "_id",
        //     as: "product",
        //   },
        // },
        // {
        //   $unwind: "$product", // Deconstruct the "product" array created by $lookup
        // },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);
    } else {
      AllTrasication = await Order.aggregate([
        {
          $sort: { createdAt: -1 },
        },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "product_id",
            as: "product",
          },
        },
        // {
        //   $lookup: {
        //     from: "products", // The name of the "products" collection
        //     localField: "product_id",
        //     foreignField: "_id",
        //     as: "product",
        //   },
        // },
        // {
        //   $unwind: "$product", // Deconstruct the "product" array created by $lookup
        // },
        { $limit: 10 },
      ]);
      AllSuccessTrasication = await Order.aggregate([
        {
          $match: {
            payment_status: "success",
          },
        },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "product_id",
            as: "product",
          },
        },
        // {
        //   $lookup: {
        //     from: "products", // The name of the "products" collection
        //     localField: "product_id",
        //     foreignField: "_id",
        //     as: "product",
        //   },
        // },
        // {
        //   $unwind: "$product", // Deconstruct the "product" array created by $lookup
        // },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);
      AllPendingTrasication = await Order.aggregate([
        {
          $match: {
            payment_status: "pending",
          },
        },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "product_id",
            as: "product",
          },
        },
        // {
        //   $lookup: {
        //     from: "products", // The name of the "products" collection
        //     localField: "product_id",
        //     foreignField: "_id",
        //     as: "product",
        //   },
        // },
        // {
        //   $unwind: "$product", // Deconstruct the "product" array created by $lookup
        // },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);
      AllExchangeTrasication = await Order.aggregate([
        {
          $match: {
            order_status: "replace",
          },
        },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "product_id",
            as: "product",
          },
        },
        // {
        //   $lookup: {
        //     from: "products", // The name of the "products" collection
        //     localField: "product_id",
        //     foreignField: "_id",
        //     as: "product",
        //   },
        // },
        // {
        //   $unwind: "$product", // Deconstruct the "product" array created by $lookup
        // },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);
      AllReturnTrasication = await Order.aggregate([
        {
          $match: {
            order_status: "refund",
          },
        },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "product_id",
            as: "product",
          },
        },
        // {
        //   $lookup: {
        //     from: "products", // The name of the "products" collection
        //     localField: "product_id",
        //     foreignField: "_id",
        //     as: "product",
        //   },
        // },
        // {
        //   $unwind: "$product", // Deconstruct the "product" array created by $lookup
        // },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);
    }
    res.status(200).json({
      AllTrasication,
      AllPendingTrasication,
      AllSuccessTrasication,
      AllExchangeTrasication,
      AllReturnTrasication,
    });
  } catch (error) {}
};

module.exports = {
  getDoughNutChartData,
  fetchDashboardCardsData,
  getBarChartData,
  getProductDataForAdmin,
  AdminTransactionDetails,
};
