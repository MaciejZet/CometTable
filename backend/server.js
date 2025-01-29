// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const tasksRouter = require('./routes/tasks');
const projectsRouter = require('./routes/projects');

app.use('/api/tasks', tasksRouter);
app.use('/api/projects', projectsRouter);

// MongoDB connection
const MONGO_PORT = 27018;
const MONGO_URI = `mongodb://localhost:${MONGO_PORT}/task-manager`;

mongoose.connect(MONGO_URI)
  .then(() => console.log(`Connected to MongoDB on port ${MONGO_PORT}`))
  .catch(err => console.error('Could not connect to MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});