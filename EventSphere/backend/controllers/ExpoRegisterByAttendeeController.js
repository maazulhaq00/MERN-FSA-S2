


import Expo from "../models/ExpoModel.js";
import ExpoReg from "../models/ExpoRegistrationByAttendeeModel.js";
import User from "../models/UserModel.js";

const CreateAttendeeExpoReg = async (req, res) => {
  try {
    let { expo, user, status } = req.body;

    if (!expo || !user) {
      return res.status(400).json({ message: "Expo ID and User ID are required" });
    }

    const expoExists = await Expo.findById(expo);
    const userExists = await User.findById(user);
    if (!expoExists || !userExists) {
      return res.status(404).json({ message: "Invalid Expo or User ID" });
    }

    const existing = await ExpoReg.findOne({ expo, user });
    if (existing) {
      return res.status(409).json({ message: "Already registered for this expo." });
    }

    if (!status) status = "pending";

    const AttendeeExpoReg = await ExpoReg.create({ expo, user, status });
    return res.status(201).json({ message: "Registered successfully", AttendeeExpoReg });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};



const GetExpoRegsForUser = async (req, res) => {
  try {
    const userId = req.user; // ✅ Token se directly userId string mil rahi hai

    if (!userId) {
      return res.status(400).json({ message: "User ID not found in token" });
    }

    const registrations = await ExpoReg.find({ user: userId }).populate("expo");

    console.log("Registrations returned:", registrations);

    return res.status(200).json({ registrations });
  } catch (error) {
    console.error("Error fetching user registrations:", error);
    return res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

const GetAllExpoRegs = async (req, res) => {
  try {
    const registrations = await ExpoReg.find()
      .populate("expo")
      .populate("user");

    return res.status(200).json({ registrations });
  } catch (error) {
    console.error("Error fetching all registrations:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


const updateExpoRegs = async (req, res) => {
    try {
    const { status } = req.body;
    const updated = await ExpoReg.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Registration not found" });
    }

    return res.status(200).json({ message: "Status updated", updated });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteExpoRegs =  async (req, res) => {
  try {
    await ExpoReg.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Registration deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
};

// GET /api/expo/registration-report
const exporegestrationreport = async (req, res) => {
  const registrations = await ExpoReg.find().populate("expo").populate("user");

  const report = {
    total: registrations.length,
    approved: registrations.filter(r => r.status === "approved").length,
    pending: registrations.filter(r => r.status === "pending").length,
    rejected: registrations.filter(r => r.status === "rejected").length,
    registrationsByExpo: {},
    registrationsByDate: {},
  };

  registrations.forEach((reg) => {
    const expoTitle = reg.expo?.title || "Unknown";
    const date = new Date(reg.createdAt).toISOString().split("T")[0];

    report.registrationsByExpo[expoTitle] = (report.registrationsByExpo[expoTitle] || 0) + 1;
    report.registrationsByDate[date] = (report.registrationsByDate[date] || 0) + 1;
  });

  res.json(report);
};



export { CreateAttendeeExpoReg, GetExpoRegsForUser , GetAllExpoRegs ,  updateExpoRegs , deleteExpoRegs , exporegestrationreport};
