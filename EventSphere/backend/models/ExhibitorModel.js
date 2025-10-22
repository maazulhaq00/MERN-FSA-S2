import mongoose from "mongoose";

const ExhibitorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  productsServices: { type: String, required: true },
  documents: [{ type: String }],
  logo: { type: String },
  description: { type: String },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });


const Exhibitor = mongoose.model('exhibitor', ExhibitorSchema);

export default Exhibitor

