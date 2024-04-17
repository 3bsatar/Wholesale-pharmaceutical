const mongoose = require('mongoose');

async function connectDatabase(connectionUrl) {
    try {
        await mongoose.connect(connectionUrl);
        console.log('Mongo Database connected');
    } catch (err) {
        console.log("Error while connecting to MongoDB: " + err);
    }
}

function getDatabase() {
    return mongoose.connection;
}

module.exports = { connectDatabase, getDatabase };