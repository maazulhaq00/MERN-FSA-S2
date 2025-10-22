import Expo from "../models/ExpoModel.js";


// createexpo
const createExpo = async (req, res) => {

    try {
        let { title, date, description, theme, status } = req.body;
        let expoimage = req.file.filename;

        const existingDateExpo = await Expo.findOne({ date });

        if (existingDateExpo) {
            return res.status(400).json({ message: "An expo already exists on this date. Please choose another date." });
        }

        const existingExpo = await Expo.findOne({ title })
        if (existingExpo) {
            return res.status(400).json({ message: "Expo already exists. Please use a different name." });
        }

        if (!expoimage || !title || !date || !theme) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const expo = await Expo.create({
            expoimage, title, date, description, theme, status
        })
        res.status(201).json({ message: "Expo created Succesfully", expo })
    }
    catch (error) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." }, error);
    }

}

// fetchexpos
const fetchExpos = async (req, res) => {
    try {
        const expos = await Expo.find();
        res.status(200).json({ expos })
    }
    catch (error) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." }, error);
    }
}

// fetchexpo
const fetchExpo = async (req, res) => {
    try {
        let id = req.params.id;
        const expo = await Expo.findById(id);
        res.status(200).json({ expo })
    }
    catch (error) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." }, error);

    }
}

// updateexpo
const updateExpo = async (req, res) => {
    try {
        let id = req.params.id;
        let { title, date, description, theme, status } = req.body;
        const existingDateExpo = await Expo.findOne({ date, _id: { $ne: id } });

        if (existingDateExpo) {
            return res.status(400).json({ message: "An expo already exists on this date. Please choose another date." });
        }
        const existingExpo = await Expo.findById(id);
        if (!existingExpo) {
            return res.status(404).json({ message: "Expo not found" });
        }
        let expoimage = existingExpo.expoimage;
        if (req.file) {
            expoimage = req.file.filename;
        }



        await Expo.findByIdAndUpdate(id, {
            expoimage, title, date, description, theme, status
        });
        const expo = await Expo.findById(id);
        res.status(200).json({ expo })
    }
    catch (rror) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." }, error);

    }
}

// deleteexpo
const deleteExpo = async (req, res) => {
    try {
        let id = req.params.id;
        await Expo.findByIdAndDelete(id);
        res.status(200).json({ "message": "Expo has been deleted successfully." })
    }
    catch (error) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." }, error);

    }

}

export { createExpo, fetchExpos, fetchExpo, updateExpo, deleteExpo }