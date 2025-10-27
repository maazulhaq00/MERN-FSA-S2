import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()


async function connection(){
    try{
        await mongoose.connect(process.env.DB)
        console.log("Database Connect Successfully");
    }catch(error){
        console.log(error);
    }
}

export default connection