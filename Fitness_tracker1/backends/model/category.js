import mongoose from "mongoose";

const MealtypeSchema = new mongoose.Schema({
    Mealtype: {
        type: String,
        required: true
    },
}, {timestamps: true});

const types = mongoose.model("types", MealtypeSchema);

export default types;