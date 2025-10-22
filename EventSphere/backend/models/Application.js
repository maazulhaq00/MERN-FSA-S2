import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  exhibitor: { type: mongoose.Schema.Types.ObjectId, ref: 'Exhibitor', required: true },
  expo: { type: mongoose.Schema.Types.ObjectId, ref: 'Expo', required: true },
  booth: { type: mongoose.Schema.Types.ObjectId, ref: 'Booth' },

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },

  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Application', applicationSchema);
