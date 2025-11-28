import express from "express"
import sendEmail from "../utils/email.js";

const emailRouter = express.Router();

emailRouter.post("/send-email", async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    await sendEmail(to, subject, message);

    res.json({ success: true, msg: "Email sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Email not sent" });
  }
});

export default emailRouter;