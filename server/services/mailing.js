const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "utkarsh.pawar@rechargestudio.com",
        password: "Recharge@123"
    }
})
module.exports = transporter