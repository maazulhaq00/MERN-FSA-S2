import User from "../models/userModel.js"

const signup = async (req, res) => {
     try {
        // validate the body

        // Get the data sent from req
        const { name, email, password } = req.body

        const userExist = await User.findOne({ email: email })

        if (userExist) {
            return res.status(409).json({ success: false, message: `An account with this email already exist` })
        }

        // Create a category
        const user = await User.create({ name, email, password })

        // Send response with a new category data
        res.status(201).json({ success: true, user, message: "Account created successfully"})
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const login = (req, res) => {
    
}

export {
    signup,
    login
}