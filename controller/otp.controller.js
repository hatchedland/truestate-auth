const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_SERVICE_SID = process.env.TWILIO_SERVICE_SID;


const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
  lazyLoading: true,
});

const sendOtp = async (req, res) => {
  const { phoneNumber } = req.body ?? {};

  try {
    const result = await client.verify
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: `+${phoneNumber}`,
        channel: "sms",
      });
    res.status(200).send({
      success: true,
      message: `OTP sent successfully`,
      payload: result,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: `Error in sending otp: ${err.message}`,
    });
  }
};

const verifyOtp = async (req, res) => {
  const { phoneNumber, otp } = req.body ?? {};

  try {
    const result = await client.verify
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `+${phoneNumber}`,
        code: otp,
      });
    res.status(200).send({
      success: true,
      message: `OTP verified successfully`,
      payload: result,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: `Error in verifying otp: ${err.message}`,
    });
  }
};

module.exports = { sendOtp, verifyOtp };
