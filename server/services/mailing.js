const axios = require("axios");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "pratul.udainiya@rechargestudio.com",
    pass: "recharge@123",
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: "utkarsh.pawar@rechargestudio.com",
      to: to,
      subject: subject,
      text: text,
    };
    const response = await transporter.sendMail(mailOptions);
    console.log("mailing.js", response);
  } catch (e) {
    console.log(e);
  }
};

module.exports = sendEmail;
