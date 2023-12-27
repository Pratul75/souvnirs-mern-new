const Checkout = require("../schema/checkoutModal");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const createCheckout = async (req, res) => {
  try {
    // Assuming the request body is an array of products to be checked out, and each object has a 'customerId'
    const productsToCheckout = req.body;
    console.log("PRODUCTS: ", productsToCheckout);
    // Extract the customerId from the first object (assuming it's the same for all items)
    const customerId = productsToCheckout[0].customer_id;
    console.log("PRODUCTS TO CHECKOUT: ", productsToCheckout);
    // Create a new checkout object

    const newCheckout = new Checkout({
      customerId, // Use the extracted customerId for all items
      items: productsToCheckout.map((productData) => ({
        productId: productData.product_id,
        product_name: productData.productName,
        product_price: productData.productPrice,
        product_quantity: productData.productQuantity,
        product_image: productData.productImage,
        // Add other fields as needed
      })),
    });

    // Save the checkout object to the database
    await newCheckout.save();

    // Respond with a 201 status code and the saved checkout object
    res.status(201).json(newCheckout);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
};

// Get all checkout records
const getAllCheckouts = async (req, res) => {
  try {
    const role = req?.role;
    let checkouts;
    if (role == "admin") {
      checkouts = await Checkout.aggregate([
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
      ]);
    } else if (role == "vendor") {
      let verdorId = req?.userId;
      console.log("==", verdorId);
      checkouts = await Checkout.aggregate([
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $unwind: "$items",
        },
        {
          $lookup: {
            from: "products",
            localField: "items.productId",
            foreignField: "_id",
            pipeline: [
              {
                $match: {
                  $expr: {
                    $or: [{ $eq: ["$vendorId", new ObjectId(verdorId)] }],
                  },
                },
              },
            ],
            as: "items.product",
          },
        },
        {
          $unwind: "$items.product",
        },
        {
          $group: {
            _id: {
              _id: "$_id",
              customer: "$customer",
            },
            items: {
              $push: "$items", // Reconstruct the items array with populated product data
            },
          },
        },
        {
          $project: {
            _id: "$_id._id",
            customer: "$_id.customer",
            items: 1,
          },
        },
      ]);
    } else {
      checkouts = await Checkout.aggregate([
        {
          $match: { customerId: new mongoose.Types.ObjectId(req?.userId) },
        },
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
      ]);
    }
    res.status(200).json(checkouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCheckoutsList = async (req, res) => {
  try {
    const role = req?.role;
    let checkouts;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const seacrhText = req?.query?.seacrhText;
    console.log("====>", role, pageSize, page);

    const skip = (page - 1) * pageSize;
    let totalData = 0,
      totalPages = 0;

    let matchQuery = {};
    if (seacrhText) {
      matchQuery = {
        $or: [
          { "customer.firstName": { $regex: new RegExp(seacrhText, "i") } },
          { "customer.lastName": { $regex: new RegExp(seacrhText, "i") } },
        ],
      };
    }
    if (role == "admin") {
      checkouts = await Checkout.aggregate([
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $unwind: "$customer",
        },
        {
          $sort: { "customer._id": -1, "items.createdAt": -1 },
        },
        // {
        //   $group: {
        //     _id: "$customer._id",
        //     customer: { $first: "$customer" },
        //     items: { $push: "$items" },
        //     totalPrice: { $sum: "$items.product_price" },
        //     totalQuantity: { $sum: "$items.product_quantity" },
        //   },
        // },
        // {
        //   $project: {
        //     customer: 1,
        //     items: {
        //       $reduce: {
        //         input: "$items",
        //         initialValue: [],
        //         in: { $concatArrays: ["$$value", "$$this"] },
        //       },
        //     },
        //   },
        // },
        {
          $match: matchQuery,
        },
        {
          $skip: skip,
        },
        {
          $limit: pageSize,
        },
      ]);

      totalData = await Checkout.aggregate([
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $unwind: "$customer",
        },
        {
          $group: {
            _id: "$customer._id",
            customer: { $first: "$customer" },
            items: { $push: "$items" },
          },
        },
        {
          $project: {
            customer: 1,
            items: {
              $reduce: {
                input: "$items",
                initialValue: [],
                in: { $concatArrays: ["$$value", "$$this"] },
              },
            },
          },
        },
        {
          $match: matchQuery,
        },
      ]);
      totalPages = Math.ceil(totalData.length / pageSize);
    } else if (role == "vendor") {
      let verdorId = req?.userId;
      checkouts = await Checkout.aggregate([
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $unwind: "$customer",
        },
        {
          $unwind: "$items",
        },
        {
          $lookup: {
            from: "products",
            localField: "items.productId",
            foreignField: "_id",
            pipeline: [
              {
                $match: {
                  $expr: {
                    $or: [{ $eq: ["$vendorId", new ObjectId(verdorId)] }],
                  },
                },
              },
            ],
            as: "items.product",
          },
        },
        {
          $unwind: "$items.product",
        },
        {
          $group: {
            _id: {
              _id: "$_id",
              customer: "$customer",
            },
            items: {
              $push: "$items", // Reconstruct the items array with populated product data
            },
          },
        },
        {
          $project: {
            _id: "$_id._id",
            customer: "$_id.customer",
            items: 1,
          },
        },
        {
          $match: matchQuery,
        },
        {
          $skip: skip,
        },
        {
          $limit: pageSize,
        },
      ]);
      totalData = await Checkout.aggregate([
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $unwind: "$customer",
        },
        {
          $unwind: "$items",
        },
        {
          $lookup: {
            from: "products",
            localField: "items.productId",
            foreignField: "_id",
            pipeline: [
              {
                $match: {
                  $expr: {
                    $or: [{ $eq: ["$vendorId", new ObjectId(verdorId)] }],
                  },
                },
              },
            ],
            as: "items.product",
          },
        },
        {
          $unwind: "$items.product",
        },
        {
          $group: {
            _id: {
              _id: "$_id",
              customer: "$customer",
            },
            items: {
              $push: "$items", // Reconstruct the items array with populated product data
            },
          },
        },
        {
          $project: {
            _id: "$_id._id",
            customer: "$_id.customer",
            items: 1,
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
      totalData: totalData?.length,
      page,
      totalPages,
      checkouts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCustomerListCheckOut = async (req, res) => {
  try {
    let checkouts = await Checkout.aggregate([
      {
        $match: {
          customerId: new mongoose.Types.ObjectId(req?.userId),
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
      {
        $sort: { "customer._id": -1, "items.createdAt": -1 },
      },
    ]);
    res.status(200).json(checkouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCheckOutById = async (req, res) => {
  try {
    let checkouts;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const seacrhText = req?.query?.seacrhText;
    const skip = (page - 1) * pageSize;
    let totalData = 0,
      totalPages = 0;

    let matchQuery = {};

    const { userId, id } = req?.query;
    console.log(userId);
    checkouts = await Checkout.aggregate([
      {
        $match: {
          customerId: new mongoose.Types.ObjectId(userId),
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "coupons",
          localField: "items.coupon_id",
          foreignField: "_id",
          as: "items.coupon",
        },
      },
      {
        $unwind: {
          path: "$items.coupon",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "dailydeals",
          localField: "items.dailydeal_id",
          foreignField: "_id",
          as: "items.dailydeal",
        },
      },
      {
        $unwind: {
          path: "$items.dailydeal",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
      {
        $sort: { "customer._id": -1, "items.createdAt": -1 },
      },
      {
        $group: {
          _id: "$customer._id",
          customer: { $first: "$customer" },
          items: { $push: "$items" },
          totalPrice: { $sum: "$items.product_price" },
          totalQuantity: { $sum: "$items.product_quantity" },
        },
      },
      {
        $project: {
          customer: 1,
          items: 1,
          totalPrice: 1,
          totalQuantity: 1,
        },
      },
    ]);

    console.log("checkouts[0].items=>", checkouts[0].items);
    if (seacrhText) {
      checkouts[0].items = checkouts[0].items.filter((item) =>
        String(item?.product_name)
          .toLowerCase()
          .includes(String(seacrhText).toLowerCase())
      );
    }

    totalData = checkouts[0]?.items.length;
    totalPages = Math.ceil(totalData / pageSize);

    const startIndex = skip;
    const endIndex = startIndex + pageSize;
    checkouts[0].items = checkouts[0].items.slice(startIndex, endIndex);

    console.log("checkouts[2222].items=>", checkouts);

    res.status(200).json({
      message: "get data successfully",
      totalData,
      totalPages,
      checkouts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific checkout record by ID
const getSpecificCheckout = async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }
    res.status(200).json(checkout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a checkout record by ID
const updateCheckoutById = async (req, res) => {
  try {
    const updatedCheckout = await Checkout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCheckout) {
      return res.status(404).json({ message: "Checkout not found" });
    }
    res.status(200).json(updatedCheckout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a checkout record by ID
const deleteCheckoutById = async (req, res) => {
  try {
    const deletedCheckout = await Checkout.findByIdAndRemove(req.params.id);
    if (!deletedCheckout) {
      return res.status(404).json({ message: "Checkout not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSpecificCustomerCheckout = async (req, res) => {
  try {
    const { customerId, productId } = req?.body;
    const cutomerData = await Checkout.findOne({
      customerId: new mongoose.Types.ObjectId(customerId),
    });
    let deleteData;
    if (cutomerData?.items.length > 1) {
      deleteData = await Checkout.updateOne(
        { customerId: new mongoose.Types.ObjectId(customerId) },
        {
          $pull: {
            items: {
              productId: new mongoose.Types.ObjectId(productId),
            },
          },
        }
      );
    } else {
      deleteData = await Checkout.findOneAndDelete({
        customerId: new mongoose.Types.ObjectId(customerId),
      });
    }
    if (!deleteData) {
      return res.status(404).json({ message: "Checkout not found" });
    }
    res.status(204).send(deleteData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletCheckOut = async (req, res) => {
  try {
    const { id } = req.query;
    await Checkout.findByIdAndRemove(id);
    res.status(200).json({ message: "delete succefully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  deleteCheckoutById,
  getAllCheckouts,
  getSpecificCheckout,
  updateCheckoutById,
  createCheckout,
  deleteSpecificCustomerCheckout,
  getAllCheckoutsList,
  getCheckOutById,
  getCustomerListCheckOut,
  deletCheckOut,
};
