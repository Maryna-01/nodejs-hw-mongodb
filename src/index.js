require('dotenv').config();
const {
    initMongoConnection
} = require('./db/initMongoConnection');
const {
    setupServer
} = require('./server');

async function startApp() {
    await initMongoConnection();
    setupServer();
}

startApp();
