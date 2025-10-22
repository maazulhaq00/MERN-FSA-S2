import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



// user regestration
const regestration = async (req, res) => {

    try {
        let { name, email, password, role } = req.body;
        let image = req.file.filename;
        const user = await User.findOne({ email })

        const isValidroles = ["organizer", "exhibitor", "attendee"];
        if (!isValidroles.includes(role)) {
            return res.status(400).json({
                message: `Invalid role. Allowed roles are: ${isValidroles.join(", ")}.`,
            });
        }

        if (user) {
            return res.status(400).json({ message: "This email is already registered. Please log in instead." });
        }


        let userDoc = new User({ image ,name, email, password, role })
        userDoc.password = await bcrypt.hash(password, 1)
        await userDoc.save()
        return res.status(201).json({ message: "Your account has been created successfully." });

    }
    catch (error) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
    }
}

// userlogin
const login = async (req, res) => {


    try {
        let { name, email, password, role } = req.body;
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password. Please try again." });
        }

        let isPassword = await bcrypt.compare(password, user.password)

        if (isPassword == false) {
            return res.status(400).json({ message: "Invalid email or password. Please try again." });
        }
      
        let payload = { user: user._id };
        let secretkey = process.env.secret_key;
        let options = { expiresIn: "24h" }
        const token = jwt.sign(payload, secretkey, options)
        return res.status(200).json({ message: "You have logged in successfully.", token, name: user.name, email: user.email, role: user.role , image : user.image , userId : user._id });

    }
    catch (error) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
    }

}


// fetchusers
const fetchUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users })
    }
    catch (error) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." }, error);
    }
}

// deleteuser
const deleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        await User.findByIdAndDelete(id);
        res.status(200).json({ "message": "User has been deleted successfully." })
    }
    catch (error) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." }, error);

    }

}

//updateuser
const updateUser = async (req, res) => {
  try {
    const userId = req.user; 
    const { name, email } = req.body;
    let image;
const existingUser = await User.findOne({ email });

if (existingUser && existingUser._id.toString() !== userId) {
  return res.status(400).json({ message: "This email is already taken by another account." });
}

    if (req.file) {
      image = req.file.filename;
    }

    const updateData = { name, email };
    if (image) updateData.image = image;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    const payload = { user: updatedUser._id };
    const token = jwt.sign(payload, process.env.secret_key, {
      expiresIn: "24h",
    });

    res.status(200).json({
      message: "Profile updated successfully",
      token,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      image: updatedUser.image,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
  }
};


//change password
const changePassword = async (req, res) => {
  try {

    const userId = req.user;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Old password is incorrect." });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully." });
   
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
  }
};

//forgot password
const forgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found." });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
};


// GET /users/neighboring/:userId
export const getNeighboringExhibitors = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user || user.role !== "exhibitor") {
      return res.status(404).json({ message: "Exhibitor not found" });
    }

    const neighbors = await User.find({
      _id: { $ne: userId },
      role: 'exhibitor',
      expoId: user.expoId,
      floor: user.floor
    }).select("name email _id image");

    res.json({ neighbors });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export { regestration, login , fetchUsers , deleteUser , updateUser , changePassword , forgotPassword};