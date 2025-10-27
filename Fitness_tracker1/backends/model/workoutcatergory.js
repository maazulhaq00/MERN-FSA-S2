import mongoose from "mongoose";

const workcatSehema = new mongoose.Schema({
    workout_name: {
        type : String,
        required : true
    }

},{timestamps : true})
const workcategorys = mongoose.model("workcategorys" , workcatSehema)
export default workcategorys

