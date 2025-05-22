require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGO_URI;
const clientOptions = {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
    },
};

async function connectToDB() {
    try {
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log('✅ MongoDB connected and ping successful');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1); // Exit if DB fails to connect
    }
}

// Routes
app.get('/', (req, res) => {
    res.send('🚀 Crossword backend is running');
});

// TODO: Add your crossword puzzle routes here

// Start the server after DB connects
connectToDB().then(() => {
    app.listen(port, () => {
        console.log(`✅ Server is running on http://localhost:${port}`);
    });
});
