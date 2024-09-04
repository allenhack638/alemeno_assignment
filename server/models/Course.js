const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    instructor: { type: String, required: true },
    description: { type: String, required: true },
    enrollmentStatus: {
      type: String,
      enum: ["Open", "Closed", "InProgress"],
      required: true,
    },
    thumbnail: { type: String, required: true },
    duration: { type: String, required: true },
    schedule: { type: String, required: true },
    location: { type: String, required: true },
    prerequisites: [{ type: String, required: true }],
    syllabus: [
      {
        week: { type: Number, required: true },
        topic: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],
    students: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
      },
    ],
    likes: { type: Number, default: 0 }, // New field to track likes
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
