import mongoose from "mongoose";


const MealSchema = new mongoose.Schema({
    mealname: {
        type: String,
        required: true
    },
    mealcalories: {
        type: Number,
        required: true
    },
    mealprotein: {
        type: String,
        required: true
    },
    mealfats: {
        type: String,
        required: true
    },
    mealcarbs: {
        type: String,
        required: true
    },
   
    mealtypeid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "types",
        required: true
    },
    userId : {
     type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "Users",
    },
    
}, {timestamps: true});
const meals = mongoose.model("meals", MealSchema);

export default meals;