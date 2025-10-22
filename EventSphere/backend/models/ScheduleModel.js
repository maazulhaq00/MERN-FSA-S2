import mongoose from "mongoose";
let {Schema , model} = mongoose

const scheduleSchema = new Schema({
  expo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "expo",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  speaker: {
    type: String,
    required: true,
  },
 location: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "booth", 
  required: true,
},
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  }
}, { timestamps: true });

const Schedule = model("schedule", scheduleSchema);

export default Schedule;
