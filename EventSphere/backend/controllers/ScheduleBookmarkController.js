


import ScheduleBookmark from "../models/ScheduleBookmark.js";
import User from "../models/UserModel.js"; // ✅ Add this
import Schedule from "../models/ScheduleModel.js"; // ✅ Add this

export const toggleBookmark = async (req, res) => {
  const userId = req.user;
  const { scheduleId } = req.body;

  if (!scheduleId) return res.status(400).json({ message: "scheduleId required" });

  try {
    const existing = await ScheduleBookmark.findOne({ userId, scheduleId });

    if (existing) {
      await existing.deleteOne();
      return res.status(200).json({ message: "Bookmark removed", bookmarked: false });
    }

    const newBookmark = new ScheduleBookmark({ userId, scheduleId });
    await newBookmark.save();
    return res.status(201).json({ message: "Bookmark added", bookmarked: true });
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getUserBookmarks = async (req, res) => {
  const userId = req.user;

  try {
    const bookmarks = await ScheduleBookmark.find({ userId });
    const bookmarkedScheduleIds = bookmarks.map(b => b.scheduleId.toString());
    res.json({ bookmarkedScheduleIds });
  } catch (error) {
    console.error("Error getting bookmarks:", error);
    res.status(500).json({ error: "Server error" });
  }
};


export const getallBookmarks = async (req, res) => {
  try {
    const bookmarks = await ScheduleBookmark.find().populate("userId").populate("scheduleId");
res.status(200).json({ bookmarks })
    


  } catch (error) {
    console.error("Error getting bookmarks:", error);
    res.status(500).json({ error: "Server error" });
  }
};


