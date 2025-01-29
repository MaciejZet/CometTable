const mongoose = require('mongoose');
const User = require('../models/User'); // Import User first
const Task = require('../models/Task');
const Project = require('../models/Project');

const MONGO_PORT = 27018;
const MONGO_URI = `mongodb://localhost:${MONGO_PORT}/task-manager`;

const user = {
  name: "Test User",
  email: "test@test.com"
};

const projects = [
  {
    name: "Website Redesign",
    description: "Company website redesign project",
    color: "#FF0000"
  },
  {
    name: "Mobile App",
    description: "Mobile application development",
    color: "#00FF00"
  }
];

const tasks = [
  {
    title: "Design Homepage",
    description: "Create new homepage mockup",
    status: "todo",
    priority: "HIGH",
    dueDate: new Date(2024, 3, 15),
    labels: ["design", "frontend"]
  },
  {
    title: "Backend API",
    description: "Implement REST API endpoints",
    status: "inProgress",
    priority: "MEDIUM",
    dueDate: new Date(2024, 3, 20),
    labels: ["backend", "api"]
  },
  {
    title: "User Testing",
    description: "Conduct user testing sessions",
    status: "done",
    priority: "LOW",
    dueDate: new Date(2024, 3, 25),
    labels: ["testing", "ux"]
  }
];

async function seedData() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await Task.deleteMany({});
    await Project.deleteMany({});
    await User.deleteMany({});

    const savedUser = await User.create(user);
    console.log('User created');

    const savedProjects = await Project.insertMany(projects);
    console.log('Projects added');

    const tasksWithRefs = tasks.map((task, index) => ({
      ...task,
      project: savedProjects[index % savedProjects.length]._id,
      createdBy: savedUser._id,
      assignedTo: savedUser._id
    }));

    await Task.insertMany(tasksWithRefs);
    console.log('Tasks added');

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData();