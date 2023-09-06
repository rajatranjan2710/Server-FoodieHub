import { UserDb } from "../models/User.js";
import ErrorHandler from "../utils/ErrorHandler.js";


export const isAuthenticated = (req,res,next) =>{
    const token = req.cookies["connect.sid"];
    if(!token){
       
       return next(new ErrorHandler("Not Logged in",401))
    
    }
    next()
}

export const adminAuth = (req,res,next)=>{
    
    if(req.user.role!=="admin"){
        next(new ErrorHandler("Only Accisible for admins",401))
    }
    next()
    
}