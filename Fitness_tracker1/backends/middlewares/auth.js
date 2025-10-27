import jwt from 'jsonwebtoken'

const ensureauthanticated = (req, res, next) =>{
try{

const token = req.header["authication"]

if(!token){

    return res.status(403).json({message : "token is required"})
}

let docadedtoken = jwt.verify(token , process.env.SECRET_KEY)

req.user = docadedtoken

next()


}catch(Err){

return res.status(403).json({message : "Token is valid or expired"})

}
}


export default ensureauthanticated