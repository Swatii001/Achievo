const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "somyajain433@gmail.com", // Your Gmail email address
    pass: "hasta luego", // Your Gmail password or App Password if 2-Step Verification is enabled
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      , // Sender email address
      to, // Receiver email address
      subject, // Email subject
      text, // Email body
    });

    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendEmail };
