import mongoose from "mongoose";

export const connectDB = async()=>{

    const {connection} = await mongoose.connect("mongodb+srv://rajat27x:rajat2710@cluster0.0zws942.mongodb.net/foodiehub?retryWrites=true&w=majority");
    console.log(`Database is connected with ${connection.host}`)
}