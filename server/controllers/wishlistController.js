const Wishlist = require("../schema/wishlistModal");
const { success, error } = require("../utils/errorHandler");

exports.createWishlist = async (req, res) => {
  try {
    if (req.role === "customer") {
      const exists = await Wishlist.findOne({
        productId: req.body.productId,
      });
      if (exists) {
        await Wishlist.findOneAndDelete({ productId: req.body.productId });
      } else {
        const wishlist = await Wishlist.create({
          customerId: req.userId,
          productId: req.body.productId,
        });
      }
      res.status(200).json("successfuly created");
    }
  } catch (error) {}
};

exports.getwishlistItems = async (req, res) => {
  try {
    let items;
    if (req.role === "admin") {
      items = await Wishlist.aggregate([
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $unwind: {
            path: "$customer",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: {
            path: "$product",
          },
        },
      ]);
    } else {
      items = await Wishlist.find({ customerId: req.userId }).populate(
        "productId"
      );
    }
    console.log(items);
    res
      .status(200)
      .json(
        success({ wishlist: items, message: "wishlist fetched successfully" })
      );
  } catch (e) {
    res.status(400).json(error("failed to fetch wishlist"));
  }
};

exports.deleteWishlist = async function (req, res) {
  try {
    const { id } = req.params;
    let checkData = await Wishlist.findById(id);
    if (checkData) {
      await Wishlist.findByIdAndDelete(id);
      res.status(200).send({ message: "Data delete successfully" });
    } else {
      res.status(404).send({ message: "Data Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.UpdateWishlist = async function (req, res) {
  try {
    const { id } = req.params;
    let checkData = await Wishlist.findById(id);
    if (checkData) {
      await Wishlist.findByIdAndUpdate(id, req.body);
      res.status(200).send({ message: "Data update successfully" });
    } else {
      res.status(404).send({ message: "Data Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
