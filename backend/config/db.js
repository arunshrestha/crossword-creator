const mongoose = require('mongoose');

const connectToDB = async () => {
    const env = process.env.NODE_ENV || 'development';
    const uri = env === 'production'
        ? process.env.MONGO_URI_PROD
        : process.env.MONGO_URI_DEV;

    const clientOptions = {
        serverApi: {
            version: '1',
            strict: true,
            deprecationErrors: true,
        },
    };

    try {
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log(`✅ MongoDB connected to ${env} database`);
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectToDB;
