
import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SendCollaborationMessage = () => {
  const [allExhibitors, setAllExhibitors] = useState([]);
  const [neighboringExhibitors, setNeighboringExhibitors] = useState([]);
  const [formData, setFormData] = useState({
    receiverId: "",
    subject: "",
    message: "",
  });
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const userId = "686ba79200052abcb6297c14"; // ✅ Replace with actual exhibitor ID (hardcoded if not using localStorage)
  const senderName = "Ifrah"; // ✅ Replace with actual name
  const email = "Ifrahfaheem8@gmail.com"; // ✅ Replace with actual email

  // Fetch exhibitors and neighbors
  useEffect(() => {
    const fetchExhibitors = async () => {
      try {
        const [allRes, neighborRes] = await Promise.all([
          axios.get("http://localhost:1308/users"),
          axios.get(`http://localhost:1308/users/neighboring/${userId}`),
        ]);

        const all = allRes.data.users.filter(
          (u) => u.role === "exhibitor" && u._id !== userId
        );
        const neighbors = neighborRes.data.neighbors;

        setAllExhibitors(all);
        setNeighboringExhibitors(neighbors);
      } catch (error) {
        console.error("Error fetching exhibitors", error);
      }
    };

    fetchExhibitors();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.receiverId || !formData.message) {
      return setAlert({
        message: "Receiver and message are required",
        type: "error",
      });
    }

    setLoading(true);
    try {
      const receiver =
        allExhibitors.find((u) => u._id === formData.receiverId) ||
        neighboringExhibitors.find((u) => u._id === formData.receiverId);

      await axios.post("http://localhost:1308/api/collaboration/send", {
        senderId: userId,
        receiverId: formData.receiverId,
        senderName,
        receiverName: receiver?.name,
        email,
        subject: formData.subject,
        message: formData.message,
      });

      setAlert({ message: "Message sent successfully", type: "success" });
      setFormData({ receiverId: "", subject: "", message: "" });

      // ✅ Navigate to thread view after sending message
      navigate(`/messages/thread/${userId}/${formData.receiverId}`);
    } catch (error) {
      setAlert({ message: "Failed to send message", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Send Collaboration Message
        </Typography>

        {alert.message && (
          <Alert severity={alert.type} sx={{ mb: 2 }}>
            {alert.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select Exhibitor</InputLabel>
            <Select
              value={formData.receiverId}
              label="Select Exhibitor"
              name="receiverId"
              onChange={handleChange}
            >
              <MenuItem disabled value="">
                -- Neighboring Exhibitors --
              </MenuItem>
              {neighboringExhibitors.map((ex) => (
                <MenuItem key={ex._id} value={ex._id}>
                  {ex.name} (Neighbor)
                </MenuItem>
              ))}
              <MenuItem disabled value="">
                -- All Other Exhibitors --
              </MenuItem>
              {allExhibitors.map((ex) => (
                <MenuItem key={ex._id} value={ex._id}>
                  {ex.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : "Send Message"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SendCollaborationMessage;
