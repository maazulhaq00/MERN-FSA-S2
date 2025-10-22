import BoothAssignment from "../models/BoothassignModel.js";
import Booth from "../models/BoothModel.js";
import Expo from "../models/ExpoModel.js";
import User from "../models/UserModel.js";

// createboothassignment
const createBoothAssignment = async (req, res) => {
    try {
        const { booth, expo, assignedTo, status, assignedAt } = req.body;

        if (!booth || !expo || !assignedTo) {
            return res.status(400).json({ message: "Booth, Expo, and AssignedTo are required." });
        }

        const boothExists = await Booth.findById(booth);
        if (!boothExists) {
            return res.status(404).json({ message: "Booth not found. Please provide a valid booth ID." });
        }

        const expoExists = await Expo.findById(expo);
        if (!expoExists) {
            return res.status(404).json({ message: "Expo not found. Please provide a valid expo ID." });
        }

        const userExists = await User.findById(assignedTo);
        if (!userExists) {
            return res.status(404).json({ message: "User not found. Please provide a valid user ID." });
        }

        const existingAssign = await BoothAssignment.findOne({ booth, expo });

        if (existingAssign) {
            return res.status(409).json({ message: "This booth is already assigned for the selected expo." });
        }


        const boothAssign = await BoothAssignment.create({
            booth, expo, assignedTo, status, assignedAt
        });

        await Booth.findByIdAndUpdate(booth, { status: 'reserved' });
        res.status(201).json({ message: "Booth assigned successfully.", boothAssign });
    }
    catch (error) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
    }
}

// fetchboothassignments
const fecthBoothAssignments = async (req, res) => {
    try {
        const boothAssigns = await BoothAssignment.find().populate("assignedTo").populate("expo").populate("booth");
        res.status(200).json({ boothAssigns })
    }
    catch (error) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
    }
}

// fetchboothassignment
const fetchBoothAssignment = async (req, res) => {
    try {
        let id = req.params.id;
        const boothAssign = await BoothAssignment.findById(id).populate("assignedTo").populate("expo").populate("booth");
        res.status(200).json({ boothAssign })
    }
    catch (error) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
    }
}

// updateboothassignment
const updateBoothAssignment = async (req, res) => {
    try {
        let id = req.params.id;
        let { booth, expo, assignedTo, status, assignedAt } = req.body;

        const boothExists = await Booth.findById(booth);
        if (!boothExists) {
            return res.status(404).json({ message: "Booth not found. Please provide a valid booth ID." });
        }

        const expoExists = await Expo.findById(expo);
        if (!expoExists) {
            return res.status(404).json({ message: "Expo not found. Please provide a valid expo ID." });
        }

        const userExists = await User.findById(assignedTo);
        if (!userExists) {
            return res.status(404).json({ message: "User not found. Please provide a valid user ID." });
        }

        const existingAssign = await BoothAssignment.findOne({ booth, expo });

        if (existingAssign && existingAssign._id.toString() !== id) {
            return res.status(409).json({ message: "This booth is already assigned for the selected expo." });
        }

        await BoothAssignment.findByIdAndUpdate(id, {
            booth, expo, assignedTo, status, assignedAt
        });
        
        const boothAssign = await BoothAssignment.findById(id).populate("assignedTo").populate("expo").populate("booth");
        res.status(200).json({ boothAssign })

    }
    catch (error) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
    }

}

// deleteboothassignment
const deleteBoothAssignment = async (req, res) => {
    try {
        let id = req.params.id;
        const assignment = await BoothAssignment.findById(id);
        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found." });
        }
        const boothId = assignment.booth;
        await BoothAssignment.findByIdAndDelete(id);

        await Booth.findByIdAndUpdate(boothId, { status: "available" });
        res.status(200).json({ "message": "Expo has been deleted successfully." })
    }
    catch (error) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
    }
}



export { createBoothAssignment, fecthBoothAssignments, fetchBoothAssignment, updateBoothAssignment, deleteBoothAssignment }