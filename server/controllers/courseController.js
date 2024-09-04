const Course = require("../models/Course");

// Fetch all courses
exports.getCourses = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const courses = await Course.find()
      .select("id name instructor description students.name likes thumbnail")
      .skip(skip)
      .limit(limit);

    const totalCourses = await Course.countDocuments();

    const formattedCourses = courses.map((course) => ({
      id: course.id,
      name: course.name,
      instructor: course.instructor,
      description: course.description,
      enrolledStudents: course.students.map((student) => student.name),
      likes: course.likes,
      thumbnail: course.thumbnail,
    }));

    res.status(200).json({
      courses: formattedCourses,
      currentPage: page,
      totalPages: Math.ceil(totalCourses / limit),
      hasMore: page * limit < totalCourses,
    });
  } catch (error) {
    next(error);
  }
};

// Fetch a single course by ID
exports.getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

// Create a new course
exports.createCourse = async (req, res, next) => {
  try {
    const newCourse = new Course(req.body);
    const course = await newCourse.save();
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

// Update a course
exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

// Delete a course
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Increment course likes
exports.likeCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    course.likes += 1;
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};
