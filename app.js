import express from "express";
import dotenv from "dotenv";
import { connectPassport } from "./utils/Provider.js";
import session from "express-session";
import passport, { Passport } from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";
import { MemoryStore } from "express-session";

const app = express();
export default app;

dotenv.config(
    {
        path: "./config/config.env"
    }
)

//middlewares

app.use(
    session(
        {
            cookie: { maxAge: 86400000 },
            secret: "keyyyeyeye",
            store: new MemoryStore({
                checkPeriod: 86400000 // prune expired entries every 24h
              }),
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: process.env.NODE_ENV === "development" ? false : true,
                httpOnly: process.env.NODE_ENV === "development" ? false : true,
                sameSite: process.env.NODE_ENV === "development" ? false : "none",
            }
        })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}))
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"]

}))

app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");

connectPassport();


//importing routes

import userRoute from './routes/user.js'
import orderRoute from './routes/order.js'


// import { connection } from "mongoose";

app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);


// importing custom error middlewre

import { errorMiddleware } from "./middlewares/errorMiddleware.js";

app.use(errorMiddleware);

