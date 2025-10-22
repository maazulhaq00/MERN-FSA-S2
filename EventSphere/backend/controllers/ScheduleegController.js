
import Schedule from "../models/ScheduleModel.js";
import ScheduleReg from "../models/SchedulRegModel.js";
import User from "../models/UserModel.js";


// Create Registration
const CreateAttendeeScheduleReg = async (req, res) => {
  try {
    let { schedule, user, status } = req.body;

    if (!schedule || !user) {
      return res.status(400).json({ message: "Schedule ID and User ID are required" });
    }

    const scheduleExists = await Schedule.findById(schedule);
    const userExists = await User.findById(user);
    if (!scheduleExists || !userExists) {
      return res.status(404).json({ message: "Invalid Schedule or User ID" });
    }

    const existing = await ScheduleReg.findOne({ schedule, user });
    if (existing) {
      return res.status(409).json({ message: "Already registered for this schedule." });
    }

    if (!status) status = "pending";

    const attendeeScheduleReg = await ScheduleReg.create({ schedule, user, status });
    return res.status(201).json({ message: "Registered successfully", attendeeScheduleReg });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Registrations for a User
const GetScheduleRegsForUser = async (req, res) => {
  try {
    const userId = req.user;
    if (!userId) {
      return res.status(400).json({ message: "User ID not found in token" });
    }

    const registrations = await ScheduleReg.find({ user: userId }).populate("schedule");
    return res.status(200).json({ registrations });
  } catch (error) {
    return res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

// Get All Registrations
const GetAllScheduleRegs = async (req, res) => {
  try {
    const registrations = await ScheduleReg.find()
      .populate("schedule")
      .populate("user");
    return res.status(200).json({ registrations });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Registration Status
const updateScheduleRegs = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await ScheduleReg.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Registration not found" });
    }

    return res.status(200).json({ message: "Status updated", updated });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete Registration
const deleteScheduleRegs = async (req, res) => {
  try {
    await ScheduleReg.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Registration deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
};

// Registration Report
const scheduleRegistrationReport = async (req, res) => {
  const registrations = await ScheduleReg.find().populate("schedule").populate("user");

  const report = {
    total: registrations.length,
    approved: registrations.filter(r => r.status === "approved").length,
    pending: registrations.filter(r => r.status === "pending").length,
    rejected: registrations.filter(r => r.status === "rejected").length,
    registrationsBySchedule: {},
    registrationsByDate: {},
  };

  registrations.forEach((reg) => {
    const scheduleTitle = reg.schedule?.title || "Unknown";
    const date = new Date(reg.createdAt).toISOString().split("T")[0];

    report.registrationsBySchedule[scheduleTitle] = (report.registrationsBySchedule[scheduleTitle] || 0) + 1;
    report.registrationsByDate[date] = (report.registrationsByDate[date] || 0) + 1;
  });

  res.json(report);
};

export {
  CreateAttendeeScheduleReg,
  GetScheduleRegsForUser,
  GetAllScheduleRegs,
  updateScheduleRegs,
  deleteScheduleRegs,
  scheduleRegistrationReport,
};
