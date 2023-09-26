const Checkout = require("../schema/checkoutModal");

const createCheckout = async (req, res) => {
  try {
    // Assuming the request body is an array of products to be checked out, and each object has a 'customerId'
    const productsToCheckout = req.body;

    // Extract the customerId from the first object (assuming it's the same for all items)
    const customerId = productsToCheckout[0].customerId;

    // Create a new checkout object
    const newCheckout = new Checkout({
      customerId, // Use the extracted customerId for all items
      items: productsToCheckout.map((productData) => ({
        productId: productData.productId,
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
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all checkout records
const getAllCheckouts = async (req, res) => {
  try {
    const checkouts = await Checkout.find();
    res.status(200).json(checkouts);
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

module.exports = {
  deleteCheckoutById,
  getAllCheckouts,
  getSpecificCheckout,
  updateCheckoutById,
  createCheckout,
};
