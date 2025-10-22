
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const boothSchema = new Schema({
  boothNumber: { type: String, required: true, trim: true },
  size: { type: String },
  floor: {
    type: String,
    enum: ['Floor1', 'Floor2', 'Floor3', 'Floor4', 'Floor5'],
  },
  status: {
    type: String,
    enum: ['available', 'reserved'],
    default: 'available',
  },

  products: [String],
  staff: [
    {
      name: String,
      role: String,
      contact: String,
    },
  ],
}, { timestamps: true });

const Booth = model('booth', boothSchema);
export default Booth;