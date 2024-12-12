
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/wavespace', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Use routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Start the server
app.listen(3000, () => console.log('WaveSpace server running on http://localhost:3000'));
