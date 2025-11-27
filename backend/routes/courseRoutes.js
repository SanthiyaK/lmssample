import express from "express"
import { protect, authorize } from "../middleware/auth.js"
import Course from "../models/Course.js"
import User from "../models/User.js"

const router = express.Router()

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate("instructor", "fullName email").select("-reviews")

    res.json(courses)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single course
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "fullName email")
      .populate("students", "fullName email")

    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    res.json(course)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create course (Instructor only)
router.post("/", protect, authorize("instructor", "admin"), async (req, res) => {
  try {
    const { title, description, category, level, price, duration } = req.body

    if (!title || !description || !duration) {
      return res.status(400).json({ message: "Please provide required fields" })
    }

    const course = new Course({
      title,
      description,
      category: category || "programming",
      level: level || "beginner",
      price: price || 0,
      duration,
      instructor: req.user.id,
    })

    await course.save()

    // Add course to instructor's createdCourses
    await User.findByIdAndUpdate(req.user.id, { $push: { createdCourses: course._id } }, { new: true })

    res.status(201).json({ message: "Course created successfully", course })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update course (Instructor only)
router.put("/:id", protect, authorize("instructor", "admin"), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)

    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    if (course.instructor.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update this course" })
    }

    const updates = req.body
    Object.assign(course, updates)
    await course.save()

    res.json({ message: "Course updated successfully", course })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete course (Instructor only)
router.delete("/:id", protect, authorize("instructor", "admin"), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)

    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    if (course.instructor.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this course" })
    }

    await Course.findByIdAndDelete(req.params.id)

    res.json({ message: "Course deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Enroll in course
router.post("/:id/enroll", protect, authorize("student"), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)

    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    if (course.students.includes(req.user.id)) {
      return res.status(400).json({ message: "Already enrolled in this course" })
    }

    course.students.push(req.user.id)
    await course.save()

    await User.findByIdAndUpdate(req.user.id, { $push: { enrolledCourses: course._id } }, { new: true })

    res.json({ message: "Enrolled successfully", course })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
