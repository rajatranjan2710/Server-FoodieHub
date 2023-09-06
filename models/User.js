import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    name:String,
    photo:String,
    googleId:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

export const UserDb = mongoose.model("User",Schema);