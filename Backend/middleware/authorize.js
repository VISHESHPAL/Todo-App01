import jwt from 'jsonwebtoken'
import User from '../model/user.model.js';
export const  authenticate = async (req,res,next) =>{
    const token  = req.cookies.jwt;
    // console.log(token);
    if(!token){
        return res.status(401).json({
            message: "Unauthoriuzed user "
        })
    }
    try{
      const decoded =  jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user =  await User.findById(decoded.userId) 
    //   console.log(decoded)
    }
    catch(error){
       return res.status(401).json({
        message:""+ error.message
       })
    }
    next();
}