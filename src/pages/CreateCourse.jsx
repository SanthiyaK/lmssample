"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { courseAPI } from "../services/api"
import { ProtectedRoute } from "../components/ProtectedRoute"
import "./CreateCourse.css"

function CreateCourseContent() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "programming",
    level: "beginner",
    price: 0,
    duration: 10,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "duration" ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.description || !formData.duration) {
      setError("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    try {
      await courseAPI.createCourse(formData)
      navigate("/dashboard/instructor")
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="create-course-page">
      <div className="page-header">
        <h1>Create New Course</h1>
        <p>Share your knowledge with learners</p>
      </div>

      <form onSubmit={handleSubmit} className="course-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-section">
          <h2>Course Information</h2>

          <div className="form-group">
            <label htmlFor="title">Course Title *</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., React Advanced Patterns"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what students will learn..."
              rows="6"
              required
              disabled={isLoading}
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
                <option value="data-science">Data Science</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="level">Level</label>
              <select id="level" name="level" value={formData.level} onChange={handleChange} disabled={isLoading}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="duration">Duration (hours) *</label>
              <input
                id="duration"
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="1"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price ($)</label>
              <input
                id="price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-large btn-primary" disabled={isLoading}>
          {isLoading ? "Creating Course..." : "Create Course"}
        </button>
      </form>
    </div>
  )
}

export default function CreateCourse() {
  return (
    <ProtectedRoute requiredRole="instructor">
      <CreateCourseContent />
    </ProtectedRoute>
  )
}
