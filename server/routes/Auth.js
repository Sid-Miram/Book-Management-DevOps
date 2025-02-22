const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { userModel } = require('../models/user');
const cookieParser = require('cookie-parser'); // ✅ Import cookie-parser
const cors = require('cors'); // ✅ Import CORS
require('dotenv').config();
const OAuth2Strategy = require("passport-google-oauth2").Strategy;

const auth = express();


// ✅ Middleware Fixes
auth.use(express.json());
auth.use(cookieParser()); // ✅ Enable cookie parsing
auth.use(cors({
    origin: "http://localhost:4500", // ✅ Allow frontend origin
    credentials: true // ✅ Allow cookies in CORS
}));


passport.use(new OAuth2Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"]
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log("Google OAuth Profile:", profile);

        let user = await userModel.findOne({ username: profile.emails[0].value });

        if (!user) {
            console.log("User not found in DB, creating new user...");
            user = await userModel.create({
                name: profile.displayName,
                username: profile.emails[0].value,
                ownerImg: [profile.photos[0].value],
                role: 'user',
            });
        }

        return done(null, user);
    } catch (error) {
        console.error("Error in Google OAuth Strategy:", error);
        return done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id);
        done(null, user);
    } catch (err) {
        console.error("Error in deserializing user:", err);
        done(err, null);
    }
});

// Google Auth Routes
auth.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

auth.get('/auth/google/callback', passport.authenticate('google', { session: false }),
    async (req, res) => {
        try {
            console.log("Google Auth Successful. User:", req.user);

            const token = jwt.sign({ id: req.user._id, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: "None", // ✅ Important for cross-origin cookies
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });
            console.log(token);
            console.log("JWT Token generated and set in cookies.");
            res.redirect('http://localhost:4500/');
        } catch (error) {
            console.error("Error in Google Auth Callback:", error);
            res.status(500).send('Server Error');
        }
    }
);

// ✅ FIX: Extract JWT correctly
auth.get('/user', async (req, res) => {
    try {

        const token = req.cookies.jwt; // ✅ FIX: Correct way to get token
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded User Info:", decoded);

        const user = await userModel.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user info:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// Logout Route
auth.get('/logout', (req, res) => {
    res.clearCookie('jwt', { sameSite: "None", secure: true });
    console.log("User logged out. JWT cleared.");
    res.redirect('/');
});

//get all users
auth.get('/allUsers', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({users});
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});
module.exports = auth;
