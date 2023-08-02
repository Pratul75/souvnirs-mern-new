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
        let items
        if (req.role === "admin") {

            items = await Wishlist.aggregate([
                {
                    '$lookup': {
                        'from': 'customers',
                        'localField': 'customerId',
                        'foreignField': '_id',
                        'as': 'customer'
                    }
                }, {
                    '$unwind': {
                        'path': '$customer'
                    }
                }
            ])
        }
        else {
            items = await Wishlist.find({ customerId: req.userId })
        }
        res.status(200).json(success({ wishlist: items, message: "wishlist fetched successfully" }));
    } catch (e) {
        res.status(400).json(error("failed to fetch wishlist"))
    }
}