
import Booth from "../models/BoothModel.js";
import Expo from "../models/ExpoModel.js";
import Schedule from "../models/ScheduleModel.js";
import User from "../models/UserModel.js";

const getDashboardSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEvents = await Expo.countDocuments();
    const totalBooths = await Booth.countDocuments();
    const totalSessions = await Schedule.countDocuments();

    res.status(200).json({
      users: totalUsers,
      events: totalEvents,
      booths: totalBooths,
      sessions: totalSessions,
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard summary" });
  }
};

export default getDashboardSummary;
