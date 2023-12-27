const Reviews = require("../schema/reviewModel");

const getReviewList = async (req, res) => {
  try {
    let reviewList;
    // if (req?.role == "admin") {
    reviewList = await Reviews.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $lookup: {
          from: "vendors",
          localField: "product.vendorId",
          foreignField: "_id",
          as: "vendor",
        },
      },
      {
        $unwind: "$vendor",
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
      {
        $project: {
          _id: 1, // Include other fields as needed
          description: 1,
          rating: 1,
          createdAt: 1,
          productDetails: "$product",
          vendorDetails: "$vendor",
          customerDetails: "$customer",
        },
      },
    ]);

    // }
    // reviewList.map((item) => {
    //   item.customer = item.customer.length > 0 ? item.customer[0] : {};
    //   item.product = item.product.length > 0 ? item.product[0] : {};
    // });
    res.status(200).json(reviewList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const UpdateReview = async (req, res) => {
  try {
    const { id } = req.params;
    let checkData = await Reviews.findById(id);
    if (checkData) {
      await Reviews.findByIdAndUpdate(id, req.body);
      res.status(200).send({ message: "update reviews succefully" });
    } else {
      res.status(404).send({ message: "data not found" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const DeleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    let checkData = await Reviews.findById(id);
    if (checkData) {
      await Reviews.findByIdAndDelete(id);
      res.status(200).send({ message: "delete reviews succefully" });
    } else {
      res.status(404).send({ message: "data not found" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  getReviewList,
  UpdateReview,
  DeleteReview,
};
