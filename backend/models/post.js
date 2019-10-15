// const mongoose = require('mongoose');


// const postSchema = mongoose.Schema({
// title : {type : String, require: true},
// content : {type : String, require: true},
// });

// module.exports = mongoose.model('Post', postSchema);

const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test',
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;