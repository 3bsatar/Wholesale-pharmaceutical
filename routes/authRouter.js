const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/Users'); 
router.use(bodyParser.json());

router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;

    console.log(req.body);

    if (!email || !password || !role) {
        return res.status(400).json({ message: "Email, password, and role are required." });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists with the given email address." });
        }
        const user = new User({
            email,
            password,
            role
        });

        await user.save();

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server error during registration.", error: error.message });
    }
})
.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password." });
        }

        res.status(200).json({ message: "Login successful." });
    } catch (error) {
        res.status(500).json({ message: "Server error during login.", error: error.message });
    }
});


module.exports = router;