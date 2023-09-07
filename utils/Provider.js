import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import passport from "passport"
import { UserDb } from "../models/User.js"

export const connectPassport =()=>{
    passport.use(new GoogleStrategy({
        clientID: "783062772748-694lbkq3mempfge1ocf7pntqnv343gpm.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/api/v1/login"
    },async function(accessToken,refreshToken,profile,done){
        //database
        const user = await UserDb.findOne({
            googleId:profile.id,
        });
        if(!user){
            const newUser = await UserDb.create({
                googleId:profile.id,
                name:profile.displayName,
                photo:profile.photos[0].value
            })
            return done(null,newUser)
        }
        else{
            return done(null,user)
        }

    }))

    passport.serializeUser((user,done)=>{
        done(null,user.id)
    });

    passport.deserializeUser(async(id,done)=>{
        const user = await UserDb.findById(id);
        done(null,user);
    });
};