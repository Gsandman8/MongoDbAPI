const {connect, connection} = require('mongoose');

const connectionString = 
    process.env.MONGODB_URI || "mongodb://127.0.0.1/thoughtsdb";

connect(connectionString);

module.exports = connection;