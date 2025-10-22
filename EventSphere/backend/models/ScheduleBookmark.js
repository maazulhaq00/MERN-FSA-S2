


import mongoose from "mongoose";

const ScheduleBookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    scheduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "schedule",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ScheduleBookmark", ScheduleBookmarkSchema);

