const Review = require("../schema/productReviewsModal");

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: "Internal server error" });
  }
};

// Get a specific review by ID
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: "Internal server error" });
  }
};

// Create a new review
const createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ error: "Internal server error" });
  }
};

// Update an existing review
const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: "Internal server error" });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id.substring(1));
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  deleteReview,
  updateReview,
};
