const Course = require("../models/course");

// Fetch all courses
exports.getCourses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const courses = await Course.find().select(
      "_id name instructor description students.name likes thumbnail"
    );
    // .skip(skip)
    // .limit(limit);

    const totalCourses = await Course.countDocuments();

    const formattedCourses = courses.map((course) => ({
      _id: course._id,
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
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch a single course by ID
exports.getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
