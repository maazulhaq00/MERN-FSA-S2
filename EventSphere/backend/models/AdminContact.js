import mongoose from 'mongoose';

const adminmessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    senderName: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    
  },
  { timestamps: true }
);

const AdminMessage = mongoose.model('AdminMessage', adminmessageSchema);
export default AdminMessage;
