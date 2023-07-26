const Order = require("../schema/orderModal");
const Product = require("../schema/productModal");
const Vendor = require("../schema/vendorModal");

const fetchDashboardCardsData = async (req, res) => {
    const sales = await Order.find({ order_status: "delivered" }).count();
    const orders = await Order.find().count()
    const products = await Product.find().count()
    const vendors = await Vendor.find().count()



    res.status(200).json({ sales, orders, products, vendors })
}
const getBarChartData = async (req, res) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)// 6 we
    const r = await Order.aggregate([
        {
            $match: { createdAt: { $gte: sevenDaysAgo } }, // Filter orders in the last 7 days based on createdAt
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }, // Group by the date in YYYY-MM-DD format
                },
                count: { $sum: 1 }, // Count the number of orders for each date
            },
        },
        {
            $sort: { _id: 1 }, // Sort by date in ascending order
        },
    ])
    function getLast7Dates() {
        const today = new Date();
        const last7Dates = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
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
                    $dateToString: { format: '%Y-%m', date: '$createdAt' }, // Group by the month in YYYY-MM format
                },
                count: { $sum: 1 }, // Count the number of orders for each month
            },
        },
        {
            $sort: { _id: 1 }, // Sort by month in ascending order
        },
    ])
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

            const formattedMonth = `${year}-${String(month + 1).padStart(2, '0')}`;
            last7Months.push(formattedMonth);
        }

        return last7Months;
    }
    const sevenYearsAgo = new Date();
    sevenYearsAgo.setFullYear(sevenYearsAgo.getFullYear() - 7);  // 7 years ago

    // MongoDB Aggregation pipeline to count orders for the last 7 years (with year and month)
    let y = await Order.aggregate([
        {
            $match: { createdAt: { $gte: sevenYearsAgo } }, // Filter orders in the last 7 years based on createdAt
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: '%Y', date: '$createdAt' }, // Group by the year in YYYY format
                },
                count: { $sum: 1 }, // Count the number of orders for each year
            },
        },
        {
            $sort: { _id: 1 }, // Sort by year in ascending order
        },
    ])
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
    let dateData = []

    res.status(200).json("hello")
}


module.exports = { fetchDashboardCardsData, getBarChartData }