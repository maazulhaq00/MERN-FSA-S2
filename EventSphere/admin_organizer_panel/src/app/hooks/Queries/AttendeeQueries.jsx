import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Chip,
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";

// Reusing your CardHeader and Title styles
const CardHeader = styled(Box)(() => ({
  display: "flex",
  padding: "16px 24px",
  justifyContent: "space-between",
  alignItems: "center",
}));

const Title = styled("h2")(() => ({
  fontSize: "1.2rem",
  fontWeight: "600",
}));

const AttendeeMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:1308/api/admincontact/all");

        if (Array.isArray(res.data)) {
          setMessages(res.data);
        } else if (Array.isArray(res.data.messages)) {
          setMessages(res.data.messages);s
        } else {
          setMessages([]);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 10 }} />;
  }

  if (messages.length === 0) {
    return (
      <Typography variant="body1" textAlign="center" mt={4}>
        No messages found.
      </Typography>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
        📩 Attendee Queries
      </Typography>

      {messages.map((msg) => (
        <Paper
          key={msg._id}
          sx={{
            p: 3,
            maxWidth: 600,
            margin: "20px auto",
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <CardHeader>
            <Title>{msg.subject}</Title>
           
          </CardHeader>

          <Box mt={2}>
            <Typography variant="body2" color="textSecondary">
              <strong>Name:</strong> {msg.senderName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Email:</strong> {msg.email}
            </Typography>
            <Typography variant="body2" mt={2}>
              {msg.message}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default AttendeeMessages;
