const nodemailer = require("nodemailer");
// require('dotenv').config(); // Load environment variables

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mr.luckysharma7@gmail.com",
    pass: "zazs wute dtvu nodt",
  },
});
function sendResetEmail(email, token, url) {
  const resetUrl = `${url}/reset-password/${token}`;

  const mailOptions = {
    from: "mr.luckysharma7@gmail.com",
    to: email,
    subject: "Password Reset",
    text: `You requested a password reset. Please click the following link to reset your password: ${resetUrl}`,
    html: `<p>You requested a password reset. Please click the following link to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
  };

  return transporter.sendMail(mailOptions);
}

function sendWelcomeEmail(email) {
  const mailOptions = {
    from: "mr.luckysharma7@gmail.com",
    to: email,
    subject: "Welcome to Our Quotoverse : World of Quotes",
    text: `Welcome to our service! We're excited to have you on board. If you have any questions or need assistance, feel free to contact us.`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #4CAF50;">Welcome to Qutoverse : world of Quotes!</h1>
        <p>We're excited to have you on board.</p>
        <p>If you have any questions or need assistance, feel free to contact us.</p>
        <p style="margin-top: 20px; font-size: 12px; color: #777;">&copy; 2024 Our Service. All rights reserved.</p>
      </div>
    `,
  };
}
export { sendWelcomeEmail };
export default sendResetEmail;
