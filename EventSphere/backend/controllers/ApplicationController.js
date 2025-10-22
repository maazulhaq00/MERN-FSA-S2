import Application from '../models/Application.js';
import Expo from '../models/ExpoModel.js';
import Booth from '../models/BoothModel.js';
import Exhibitor from '../models/ExhibitorModel.js';

export const createApplication = async (req, res) => {
  try {
    const { exhibitorId, expoId, boothId } = req.body;

    if (!exhibitorId || !expoId) {
      return res.status(400).json({ message: "Exhibitor and Expo are required." });
    }

    const exhibitor = await Exhibitor.findById(exhibitorId);
    if (!exhibitor) {
      return res.status(404).json({ message: "Exhibitor not found." });
    }

    const expo = await Expo.findById(expoId);
    if (!expo) {
      return res.status(404).json({ message: "Expo not found." });
    }

    let booth = null;
    if (boothId) {
      booth = await Booth.findById(boothId);
      if (!booth) {
        return res.status(404).json({ message: "Booth not found." });
      }
    }

    const existing = await Application.findOne({ exhibitor: exhibitorId, expo: expoId });
    if (existing) {
      return res.status(400).json({ message: "Application already exists." });
    }

    const application = await Application.create({
      exhibitor: exhibitorId,
      expo: expoId,
      booth: boothId || null,
      status: 'pending'
    });

    res.status(201).json({ message: "Application submitted", application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('exhibitor')
      .populate('expo')
      .populate('booth');

    res.json({ applications });
  } catch (err) {
    console.error("Error in getAllApplications:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};


