import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import * as dotenv from 'dotenv'
dotenv.config();

const signup = async (req, res) => {
    try {
        // validate the body

        // Get the data sent from req
        const { name, email, password } = req.body

        const userExist = await User.findOne({ email: email })

        if (userExist) {
            return res.status(409).json({ success: false, message: `An account with this email already exist` })
        }

        let hashedPassword = await bcrypt.hash(password, 10)

        // Create a category
        const user = await User.create({ name, email, password: hashedPassword })

        // Send response with a new category data
        res.status(201).json({ success: true, user, message: "Account created successfully" })
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(403).json({ message: "User doesnot exist", success: false })
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.status(403).json({ message: "Incorrect password", success: false })
        }
        const jwtToken = jwt.sign(
            { email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
        // Send response with a new category data
        res.status(200).json({ success: true, user, message: "Login successful", token: jwtToken })
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export {
    signup,
    login
}