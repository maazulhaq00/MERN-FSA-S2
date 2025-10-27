import mongoose from "mongoose";

const userSehema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
email : {
    type : String,
    required : true,
    unique : true,
},
password : {
    type : String,
    required : true
},
image : {
    type : String,
    // required : true
}
},{timestamps : true})
const Users = mongoose.model("Users" , userSehema)
export default Users