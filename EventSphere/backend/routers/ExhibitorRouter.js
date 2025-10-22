import express from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/Authh.js'; 
import Exhibitor from '../models/ExhibitorModel.js';
import {registerExhibitor, fetchExhibitorById, fetchExhibitors, updateExhibitor, deleteExhibitor} from '../controllers/ExhibitorController.js'
import Auth from '../middlewares/Auth.js';

const ExhibitorRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/exhibitoruploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });


ExhibitorRouter.post('/', Auth, upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'documents', maxCount: 5 }]), registerExhibitor);

ExhibitorRouter.get('/profile', authMiddleware, async (req, res) => {
  try {
    console.log(" User ==> ", req.user);
    const exhibitor = await Exhibitor.findOne({ userId: req.user });
    console.log(" User ==> ", req.user);
    if (!exhibitor) return res.status(404).json({ message: "Exhibitor not found" });

    res.json({ exhibitor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

ExhibitorRouter.get('/', fetchExhibitors);
ExhibitorRouter.get('/:id', fetchExhibitorById);
// ExhibitorRouter.get('/profile', authMiddleware, async (req, res) => {
//   try {
//     console.log(" User ==> ", req.user);
//     const exhibitor = await Exhibitor.findOne({ userId: req.user }).lean();
//     if (!exhibitor) return res.status(404).json({ message: "Exhibitor not found", user: req.user });

//     res.json({ exhibitor });
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });
ExhibitorRouter.put('/:id', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'documents', maxCount: 5 }]), updateExhibitor);
ExhibitorRouter.put(
  '/profile',
  authMiddleware,
  upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'documents', maxCount: 5 }]),
  async (req, res) => {
    try {
      const userId = req.user._id;
      const existing = await Exhibitor.findOne({ userId });
      if (!existing) return res.status(404).json({ message: "Exhibitor not found" });

      const { companyName, email, contactNumber, productsServices, description } = req.body;
      if (!companyName || !email || !contactNumber || !productsServices) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const updateData = {
        companyName,
        email,
        contactNumber,
        productsServices,
        description,
      };

      if (req.files?.logo?.[0]) {
        updateData.logo = req.files.logo[0].filename;
      }

      if (req.files?.documents) {
        updateData.documents = req.files.documents.map(file => file.filename);
      }

      const updated = await Exhibitor.findOneAndUpdate({ userId }, updateData, { new: true });
      res.json({ exhibitor: updated });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);
ExhibitorRouter.delete('/:id', deleteExhibitor);

export default ExhibitorRouter;
