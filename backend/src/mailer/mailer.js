// mailer/mailer.js
import nodemailer from "nodemailer";

// Use explicit Gmail SMTP config instead of `service: "gmail"`
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Optional but very useful: verify transporter at startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:", error);
  } else {
    console.log("✅ Email transporter is ready to send messages");
  }
});

export const sendMail = async (recipientEmail, body, subject) => {
  const mailOptions = {
    from: process.env.EMAIL,   // Sender email address
    to: recipientEmail,        // Recipient email address
    subject,
    html: body,
  };

  try {
    console.log("📧 Attempting to send mail to:", recipientEmail);
    const info = await transporter.sendMail(mailOptions);
    console.log("📨 Mail accepted by Gmail:");
    console.log("   messageId:", info.messageId);
    console.log("   response:", info.response);
  } catch (error) {
    console.error("❌ Error sending Email:", error);
    // Optionally rethrow if you want registration to fail when mail fails:
    // throw error;
  }
};
