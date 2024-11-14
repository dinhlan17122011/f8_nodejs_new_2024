// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
