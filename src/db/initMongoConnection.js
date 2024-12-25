const mongoose = require('mongoose');

async function initMongoConnection() {
    const {
        MONGODB_USER,
        MONGODB_PASSWORD,
        MONGODB_URL,
        MONGODB_DB
    } = process.env;
    const mongoUri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Mongo connection successfully established!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}

module.exports = {
    initMongoConnection
};