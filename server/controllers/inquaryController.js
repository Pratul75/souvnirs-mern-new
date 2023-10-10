const Inquery = require("../schema/inqueriesModal");

// Get all discounts
const createInquey = async (req, res, next) => {
  try {
    const checkProduct = await Inquery.findOne({
      productId: req?.body?.productId,
    });
    if (checkProduct) {
      let UpDatedData = [...checkProduct?.inquery, ...req?.body?.inquery];
      const updateData = await Inquery.findOneAndUpdate(
        {
          productId: req?.body?.productId,
        },
        { inquery: UpDatedData }
      );
      res.status(200).json(updateData);
    } else {
      const createData = await Inquery.create(req?.body);
      res.status(200).json(createData);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createInquey,
};
