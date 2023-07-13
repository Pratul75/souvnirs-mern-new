const ConditionValue = require("../schema/conditionValueModal");
const Product = require("../schema/productModal");

const getRawDataForFilter = async (req, res) => {
  const getOperator = (operatorString) => {
    switch (operatorString) {
      case "greater than":
        return "$gt";
      case "is equal to":
        return "$eq";
      case "is not equal to":
        return "$ne";
      case "less than":
        return "$lt";
      case "is empty":
        return "$exists";
      case "is not empty":
        return "$exists";
      case "contains":
        return "$regex";
      case "does not contain":
        return "$not";
      case "start with":
        return "$regex";
      case "end with":
        return "$regex";
      default:
        return "";
    }
  };

  try {
    const data = req.body;
    const conditionValueIds = data.map((item) => item.parentId);
    console.log("CONDITION-VALUE IDS: ", conditionValueIds);

    // Fetch condition values from the database for the given conditionValueIds
    const conditionValues = await ConditionValue.find({
      _id: { $in: conditionValueIds },
    }).select("conditionValue");

    console.log("CONDITION VALUES: ", conditionValues);

    // Map the condition values to an object for easier access
    const conditionValueMap = {};
    conditionValues.forEach((conditionValue) => {
      conditionValueMap[conditionValue._id] = conditionValue.conditionValue;
    });

    console.log("CONDITION MAP: ", conditionValueMap);

    // Perform MongoDB queries using the operator and values

    // constant specifics are already provided in such a way thgat there are so manhy things in this world onwhich we dont have any control like earthquakes tsunamoes and what not but the thing is tha t on what we cna like to forgive someone or to spread hapiness without  eprecting any in return

    const results = Promise.all(
      data.map(async (item) => {
        const operator = getOperator(item.selectedTitle);
        const title = conditionValueMap[item.parentId];
        const value = item.inputValue;

        console.log("VALUE: ", value);
        console.log("TITLE: ", title);

        // Perform your MongoDB query here using the operator, title, and value
        // there are so many things in this world on which
        // Example query:
        const query = { [title]: { [operator]: value } };
        console.log("QUERY: ", query);
        // Replace "ModelName" with your actual model name
        const result = await Product.find(query);
        console.log("RESULT: ", result);
        return result;
      })
    );

    console.log("RESULTS: ", results);

    res.status(200).send(results);
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occurred", error });
  }
};

module.exports = { getRawDataForFilter };
