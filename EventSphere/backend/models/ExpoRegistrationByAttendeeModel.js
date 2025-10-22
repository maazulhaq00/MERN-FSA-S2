import mongoose from 'mongoose';
let { Schema, model } = mongoose;

const attendeeExpoReg = new Schema({
   
    expo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'expo',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  }
   
   
}, {
    timestamps: true,
});

const ExpoReg = model("attendeeExpoReg", attendeeExpoReg);

export default ExpoReg;
