const mongoose = require("mongoose");
const Course = require("../models/Course");
const fs = require("fs").promises;
const path = require("path");

require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    seedCourses();
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedCourses = async () => {
  try {
    await Course.deleteMany({});
    console.log("Deleted all courses");

    const jsonPath = path.join(__dirname, "../data", "courses.json");
    const jsonData = await fs.readFile(jsonPath, "utf8");
    const courses = JSON.parse(jsonData);

    // console.log(courses);

    await Course.insertMany(courses);
    console.log("Courses seeded successfully");

    // await Course.insertMany(courses);
  } catch (error) {
    console.error("Error seeding data:", error.message);
  }
};

module.exports = connectDB;
