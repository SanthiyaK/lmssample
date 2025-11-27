import express from "express"
import { protect } from "../middleware/auth.js"
import User from "../models/User.js"

const router = express.Router()

// Get user profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("enrolledCourses", "title description")
      .populate("createdCourses", "title description")

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update user profile
router.put("/profile", protect, async (req, res) => {
  try {
    const { fullName, email } = req.body

    const user = await User.findByIdAndUpdate(req.user.id, { fullName, email }, { new: true, runValidators: true })

    res.json({ message: "Profile updated successfully", user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
