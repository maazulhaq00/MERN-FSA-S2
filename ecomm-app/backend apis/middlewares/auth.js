import jwt from "jsonwebtoken"
import * as dotenv from 'dotenv'
dotenv.config();

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];

    if(!auth){
        return res.status(403).json({message: "Unauthorized, JWT token required"})
    }

    try{
        const dedcoded = jwt.verify(auth, process.env.JWT_SECRET)
        req.user = dedcoded
        next()
    }
    catch(err){

        return res.status(403).json({message: "Unauthorized, JWT token worng or expired"})
    }
}

export default ensureAuthenticated