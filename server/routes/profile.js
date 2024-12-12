
const express = require('express');
const User = require('../models/user');
const multer = require('multer');

const router = express.Router();

// Configure multer for profile picture uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Update profile picture
router.post('/update-profile-picture', upload.single('profilePicture'), async (req, res) => {
    const { userId } = req.body;
    const profilePicture = req.file.path;
    try {
        const user = await User.findByIdAndUpdate(userId, { profilePicture }, { new: true });
        res.json({ message: 'Profile picture updated', user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update profile picture' });
    }
});

module.exports = router;
