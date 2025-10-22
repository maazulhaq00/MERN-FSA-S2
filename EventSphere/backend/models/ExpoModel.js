import mongoose from 'mongoose';


let { Schema, model } = mongoose;

const expoSchema = Schema({
   expoimage : {
        type : String,
        required : true
    },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },

  description: {
    type: String,
    trim: true,
  },
  theme: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing' , 'past'],
    default: 'upcoming'
  }
},
  {
    timestamps: true,
  });


const Expo = model("expo", expoSchema);

export default Expo;
