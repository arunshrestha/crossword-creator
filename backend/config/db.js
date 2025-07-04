const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // Optional: Ping the database
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log('✅ MongoDB connected and ping successful');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectToDB;