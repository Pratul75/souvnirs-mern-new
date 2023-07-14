const ConditionValue = require("../schema/conditionValueModal");
const Product = require("../schema/productModal");
const { getOperator } = require("../utils");

const getRawDataForFilter = async (req, res) => {
  try {
    const conditionsArray = req.body; // Assuming you have the array of conditions in req.body
    console.log("CONDITIONS ARRAY: ", conditionsArray);

    conditionsArray.forEach(async (condition) => {
      const { selectedTitle, conditionValue, inputValue } = condition;

      // Query the "ConditionValue" schema to get the actual value based on conditionValue
      const actualConditionValue = await ConditionValue.findById(
        conditionValue
      );
      console.log("ACTUAL CONDITION VALUES: ", actualConditionValue);

      if (actualConditionValue) {
        // Replace the conditionValue with the actual value
        condition.conditionValue = actualConditionValue.conditionValue;

        // Get the MongoDB query keyword using the operatorString
        const operator = getOperator(condition.conditionValue);
        console.log("CONDITION OPERATOR STRING: ", condition.conditionValue);

        // Make a request to the "Products" collection using the obtained values
        const products = await Product.find({
          [selectedTitle]: { [operator]: inputValue },
        });

        console.log(
          "Selected Title:",
          selectedTitle,
          "Operator:",
          operator,
          "Input Value:",
          inputValue
        );

        // Process the retrieved products
        products.forEach((product) => {
          // Do something with each product
          console.log("Product:", product);
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occurred", error });
  }
};

module.exports = { getRawDataForFilter };
