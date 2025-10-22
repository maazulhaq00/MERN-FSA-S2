import mongoose from 'mongoose'
let { Schema, model } = mongoose

const userSchema = Schema({
    image : {
        type : String,
        required : true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ['organizer', 'exhibitor', 'attendee'],
        required: true
    }


}, { timestamps: true })

const User = model("user", userSchema)

export default User;