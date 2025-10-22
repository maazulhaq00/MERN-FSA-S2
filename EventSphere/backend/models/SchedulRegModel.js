import mongoose from 'mongoose';
let { Schema, model } = mongoose;

const attendeeScheduleReg = new Schema({
   
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'schedule',
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

const ScheduleReg = model("attendeeScheduleReg", attendeeScheduleReg);

export default ScheduleReg;
