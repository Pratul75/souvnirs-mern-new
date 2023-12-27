const { default: mongoose } = require("mongoose");
const CouponModal = require("../schema/couponModal");
const Products = require("../schema/productModal");
const Product = require("../schema/productModal");
const Collection = require("../schema/collectionModal");

// Controller to create a new coupon
const createModal = async (req, res) => {
  try {
    const newCoupon = new CouponModal(req.body);
    const savedCoupon = await newCoupon.save();
    res.status(201).json(savedCoupon);
  } catch (err) {
    res.status(400).json({ error: "somthing went wrong" });
  }
};

// Controller to get all coupons
const getAllCoupons = async (req, res) => {
  try {
    const coupons = await CouponModal.find().sort({ updatedA: -1 });
    res.status(200).json(coupons);
  } catch (err) {
    res.status(400).json({ error: "somthing went wrong" });
  }
};

const getAllCouponsList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const seacrhText = req?.query?.seacrhText;
    console.log("====>", pageSize, page);

    const skip = (page - 1) * pageSize;
    let totalData = 0,
      totalPages = 0;

    let matchQuery = {};
    if (seacrhText) {
      console.log("--->", seacrhText);
      matchQuery = {
        $or: [{ title: { $regex: new RegExp(seacrhText, "i") } }],
      };
    }
    const coupons = await CouponModal.aggregate([
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

    totalData = await CouponModal.find(matchQuery).countDocuments();
    totalPages = Math.ceil(totalData / pageSize);
    res.status(200).json({
      message: "get data successfully",
      totalData,
      page,
      totalPages,
      coupons,
    });
  } catch (err) {
    res.status(400).json({ error: "somthing went wrong" });
  }
};

// Controller to get a specific coupon by ID
const getCouponById = async (req, res) => {
  try {
    const coupon = await CouponModal.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }
    res.status(200).json(coupon);
  } catch (err) {
    res.status(400).json({ error: "somthing went wrong" });
  }
};

// Controller to update a specific coupon by ID
const updateCouponById = async (req, res) => {
  try {
    const updatedCoupon = await CouponModal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCoupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }
    res.status(200).json(updatedCoupon);
  } catch (err) {
    res.status(400).json({ error: "somthing went wrong" });
  }
};

// Controller to delete a specific coupon by ID
const deleteCouponById = async (req, res) => {
  try {
    console.log("couponController.js", req.params.id);
    const deletedCoupon = await CouponModal.findByIdAndDelete(
      req.params.id.substring(1)
    );
    if (!deletedCoupon) {
      return res
        .status(404)
        .json({ success: false, error: "Coupon not found" });
    }
    res.status(200).json(deletedCoupon);
  } catch (err) {
    res.status(400).json({ error: "somthing went wrong" });
  }
};

const checkProductCouponCode = async (req, res) => {
  try {
    const { code, productIds } = req.body;
    let productcheck = [];
    const checkCode = await CouponModal.findOne({
      couponCode: code,
      status: "ACTIVE",
    });
    if (checkCode) {
      // Use Promise.all to wait for all asynchronous operations to complete
      await Promise.all(
        productIds.map(async (productId) => {
          const getProductData = await Product.findById(productId);
          const checkproductId = await CouponModal.findOne({
            productId: new mongoose.Types.ObjectId(getProductData?._id),
          });
          if (checkproductId) {
            let value = {
              id: productId,
              type: checkproductId?.typeTitle,
              discount: checkproductId?.typeValue,
              count: "product",
            };
            productcheck.push(value);
          } else {
            const CategoryId = await CouponModal.findOne({
              categoryId: new mongoose.Types.ObjectId(
                getProductData?.categoryId
              ),
            });
            if (CategoryId) {
              let value = {
                id: productId,
                type: CategoryId?.typeTitle,
                discount: CategoryId?.typeValue,
                count: "Category",
              };
              productcheck.push(value);
            } else {
              if (checkCode?.collectionId) {
                await Promise.all(
                  checkCode?.collectionId.map(async (itm) => {
                    const Collectiondetails = await Collection.findOne({
                      _id: new mongoose.Types.ObjectId(itm),
                      activeProducts: new mongoose.Types.ObjectId(productId),
                    });
                    if (Collectiondetails) {
                      let value1 = {
                        id: productId,
                        type: checkCode?.typeTitle,
                        discount: checkCode?.typeValue,
                        count: "Collection",
                      };
                      productcheck.push(value1);
                    }
                  })
                );
              }
            }
          }
        })
      );

      if (productcheck.length > 0) {
        res.status(200).json({
          success: true,
          msg: "get coupon list",
          productDiscount: productcheck,
        });
      } else {
        res.status(200).json({
          success: true,
          msg: "This coupon not valid for order products",
          productDiscount: productcheck,
        });
      }
    } else {
      res.status(200).json({ success: false, msg: "Coupon not found" });
    }
  } catch (error) {
    console.error("Error in checkProductCouponCode:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  createModal,
  getAllCoupons,
  getCouponById,
  updateCouponById,
  deleteCouponById,
  getAllCouponsList,
  checkProductCouponCode,
};
