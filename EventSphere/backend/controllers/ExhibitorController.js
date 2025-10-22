
import Exhibitor from '../models/ExhibitorModel.js'

const registerExhibitor = async (req, res) => {
  try {
    const { companyName, email, contactNumber, productsServices, description } = req.body;
    console.log(" User ==> ", req.user);
    const userId = req.user; 

    let logo = req.files?.logo?.[0]?.filename;
    let documents = req.files?.documents?.map(f => f.filename);

    const existingExhibitor = await Exhibitor.findOne({ userId });
    if (existingExhibitor) {
      return res.status(400).json({ message: "Exhibitor already Registered." });
    }

    const exhibitor = await Exhibitor.create({
      userId,
      companyName,
      email,
      contactNumber,
      productsServices,
      description,
      logo,
      documents,
    });

    res.json({ exhibitor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const fetchExhibitors = async (req, res) => {
    const exhibitors = await Exhibitor.find();
    res.json({ exhibitors });
};

const fetchExhibitorById = async (req, res) => {
    const eid = req.params.id;
    const exhibitor = await Exhibitor.findById(eid);
    res.json({ exhibitor });
};

const updateExhibitor = async (req, res) => {
    const eid = req.params.id;
    const { companyName, email, contactNumber, productsServices, description } = req.body;


    const existing = await Exhibitor.findOne({ email });
if (existing && existing._id.toString() !== eid) {
  return res.status(400).json({ message: "Exhibitor already registered." });
}

        if (!companyName || !email || !contactNumber || !productsServices) {
            return res.status(400).json({ message: "All fields are required." });
        }

    let updateData = {
        companyName,
        email,
        contactNumber,
        productsServices,
        description
    };

    if (req.file) {
        updateData.logo = req.file.filename;
    }

    if (req.files?.documents) {
        updateData.documents = req.files.documents.map(file => file.filename);
    }


    await Exhibitor.findByIdAndUpdate(eid, updateData);

    const exhibitor = await Exhibitor.findById(eid);
    res.json({ exhibitor });
};

const deleteExhibitor = async (req, res) => {
    const eid = req.params.id;
    await Exhibitor.findByIdAndDelete(eid);
    res.json({ message: "Exhibitor deleted successfully" });
};

export {
    registerExhibitor,
    fetchExhibitors,
    fetchExhibitorById,
    updateExhibitor,
    deleteExhibitor
};