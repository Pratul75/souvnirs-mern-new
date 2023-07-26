const Wishlist = require("../schema/wishlistModal")
const { success, error } = require("../utils/errorHandler")

exports.createWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.create(req.body)
        res.status(200).json("successfuly created")
    } catch (error) {

    }
}
exports.getwishlistItems = async (req, res) => {
    try {
        console.log(req.userId);
        const items = await Wishlist.find({ customerId: req.userId })
        res.status(200).json(success({ wishlist: items, message: "wishlist fetched successfully" }));
    } catch (e) {
        res.status(400).json(error("failed to fetch wishlist"))
    }
}