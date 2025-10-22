import AdminMessage from "../models/AdminContact.js";


export const sendMessage = async (req, res) => {
  try {
    const { senderId, senderName, email, subject, message } = req.body;
    if (!senderId || !senderName || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const newMessage = new AdminMessage({
      senderId,
      senderName,
      email,
      subject,
      message,
    });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await AdminMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve messages', error: error.message });
  }
};

export const getMessageById = async (req, res) => {
  try {
    const message = await AdminMessage.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving message', error: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const message = await AdminMessage.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    message.status = 'read';
    await message.save();

    res.status(200).json({ message: 'Message marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const message = await AdminMessage.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.status(200).json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', error: error.message });
  }
};
