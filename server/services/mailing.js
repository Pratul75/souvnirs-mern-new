const axios = require("axios");
var SibApiV3Sdk = require("sib-api-v3-sdk");

const sendEmail = async (email, name) => {
  var defaultClient = SibApiV3Sdk.ApiClient.instance;

  var apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey =
    "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";

  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
  sendSmtpEmail = {
    to: [
      {
        email: "email",
        name: "name",
      },
    ],
    templateId: 1,
    params: {
      name: "John",
      surname: "Doe",
    },
    headers: {
      "X-Mailin-custom":
        "custom_header_1:custom_value_1|custom_header_2:custom_value_2",
    },
  };

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log("API called successfully. Returned data: " + data);
    },
    function (error) {
      console.error(error);
    }
  );
};

module.exports = sendEmail;
