import Booth from "../models/BoothModel.js";

// createbooth
const createBooth = async (req, res) => {
    try {
        let { boothNumber, size, floor, status } = req.body;

        const existingBooth = await Booth.findOne({ boothNumber })
        if (existingBooth) {
            return res.status(400).json({ message: "Booth already exists" });
        }

        if (!boothNumber || !size || !floor ) {
            return res.status(400).json({ message: "Required fields missing : booth number , floor and size." });
        }

        const booth = await Booth.create({
            boothNumber, size, floor , status
        })
        res.status(201).json({ booth })
    }
    catch (error) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
    }
}

// fetchbooths
const fetchBooths = async (req, res) => {
    try {
        const booths = await Booth.find();
        res.status(200).json({ booths })
    }
    catch (error) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
    }
}

// fetchbooth
const fetchBooth = async (req, res) => {
    try {
        let id = req.params.id;
        const booth = await Booth.findById(id);
        res.status(200).json({ booth })
    }
    catch (error) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
    }
}

// updatebooth
const updateBooth = async (req, res) => {
    try {
        let id = req.params.id;
        let { boothNumber, size, floor , status } = req.body;

        const existingBooth = await Booth.findOne({ boothNumber, _id: { $ne: id } });
    if (existingBooth) {
      return res.status(400).json({ message: "Booth number already exists." });
    }

        
        if (!boothNumber || !size || !floor) {
            return res.status(400).json({ message: "Required fields missing : booth number , floor and size." });
        }

        await Booth.findByIdAndUpdate(id, {
            boothNumber, size, floor , status
        });
        const booth = await Booth.findById(id);
        res.status(200).json({ booth })
    }
    catch (error) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
    }
}

// deletebooth
const deleteBooth = async (req, res) => {
    try {
        let id = req.params.id;
        await Booth.findByIdAndDelete(id);
        res.status(200).json({ "message": "Booth has been deleted successfully." })
    }
    catch (error) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
    }

}

// Get booths by Expo ID
const getBoothsByExpo = async (req, res) => {
  const { expoId } = req.query;
  try {
    const booths = await Booth.find({ expo: expoId });
    res.json(booths);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch booths" });
  }
};

// Get available booth sizes and floors
const getAvailableBoothDetails = async (req, res) => {
  try {
    const sizes = await Booth.distinct("size");
    const floors = await Booth.distinct("floor");
    res.json({ sizes, floors });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Filter booths by size and floor
const filterBooths = async (req, res) => {
  try {
    const { size, floor } = req.query;
    const query = { status: 'available' };
    if (size) query.size = size;
    if (floor) query.floor = floor;

    const booths = await Booth.find(query);
    res.status(200).json({ booths });
  } catch (err) {
    res.status(500).json({ error: "Failed to filter booths" });
  }
};

// Reserve booth
const reserveBooth = async (req, res) => {
  try {
    const { boothId, exhibitorId } = req.body;

    const booth = await Booth.findById(boothId);
    if (!booth) return res.status(404).json({ message: "Booth not found" });

    if (booth.status === 'reserved') {
      return res.status(400).json({ message: "Booth already reserved" });
    }

    booth.status = 'reserved';
    booth.exhibitorId = exhibitorId;
    await booth.save();

    res.status(200).json({ message: "Booth reserved successfully", booth });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update booth's products/services and staff
const updateBoothDetails = async (req, res) => {
  try {
    const { boothId } = req.params;
    const { products, staff } = req.body;

    const booth = await Booth.findByIdAndUpdate(
      boothId,
      { products, staff },
      { new: true }
    );

    if (!booth) {
      return res.status(404).json({ message: "Booth not found" });
    }

    res.status(200).json({ message: "Booth details updated", booth });
  } catch (error) {
    console.error("Error updating booth details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get booth's products/services and staff
const getBoothDetails = async (req, res) => {
  try {
    const { boothId } = req.params;
    const booth = await Booth.findById(boothId);

    if (!booth) {
      return res.status(404).json({ message: "Booth not found" });
    }

    res.status(200).json(booth);
  } catch (error) {
    console.error("Error fetching booth details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Export all
export {
  createBooth,
  fetchBooths,
  fetchBooth,
  updateBooth,
  deleteBooth,
  getBoothsByExpo,
  getAvailableBoothDetails,
  filterBooths,
  reserveBooth,
  updateBoothDetails,
  getBoothDetails
};
