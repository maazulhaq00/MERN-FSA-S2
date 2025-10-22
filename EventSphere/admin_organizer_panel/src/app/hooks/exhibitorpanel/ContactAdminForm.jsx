import React, { useState, useEffect } from "react";
import { TextField, Button, Alert, Typography, Box } from "@mui/material";
import axios from "axios";

const ContactAdminForm = ({ senderId, senderName, senderEmail }) => {

   const email = localStorage.getItem("email");
   const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    senderId: userId || "",
    senderName: senderName || "",
    email: email || "",
    subject: "",
    message: "",
  });

  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async () => {
    const { senderId, senderName, email, subject, message } = formData;


    console.log("Debug - Form data being sent:", formData);

    if (!senderName || !email || !subject || !message) {
      setAlert({ type: "error", message: "Please fill all required fields" });
      return; 
    }

    try {
      const res = await axios.post("http://localhost:1308/api/messages/send", formData);
      setAlert({ type: "success", message: res.data.message });

   
      setFormData({
        senderId: senderId || "",
        senderName: senderName || "",
        email: senderEmail || "",
        subject: "",
        message: "",
      });

    } catch (err) {
      console.error(" Error:", err.response?.data);
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to send message",
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Contact Organizer</Typography>

      {alert && <Alert severity={alert.type}>{alert.message}</Alert>}

      {/* Form Inputs */}
      <TextField
        label="Your Name"
        name="senderName"
        value={formData.senderName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      
      <TextField
        label="Subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
        fullWidth
      >
        Send
      </Button>
    </Box>
  );
};

export default ContactAdminForm;
