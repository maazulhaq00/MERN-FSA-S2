import Booth from '../models/BoothModel.js';
import Expo from '../models/ExpoModel.js';
import Schedule from '../models/ScheduleModel.js';

// createschedule
const createSchedule = async (req, res) => {

    try {
        let {expo, title,speaker,location,startTime,endTime,description } = req.body;
      
        const existingSchedule = await Schedule.findOne({ title })

        if (existingSchedule) {
            return res.status(400 ).json({ message: "Schedule already exists. Please use a different name." });
        }

        if (!expo || !title || !speaker || !location || !startTime || !endTime  ) {
            return res.status(400).json({ message: "All fields are required." });
        }


          const expoExists = await Expo.findById(expo);
        if (!expoExists) {
            return res.status(404).json({ message: "Expo not found. Please provide a valid expo ID." });
        }
        
        const boothExists = await Booth.findById(location);
        if (!boothExists) {
            return res.status(404).json({ message: "Location not found. Please provide a valid booth ID." });
        }

      

        const schedule = await Schedule.create({
            expo, title,speaker,location,startTime,endTime,description 
        })
        res.status(201).json({ message: "schedule created Succesfully", schedule })
    }
    catch (error) {
         return res.status(500).json({ message: "An unexpected error occurred. Please try again later." }, error);
        // console.log(error);
        
    }

}

///fetchshedule
const fetchSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find().populate("expo").populate("location");
        res.status(200).json({ schedules })
    }
    catch (error) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." }, error);
    }
}

// fetchschedulebyid
const fetchSchedule = async (req, res) => {
    try {
        let id = req.params.id;
        const schedule = await Schedule.findById(id).populate("expo").populate("location");
        res.status(200).json({ schedule })
    }
    catch (error) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." }, error);

    }
}


// updateschedule
const updateSchedule = async (req, res) => {
    try {
        let id = req.params.id;
        let {expo, title,speaker,location,startTime,endTime,description } = req.body;


         const expoExists = await Expo.findById(expo);
        if (!expoExists) {
            return res.status(404).json({ message: "Expo not found. Please provide a valid expo ID." });
        }


        const boothExists = await Booth.findById(location);
        if (!boothExists) {
            return res.status(404).json({ message: "Booth not found. Please provide a valid booth ID." });
        }


        const existingSchedule = await Schedule.findOne({title});

        if (existingSchedule && existingSchedule._id.toString() !== id) {
            return res.status(409).json({ message: "This schedule is already exist " });
        }

        await Schedule.findByIdAndUpdate(id, {
            expo, title,speaker,location,startTime,endTime,description
        });
        const schedule = await Schedule.findById(id).populate("expo").populate("location");
        res.status(200).json({ schedule })

    }
    catch (error) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
    }

}

// deleteshedule
const deleteSchedule = async (req, res) => {
    try {
        let id = req.params.id;
        await Schedule.findByIdAndDelete(id);
        res.status(200).json({ "message": "Schedule has been deleted successfully." })
    }
    catch (error) {
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." }, error);

    }

}






export { createSchedule , fetchSchedule, fetchSchedules ,updateSchedule, deleteSchedule}