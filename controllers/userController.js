import { catchAsyncError } from "../middlewares/errorMiddleware.js";
import { OrderDB } from "../models/Order.js";
import { UserDb } from "../models/User.js";
import ErrorHandler from "../utils/ErrorHandler.js";



export const myProfile = (req, res, next) => {
    res.status(200).json({
        success: true,
        user: req.user
    });

};

export const logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) return next(err);

        res.clearCookie('connect.sid', {
            secure: process.env.NODE_ENV === "development" ? false : true,
            httpOnly: process.env.NODE_ENV === "development" ? false : true,
            sameSite: process.env.NODE_ENV === "development" ? false : "none",
        });
        res.status(200).json({
            success: true,
            message: "Logged Out"
        });
    })
}

export const getAllUserDetails = catchAsyncError(
    async (req, res, next) => {
        const user = await UserDb.find({});
        if (!user) return next(new ErrorHandler("No users yet", 404))

        res.status(200).json({
            success: true,
            user
        })
    }
);


export const getAdminStats = catchAsyncError(
    async (req, res, next) => {
        const userCount = await UserDb.countDocuments();

        const order = await OrderDB.find({})

        const orderCount = await OrderDB.countDocuments();

        const preparingOrder = order.filter((i) => i.order_Status === "Preparing")

        console.log(preparingOrder)

        const shippedOrder = order.filter((i) => i.order_Status === "Shipped")

        const deliveredOrder = order.filter((i) => i.order_Status === "Delivered")

        let totalIncome = 0;

        order.forEach(i => {
            totalIncome += i.total_Amount
        })

        res.status(200).json({
            success: true,
            message: "data fetched",
            userCount,
            ordersCount: {
                total: order.length,
                preparing: preparingOrder.length,
                shipped: shippedOrder.length,
                delivered: deliveredOrder.length,

            },
            totalIncome
        })

    }
)