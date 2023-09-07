import express from "express";
import passport from "passport";
import { getAdminStats, getAllUserDetails, logout, myProfile } from "../controllers/userController.js";
import { adminAuth, isAuthenticated } from "../middlewares/auth.js";



const router = express.Router();


router.get("/googlelogin", passport.authenticate("google", {
    scope: ["profile"]

}))

router.get("/login", passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL
})
);

router.get("/me", isAuthenticated, myProfile)

router.get("/logout", isAuthenticated, logout)


router.get("/admin/users", isAuthenticated, adminAuth, getAllUserDetails);


router.get("/admin/stats", isAuthenticated, adminAuth, getAdminStats)
export default router