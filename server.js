const {createServer} = require('./src/server/server');

const {
    MONGO_USER = 'broken-char-user',
    MONGO_PASSWORD = '',
    MONGO_LOCAL = 'false',
    MONGO_DATABSE = 'broken-chat-code',
    MONGO_HOST = 'ds111370.mlab.com',
    MONGO_PORT = 11370,
    SERVER_HOST = 'localhost',
    SERVER_PORT = 3001
} = process.env;

/**
 * Setup mongo configuration
 */
const DATABASE_CONFIG = {
    user: MONGO_USER,
    password: MONGO_PASSWORD,
    host: MONGO_HOST,
    port: MONGO_PORT,
    local: MONGO_LOCAL !== 'false',
    database: MONGO_DATABSE
};

/**
 * Socket.io server
 */
const SERVER_CONFIG = {
    host: process.env.HOST || process.env.SERVER_HOST || 'localhost',
    port: process.env.PORT || 3001,
};

createServer(SERVER_CONFIG, DATABASE_CONFIG)
    .catch(err => {
        console.log(err);
    });
