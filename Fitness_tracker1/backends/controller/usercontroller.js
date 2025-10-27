import Users from '../model/users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const signup = async (req,res) =>{
    try{
    let {name , email , password} = req.body;
    let image = req.file ? req.file.filename : null;
    let user = await Users.findOne({email})
    if(user){
return res.status(409).json({message : "user already exist, login", success : false})
    }
    let userdoc = new Users({name , email , password, image})
    userdoc.password = await bcrypt.hash(password , 10)
    await userdoc.save()

    let payload = {"email" : email , "_id" : userdoc._id}
    let option = {expiresIn : "24"}
    let token = jwt.sign(payload , process.env.SECRET_KEY , option)
     res.status(201).json({message : "signup successfully" , success : true, token , _id : userdoc._id ,
         name : userdoc.name , email })


        }catch(err){

    console.log(err);
res.status(500).json({message : "internal server error" , success : false})
}
}


const login = async (req, res) =>{

try{
    let {email , password} = req.body;
    const user = await Users.findOne({email})
    if(!user){
        res.status(403).json({message : "Incorrect password or email", success : false})
    }
     let isPasswordEqual = await bcrypt.compare(password , user.password)
     console.log(isPasswordEqual);
     if(isPasswordEqual == false){
        res.status(403).json({message : "Incorrect password or email", success : false})
     }

     let payload = {"email" : email, "_id" : user._id,}
     let options = {expiresIn : "24h"}
      
     const token = jwt.sign(payload , process.env.SECRET_KEY, options)

     res.status(200).json({message : "Login Success", token, _id : user._id, name : user.name , email})
}catch(Err){
    res.status(500).json({message : "Internal server Error", success : false})

}
}

const fetchuser =  async (req , res) => {
  try {
    const user = await Users.find();
    res.json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


 const fetchuserbyid = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }

  const user = await Users.findById(id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
};


const updateuser = async (req, res) =>{
    try{
let id = req.params.id
if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(400).json({message : "Invalid Id Format"})
}

let {name, email, password} = req.body
let imagefolder = {name, email, password}
if(req.file){
    imagefolder.image = req.file.filename
}
await Users.findByIdAndUpdate(id,imagefolder)

let upuser = await Users.findById(id)
res.json({upuser})
    }catch(err){
        res.status(500).json({message : "Internal Server Error"})
    }


}



export {
    signup , login,updateuser,fetchuser,fetchuserbyid
}
