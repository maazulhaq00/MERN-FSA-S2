import mongoose from 'mongoose';
let { Schema, model } = mongoose;

const boothAssignmentSchema = new Schema({
    booth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'booth',
        required: true,
    },
    expo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'expo',
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    status: {
        type: String,
        enum: ['assigned', 'pending'],
        default: 'assigned',
    },
    assignedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const BoothAssignment = model("boothassignment", boothAssignmentSchema);

export default BoothAssignment;
