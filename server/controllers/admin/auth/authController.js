const AuthService = require("../../../services/auth.service");

class AuthController {
  authSeriviceInstance = new AuthService();

  register = async (req, res) => {
    const { email, password, firstName, lastName, gender } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(404).json({
        success: false,
        message: "plesse provide all details",
      });
    }

    const newUserCreated = await this.authSeriviceInstance.createNewUser(
      req.body
    );

    return res.status(newUserCreated?.errorCode).json(newUserCreated);
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "please provide email or password",
      });
    }
    // checking the given values

    let logindetails = await this.authSeriviceInstance.findOneByEmail(email);
    console.log(logindetails);
    if (logindetails?.success) {
      logindetails = await this.authSeriviceInstance.login(
        password,
        logindetails?.data
      );
    }
    return res.status(logindetails?.errorCode).json(logindetails);
  };

  changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (
      await this.globalServiceInstance.checkTheParams({
        currentPassword,
        newPassword,
      })
    ) {
      let model;
      if (req.user.role === "user") {
        model = Usermodel;
      } else if (req.user.role === "astrologer") {
        model = AstrologerPersonalDetailModel;
      } else if (req.user.role === "admin") {
        model = Admindetails;
      }
      const data = await this.authSeriviceInstance.changePassword(
        req.user._id,
        req.user.password,
        currentPassword,
        newPassword,
        model
      );
      return res.status(data?.errorCode).json(data);
    }
  };
}

module.exports = AuthController;
