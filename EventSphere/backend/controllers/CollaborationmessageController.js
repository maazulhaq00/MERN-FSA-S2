import CollaborationMessage from '../models/CollaborationMessage.js';

export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, senderName, receiverName, email, subject, message } = req.body;

    if (!senderId || !receiverId || !senderName || !receiverName || !message) {
      return res.status(400).json({ message: 'Required fields are missing.' });
    }

    const newMessage = new CollaborationMessage({
      senderId,
      receiverId,
      senderName,
      receiverName,
      email,
      subject,
      message
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getMessagesBetweenUsers = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const messages = await CollaborationMessage.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const message = await CollaborationMessage.findById(req.params.id);
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
    const message = await CollaborationMessage.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    res.status(200).json({ message: 'Message deleted' });

  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', error: error.message });
  }
};
