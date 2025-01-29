// backend/models/Task.js
require('./User'); // Ensure User model is loaded

const mongoose = require('mongoose');

// Avoid importing User here to prevent circular dependency
// const User = require('./User'); // <-- This line is already handled above

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['todo', 'inProgress', 'done'],
    default: 'todo'
  },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH'],
    default: 'MEDIUM',
    required: true
  },
  dueDate: {
    type: Date
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  labels: [{
    type: String,
    trim: true
  }],
  comments: [{
    text: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Add pre-save middleware to ensure status consistency
taskSchema.pre('save', function(next) {
  if (this.status) {
    this.status = this.status.toLowerCase();
  }
  next();
});

module.exports = mongoose.model('Task', taskSchema);
