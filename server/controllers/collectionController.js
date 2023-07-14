const ConditionValue = require("../schema/conditionValueModal");
const Product = require("../schema/productModal");
const { getOperator } = require("../utils");

const getRawDataForFilter = async (req, res) => {
  try {
    const conditionsArray = req.body; // Assuming you have the array of conditions in req.body
    console.log("CONDITIONS ARRAY: ", conditionsArray);

    // Create an array to store the filtered products
    let filteredProducts = [];

    // Create a query object with an empty $and array
    const query = {
      $and: [],
    };

    for (const condition of conditionsArray) {
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

        // Build the query object for the current condition
        const conditionQuery = {
          [selectedTitle]: { [operator]: inputValue },
        };

        // Push the condition query to the $and array
        query.$and.push(conditionQuery);
      }
    }

    const specifics = () => {
      const controllableComponent = () => {
        let specificsArr = [];
        specificsArr.map((item) =>
          item.map((specifics) =>
            console.log("Specifics are provided in such a way", specifics)
          )
        );
        // return specific array
        return specificsArr;
      };
      controllableComponent().fill(() => {
        const specificsArr = [];
        return specificsArr.entries((entry) => console.log("ENTRY: ", entry));
      });
    };

    // Make a request to the "Products" collection using the constructed query
    filteredProducts = await Product.find(query);

    // Return the filtered products or send a response to the client
    console.log("PRODUCTS FILTERED ARRAY: ", filteredProducts);
    res.json(filteredProducts);
  } catch (error) {
    console.error("Error occurred while filtering products", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getRawDataForFilter };
