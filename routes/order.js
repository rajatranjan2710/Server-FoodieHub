import express from "express";
import passport from "passport";
import { adminAuth, isAuthenticated } from "../middlewares/auth.js";
import { getAllOrders, getMyOrders, getOrderDetails, placeOrder, processOrder } from "../controllers/orderController.js";

const router = express.Router();

//Order Routes
// Authentication middleware - if user is not logged in he cant access these routes

router.post("/createorder",isAuthenticated,placeOrder);

router.get("/myorders",isAuthenticated, getMyOrders);

router.get("/order/:id",isAuthenticated,getOrderDetails)


// admin auth middleware - if user's role is not admin he cant access admin routes

router.get("/admin/orders",adminAuth,getAllOrders)

router.get("/admin/orders/:id",adminAuth,processOrder)


export default router;