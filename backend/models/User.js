const mongoose = require('mongoose');

// Remove any import of Task model here if present
// const Task = require('./Task'); // <-- Remove this line if it exists

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

module.exports = mongoose.model('User', userSchema);