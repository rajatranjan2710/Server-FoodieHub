import { catchAsyncError } from "../middlewares/errorMiddleware.js"
import { OrderDB } from "../models/Order.js"
import ErrorHandler from "../utils/ErrorHandler.js";


//custom catch async error function

export const placeOrder = catchAsyncError(
    async (req, res, next) => {
        const {
            shipping_Info,
            order_Items,
            payment_Method,
            items_price,
            shipping_Charges,
            tax,
            total_Amount,
        } = req.body
        const user = req.user._id;

        const orderOptions = {
            shipping_Info,
            order_Items,
            payment_Method,
            items_price,
            shipping_Charges,
            tax,
            total_Amount,
            user
        }

        await OrderDB.create(orderOptions)

        res.status(201).json({
            success: true,
            message: "Order Created successfully via cash on delivery"
        })
    }
);

export const getMyOrders = catchAsyncError(

    async(req, res, next) => {

        const orders = await OrderDB.find({
            user:req.user._id
        }).populate("user","name");

        res.status(200).json({
            success:true,
            orders
        })
        console.log(req.user._id)
    });

export const getOrderDetails = catchAsyncError(
    async(req,res,next)=>{
        const order = await OrderDB.findById(req.params.id).populate("user","name");

        if(!order) return res.json({
            success:false,
            message:"Invalid Order Id"
        })

        res.status(200).json({
            success:true,
            order
        })
        
});

export const getAllOrders = catchAsyncError(
    async(req,res,next)=>{
        const order = await OrderDB.find({}).populate("user","name")
        res.status(200).json({
            success:true,
            order
        })
    }
);

export const processOrder = catchAsyncError(
    async(req,res,next)=>{
        const order = await OrderDB.findById(req.params.id)

        if(!order) return res.json({
            success:false,
            message:"Invalid Order Id"
        });

        if(order.order_Status==="Preparing") order.order_Status="Shipped"

        else if(order.order_Status==="Shipped") {
            order.order_Status="Delivered";
            order.delivered_At= new Date(Date.now())}

        else if(order.order_Status==="Delivered")
            return next(new ErrorHandler("Food Already Delivered",400))
        await order.save();

        res.status(200).json({
            success:true,
            message:"status updated successfully"
        })
    }
)