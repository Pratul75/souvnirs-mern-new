import Wishlist = require("../schema/wishlistModal")

exports.createWishlist = async (req, res) => {
    try {
        Wishlist.create(req.body)
        res.status(200).json("successfuly created")
    } catch (error) {

    }
}