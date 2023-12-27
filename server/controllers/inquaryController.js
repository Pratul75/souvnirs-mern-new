const { default: mongoose } = require("mongoose");
const Inquery = require("../schema/inqueriesModal");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "pratul.udainiya@rechargestudio.com",
    pass: "recharge123@",
  },
});

// Get all discounts
const createInquey = async (req, res, next) => {
  try {
    const checkProduct = await Inquery.findOne({
      productId: req?.body?.productId,
    });
    const adminHtmlContent = `<html>
    <body>
      <h3>You got new Inquery</h3>
      <br/>
      <h3>Customer Submitted Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${req?.body?.inquery[0]?.name}</li>
        <li><strong>Company Details:</strong> ${req?.body?.inquery[0]?.company}</li>
        <li><strong>Email:</strong> ${req?.body?.inquery[0]?.email}</li>
        <li><strong>Contact:</strong> ${req?.body?.inquery[0]?.contact}</li>
        <li><strong>City:</strong> ${req?.body?.inquery[0]?.city}</li>
        <li><strong>Pincode:</strong> ${req?.body?.inquery[0]?.pincode}</li>
        <li><strong>Quantity:</strong> ${req?.body?.inquery[0]?.quantity}</li>
        <li><strong>Expected Delivery Time:</strong> ${req?.body?.inquery[0]?.time}</li>
        <li><strong>Additional Information:</strong> ${req?.body?.inquery[0]?.msg}</li>
      </ul>
      <p>Best regards,<br/>Souvnirs</p>
    </body>
  </html>
`;
    const htmlContent = `<html>
    <body>
      <p>Dear ${req?.body?.inquery[0]?.name},</p>
      <p>Thank you for your interest in Souvnirs and for completing our inquiry form. Your request is important to us, and our team is currently reviewing the details. We will respond promptly to provide the information you're seeking.</p>
      <p>While we process your inquiry, feel free to explore our <a href="https://www.gift.souvnirs.com">website</a>. Should you have any immediate questions or concerns, please reach out to our customer support team at <a href="mailto:contact@souvnirs.com">contact@souvnirs.com</a>. We appreciate your patience and look forward to the opportunity to assist you.</p>
      <p>Best regards,<br/>Souvnirs</p>
    </body>
  </html>`;
    let to = req?.body?.inquery[0]?.email;
    let sub = "Thank You for Your Inquiry";
    await sendMail(to, sub, htmlContent);
    await sendMail("maria@souvnirs.com", "New inquery", adminHtmlContent);
    if (checkProduct) {
      req.body.inquery[0] = { ...req.body.inquery[0], status: "PENDING" };
      let UpDatedData = [...checkProduct?.inquery, ...req?.body?.inquery];
      const updateData = await Inquery.findOneAndUpdate(
        {
          productId: req?.body?.productId,
        },
        { inquery: UpDatedData }
      );
      res.status(200).json(updateData);
    } else {
      const createData = await Inquery.create(req?.body);
      res.status(200).json(createData);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendMail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: "maria@souvnirs.com",
      to: to,
      subject: subject,
      html: htmlContent,
    };
    const response = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error.message);
  }
};

const getInquey = async function (req, res) {
  try {
    const responce = await Inquery.find().sort({ createdAt: -1 });
    let wholequery = [];
    responce?.map((item, index) => {
      item?.inquery?.map((itm, index) => {
        if (itm?.msg) {
          if (itm?.status == "PENDING") {
            wholequery.push({
              ...itm,
              productId: item?.productId,
              _id: item?._id,
            });
          }
        }
      });
    });
    res.status(200).json({
      message: "get data successfully",
      success: true,
      data: wholequery,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getAllInquey = async function (req, res) {
  try {
    const responce = await Inquery.find().sort({ createdAt: -1 });
    let wholequery = [];
    // const getData = await Inquery.aggregate([{}]);
    responce?.map((item, index) => {
      item?.inquery?.map((itm, index) => {
        if (itm?.msg) {
          wholequery.push({
            ...itm,
            productId: item?.productId,
            _id: item?._id,
          });
        }
      });
    });
    res.status(200).json({
      message: "get data successfully",
      success: true,
      data: wholequery,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getDetailsInquery = async (req, res) => {
  try {
    const { Id, varientId } = req.query;
    const query = {
      _id: new mongoose.Types.ObjectId(Id),
      "inquery.variant": varientId,
    };
    const projection = {
      "inquery.$": 1,
    };
    const responce = await Inquery.findOne(query, projection);
    res.status(200).json(responce);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const UpdateInqueryData = async (req, res) => {
  try {
    const { status, inuput, varientData } = req?.body;
    const getDatafromInquery = await Inquery.findOne({
      productId: new mongoose.Types.ObjectId(varientData?.productId),
    });
    if (getDatafromInquery) {
      let clonedata = [...getDatafromInquery?.inquery];
      const findIndeNum = clonedata.findIndex(
        (items) =>
          items?.company == varientData?.company &&
          items?.email == varientData?.email &&
          items?.contact == varientData?.contact &&
          items?.variant == varientData?.variant
      );
      clonedata[findIndeNum].status = "";
      clonedata[findIndeNum].otherMsg = "";
      if (status == "Decline") {
        clonedata.splice(findIndeNum, 1);
        const getdata = await Inquery.findOneAndUpdate(
          {
            productId: new mongoose.Types.ObjectId(varientData?.productId),
          },
          { inquery: clonedata }
        );
        res.status(200).json({ message: "inquery delete succefully" });
      } else if (status == "Other") {
        clonedata[findIndeNum].status = status;
        clonedata[findIndeNum].otherMsg = inuput;
        const getdata = await Inquery.findOneAndUpdate(
          {
            productId: new mongoose.Types.ObjectId(varientData?.productId),
          },
          { inquery: clonedata }
        );
        res.status(200).json({ message: "inquery update succefully" });
      } else {
        console.log(status);
        clonedata[findIndeNum].status = "ACTIVE";
        const getdata = await Inquery.findOneAndUpdate(
          {
            productId: new mongoose.Types.ObjectId(varientData?.productId),
          },
          { inquery: clonedata }
        );
        res.status(200).json({ message: "inquery Update succefully" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createInquey,
  getInquey,
  getAllInquey,
  getDetailsInquery,
  UpdateInqueryData,
};
