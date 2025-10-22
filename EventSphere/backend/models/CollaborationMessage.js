import mongoose from 'mongoose';

const collaborationMessageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  senderName: { type: String, required: true },
  receiverName: { type: String, required: true },
  email: { type: String },
  subject: { type: String },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['unread', 'read'],
    default: 'unread',
  },
}, { timestamps: true });

export default mongoose.model('CollaborationMessage', collaborationMessageSchema);
