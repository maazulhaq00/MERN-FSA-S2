import mongoose from "mongoose";

const trackerProgresSehema = new mongoose.Schema({
BodyWeight: {
        type : Number,
        required : true
    },
Runtime : {
    type : Number,
    required : true,
},
Chest : {
    type : Number,
    required : true
},
Waist : {
type : Number,
required : true
},
Hip  : {
type : Number,
required : true
},
Liftingweights : {
    type : Number,
    required : true
},
Shoulderwidth : { 
    type : Number,
    required : true
},
Sleevelength :{
type : Number,
required : true
},
Neck :{
    type : Number,
    required : true
},
bodyfat : {
type : Number,
required : true
},
Date : {
    type : Date,
    required : true
},
userId : {
 type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref: "Users",
}
},{timestamps : true})
const Progress = mongoose.model("Progress" , trackerProgresSehema)
export default Progress                        