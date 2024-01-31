require('dotenv').config()

const mongoose = require('mongoose');
const Employee = require('./models/Employee'); //Model

function ConnectToDB() {
   const url = process.env.DB_URL
   mongoose.connect(url);
   console.log('🚀 MongoDB Connected')
}

module.exports = { ConnectToDB }