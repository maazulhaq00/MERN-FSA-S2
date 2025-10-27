import mongoose from "mongoose";

const trackerSehema = new mongoose.Schema({
    exercisename: {
        type : String,
        required : true
    },
sets : {
    type : Number,
    required : true,
},
reps : {
    type : Number,
    required : true
},
weights : {
    type : Number,
    required : true
},
notes : {
    type : String,
    required : true
},
userId : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref: "Users",

},
workcategoryID:{
    type: mongoose.Schema.Types.ObjectId,
 ref: "workcategorys",
 required: true
}
},{timestamps : true})
const WorkTracker = mongoose.model("WorkTracker" , trackerSehema)
export default WorkTracker