// backend/models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    default: '#1a73e8'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
