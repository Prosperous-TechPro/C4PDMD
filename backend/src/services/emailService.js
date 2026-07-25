/**
 * =====================================================
 * EMAIL SERVICE
 * =====================================================
 * Handles email delivery for the backend.
 *
 * Author : ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const nodemailer = require("nodemailer");

const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
  EMAIL_FROM,
  EMAIL_FROM_NAME,
} = process.env;

const validateEmailConfig = () => {
  if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASSWORD) {
    throw new Error(
      "Missing email configuration. Please set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, and EMAIL_PASSWORD."
    );
  }
};

const createTransporter = () => {
  validateEmailConfig();

  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: Number(EMAIL_PORT) === 465,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

const getFromAddress = () => {
  if (EMAIL_FROM) {
    return EMAIL_FROM_NAME
      ? `${EMAIL_FROM_NAME} <${EMAIL_FROM}>`
      : EMAIL_FROM;
  }

  return EMAIL_USER;
};

const sendNewsletterConfirmation = async (recipientEmail) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: getFromAddress(),
    to: recipientEmail,
    subject: "Subscription confirmed: C4PDMD Newsletter",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Thank you for subscribing to C4PDMD</h2>
        <p>You have successfully joined our newsletter with this email address:</p>
        <p><strong>${recipientEmail}</strong></p>
        <p>We will send you updates, news, and important announcements to this inbox.</p>
        <p>Regards,<br/>The C4PDMD Team</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendNewsletterConfirmation,
};
