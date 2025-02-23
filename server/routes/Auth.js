const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { userModel } = require('../models/user');
require('dotenv').config();
const OAuth2Strategy = require("passport-google-oauth2").Strategy;

const auth = express();
auth.use(express.json()); // ✅ Enable JSON parsing

// Configure Google OAuth Strategy
passport.use(new OAuth2Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"]
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log("Google OAuth Profile:", profile); // ✅ Debugging Google OAuth Profile

        let user = await userModel.findOne({ username: profile.emails[0].value });

        if (!user) {
            console.log("User not found in DB, creating new user...");

            user = await userModel.create({
                name: profile.displayName,
                username: profile.emails[0].value,
                ownerImg: [profile.photos[0].value],
                role: 'user',
            });

            console.log("User successfully created:", user);
        } else {
            console.log("User already exists:", user);
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

// Google Authentication Routes
auth.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

auth.get('/auth/google/callback', passport.authenticate('google', { session: false }),
    async (req, res) => {
        try {
            console.log("Google Auth Successful. User:", req.user);

            const token = jwt.sign({ id: req.user._id, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            console.log("JWT Token generated and set in cookies.");

            res.redirect('http://localhost:4500/');
        } catch (error) {
            console.error("Error in Google Auth Callback:", error);
            res.status(500).send('Server Error');
        }
    }
);

// ✅ POST Route: Manually Register a User
auth.post('/login', async (req, res) => {
    try {
        console.log("Incoming Request Body:", req.body); // ✅ Debugging

        const { name, username, ownerImg, role } = req.body;

        if (!name || !username) {
            console.log("Validation Error: Name and username are required.");
            return res.status(400).json({ message: "Name and email are required" });
        }

        // Check if user already exists
        let user = await userModel.findOne({ username });

        if (user) {
            console.log("User already exists in DB:", user);
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user
        console.log("Creating new user...");
        user = new userModel({
            name,
            username,
            ownerImg: ownerImg || [],
            role: role || 'user'
        });

        console.log("User object before saving:", user);

        await user.save();

        console.log("User successfully saved to DB:", user);

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Set HTTP-Only Cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        console.log("User registered successfully and JWT token set.");

        res.status(201).json({ message: "User registered successfully", user });

    } catch (error) {
        console.error("Error in /login route:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// ✅ Get User Info Route
auth.get('/user', async (req, res) => {
    try {
        // Extract token from cookies
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Verify JWT Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded User Info:", decoded);

        // Fetch user details from DB
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
    res.clearCookie('jwt');
    console.log("User logged out. JWT cleared.");
    res.redirect('/');
});

module.exports = auth;
