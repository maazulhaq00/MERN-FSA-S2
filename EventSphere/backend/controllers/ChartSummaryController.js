import ExpoReg from "../models/ExpoRegistrationByAttendeeModel.js";
import ScheduleBookmark from "../models/ScheduleBookmark.js";
import ScheduleReg from "../models/SchedulRegModel.js";

const chartsummary = async (req, res) => {
    try {
    const scheduleRegs = await ScheduleReg.find();
    const bookmarks = await ScheduleBookmark.find();
    const expoRegs = await ExpoReg.find();

    const sessionRegCount = scheduleRegs.length;
    const bookmarkCount = bookmarks.length;
    const expoRegCount = expoRegs.length;

    res.status(200).json({
      sessionReg: sessionRegCount,
      sessionBook: bookmarkCount,
      expoReg: expoRegCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chart data", details: error.message });
  }
}

export default chartsummary