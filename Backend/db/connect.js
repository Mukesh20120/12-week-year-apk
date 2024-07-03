const mongoose = require('mongoose');
require('dotenv').config();

const connectUrl = () =>{
    return mongoose.connect(process.env.URL);
}

module.exports = connectUrl;