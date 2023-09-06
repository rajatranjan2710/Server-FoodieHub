import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    razorpay_order_id:{
        type:String,
        required:true
    },
    razorpay_payment_id:{
        type:String,
        required:true
    },
    razorpay_signature:{
        type:String,
        required:true
    },
    payment_created_at:{
        type:Date,
        required:Date.now,
    }
});

export const PaymentDB = mongoose.model("Payment",Schema)