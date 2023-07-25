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
exports.roles = {
  admin: "admin",
  vendor: "vendor",
  customer: "customer"

}

module.exports = { getOperator };
