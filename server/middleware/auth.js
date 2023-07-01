const jwt = require("jsonwebtoken");

//model is optional

// here in middleware we cant check if user has hit admin or astologer route as we dont know which api is hit so we have done it through global service

exports.checkLoginOrNot = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  // req.cookies.token
  // req.body.token

  if (!token) {
    return res.status(404).json("token is missing, Please login");
  }
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    if (!decode) {
      return res.status(400).json({
        success: false,
        message: "invalid token",
      });
    }

    // for get route we do not send data in body so we send data in params
    const userDetails = await Usermodel.findById(decode?.id);
    if (userDetails) {
      if (userDetails.role === decode?.role) {
        req.user = userDetails;
      }
    } else {
      const astroDetails = await AstrologerModel.findById(decode?.id);
      if (astroDetails) {
        if (astroDetails.role === decode?.role) {
          req.user = astroDetails;
        }
      } else {
        const adminDetails = await adminDetails.findById(decode?.id);
        if (adminDetails) {
          if (adminDetails.role === decode?.role) {
            req.user = adminDetails;
          }
        }
      }
    }

    return next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
