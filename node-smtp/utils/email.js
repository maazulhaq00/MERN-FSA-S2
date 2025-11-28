import nodemailer from "nodemailer"

const sendEmail = async (to, subject, message) => {
  // Use your Gmail account
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,   // your Gmail
      pass: process.env.EMAIL_PASS,   // app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    html: message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;