const Refund = require("../schema/refundModal");
const Product = require("../schema/productModal");
const mongoose = require("mongoose");

// Get all refunds
const getAllRefunds = async (req, res) => {
  try {
    // req.role , req.userId
    const refunds = await Refund.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "orderId",
          foreignField: "_id",
          as: "orders",
        },
      },
      // {
      //   $unwind:
      // }
      {
        $lookup: {
          from: "products",
          localField: "refundDetails.productId",
          foreignField: "_id",
          as: "product",
        },
      },
    ]);
    // refunds?.map((item, index) => {
    //   item.orders = item?.orders[0];
    //   item.product = item?.product[0];
    // });
    res.status(200).json(refunds);
  } catch (error) {
    console.error("Error fetching refunds:", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};

const getAllRefundsList = async (req, res) => {
  try {
    // req.role , req.userId
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const seacrhText = req?.query?.seacrhText;

    const skip = (page - 1) * pageSize;
    let totalData = 0,
      totalPages = 0,
      refunds = [];

    let matchQuery = {};
    if (seacrhText) {
      matchQuery = {
        $or: [
          { "orders.courier_id": { $regex: new RegExp(seacrhText, "i") } },
          { "product.name": { $regex: new RegExp(seacrhText, "i") } },
        ],
      };
    }
    if (req.role == "admin") {
      refunds = await Refund.aggregate([
        {
          $lookup: {
            from: "orders",
            localField: "orderId",
            foreignField: "_id",
            as: "orders",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "refundDetails.productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $match: matchQuery,
        },
        {
          $sort: {
            updatedAt: -1,
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: pageSize,
        },
      ]);

      totalData = await Refund.aggregate([
        {
          $lookup: {
            from: "orders",
            localField: "orderId",
            foreignField: "_id",
            as: "orders",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "refundDetails.productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $match: matchQuery,
        },
      ]);
      totalPages = Math.ceil(totalData.length / pageSize);
    } else if (req.role == "vendor") {
      refunds = await Refund.aggregate([
        {
          $lookup: {
            from: "orders",
            localField: "orderId",
            foreignField: "_id",
            as: "orders",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "refundDetails.productId",
            foreignField: "_id",
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: [
                          "$vendorId",
                          new mongoose.Types.ObjectId(req?.userId),
                        ],
                      },
                    ],
                  },
                },
              },
            ],
            as: "product",
          },
        },
        {
          $match: matchQuery,
        },
        {
          $match: {
            product: { $ne: [] }, // Remove documents where the 'product' array is empty
          },
        },
        {
          $sort: {
            updatedAt: -1,
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: pageSize,
        },
      ]);

      totalData = await Refund.aggregate([
        {
          $lookup: {
            from: "orders",
            localField: "orderId",
            foreignField: "_id",
            as: "orders",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "refundDetails.productId",
            foreignField: "_id",
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: [
                          "$vendorId",
                          new mongoose.Types.ObjectId(req?.userId),
                        ],
                      },
                    ],
                  },
                },
              },
            ],
            as: "product",
          },
        },
        {
          $match: {
            product: { $ne: [] }, // Remove documents where the 'product' array is empty
          },
        },
        {
          $match: matchQuery,
        },
      ]);
      totalPages = Math.ceil(totalData.length / pageSize);
    }
    res.status(200).json({
      message: "get data successfully",
      totalData: totalData.length,
      page,
      totalPages,
      refunds,
    });
  } catch (error) {
    console.error("Error fetching refunds:", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};

// Get a specific refund by ID
const getRefundById = async (req, res) => {
  try {
    const refund = await Refund.findById(req.params.id.substring(1));
    if (!refund) {
      return res.status(404).json({ error: "Refund not found" });
    }
    res.json(refund);
  } catch (error) {
    console.error("Error fetching refund:", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};

// Create a new refund
const addRefund = async (req, res) => {
  try {
    const { orderId, refundDetails, status } = req.body;
    if (!Array.isArray(refundDetails) || refundDetails.length === 0) {
      return res.status(400).json({ error: "Refund details are required" });
    }
    for (const refundItem of refundDetails) {
      const { productId, quantity, price } = refundItem;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(400).json({ error: "Invalid product ID" });
      }
      if (quantity <= 0 || price <= 0) {
        return res
          .status(400)
          .json({ error: "Quantity and price must be greater than 0" });
      }
    }
    const totalPrice = refundDetails.reduce((total, refundItem) => {
      return total + refundItem.quantity * refundItem.price;
    }, 0);
    const refund = new Refund({
      orderId,
      refundDetails,
      totalPrice,
      status,
    });
    const savedRefund = await refund.save();
    res.status(201).json(savedRefund);
  } catch (error) {
    console.error("Error creating refund:", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};

// Update an existing refund
const updateRefund = async (req, res) => {
  try {
    const { orderId, productId, quantity, price, totalPrice, status } =
      req.body;

    // Retrieve product information based on productId
    const products = await Product.find({ _id: { $in: productId } });
    if (products.length !== productId.length) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const refund = await Refund.findByIdAndUpdate(
      req.params.id.substring(1),
      {
        orderId,
        productId,
        quantity,
        price,
        totalPrice,
        status,
      },
      { new: true }
    );
    if (!refund) {
      return res.status(404).json({ error: "Refund not found" });
    }
    res.json(refund);
  } catch (error) {
    console.error("Error updating refund:", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};

// Delete a refund
const deleteRefund = async (req, res) => {
  try {
    const refund = await Refund.findByIdAndDelete(req.params.id.substring(1));
    if (!refund) {
      return res.status(404).json({ error: "Refund not found" });
    }
    res
      .status(200)
      .json({ message: "refund deleted successfully", deletedRefund: refund });
  } catch (error) {
    console.error("Error deleting refund:", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};

module.exports = {
  addRefund,
  updateRefund,
  deleteRefund,
  getAllRefunds,
  getRefundById,
  getAllRefundsList,
};
