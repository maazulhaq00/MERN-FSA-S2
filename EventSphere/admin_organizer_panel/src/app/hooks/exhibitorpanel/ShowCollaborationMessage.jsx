import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Stack,
} from "@mui/material";
import { useParams } from "react-router-dom";

const ShowCollaborationMessage = () => {
  const { senderId, receiverId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:1308/api/collaboration/between/${senderId}/${receiverId}`
        );
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [senderId, receiverId]);

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Message Thread
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Stack spacing={2}>
          {messages.map((msg) => (
            <Box
              key={msg._id}
              sx={{
                p: 2,
                bgcolor:
                  msg.senderId === senderId ? "lightblue" : "lightgray",
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle2">
                From: {msg.senderName}
              </Typography>
              <Typography variant="body2">{msg.message}</Typography>
              <Typography variant="caption" color="textSecondary">
                {new Date(msg.createdAt).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};

export default ShowCollaborationMessage;
