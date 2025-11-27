"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { courseAPI } from "../services/api"
import "./Courses.css"

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    category: "all",
    level: "all",
    search: "",
  })

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true)
        const data = await courseAPI.getAllCourses()
        setCourses(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = filters.category === "all" || course.category === filters.category
    const matchesLevel = filters.level === "all" || course.level === filters.level
    const matchesSearch = course.title.toLowerCase().includes(filters.search.toLowerCase())
    return matchesCategory && matchesLevel && matchesSearch
  })

  return (
    <div className="courses-page">
      <div className="page-header">
        <h1>All Courses</h1>
        <p>Browse our collection of courses</p>
      </div>

      <div className="filters-section">
        <input
          type="text"
          placeholder="Search courses..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="search-input"
        />

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          <option value="programming">Programming</option>
          <option value="design">Design</option>
          <option value="business">Business</option>
          <option value="data-science">Data Science</option>
        </select>

        <select
          value={filters.level}
          onChange={(e) => setFilters({ ...filters, level: e.target.value })}
          className="filter-select"
        >
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <div className="loading-state">Loading courses...</div>
      ) : filteredCourses.length === 0 ? (
        <div className="empty-state">
          <p>No courses found matching your filters.</p>
        </div>
      ) : (
        <div className="courses-grid">
          {filteredCourses.map((course) => (
            <Link key={course._id} to={`/courses/${course._id}`} className="course-card">
              <div className="course-header">
                <span className="category-badge">{course.category}</span>
                <span className="level-badge">{course.level}</span>
              </div>
              <div className="course-body">
                <h3>{course.title}</h3>
                <p className="instructor">by {course.instructor?.fullName || "Unknown"}</p>
                <p className="description">{course.description.substring(0, 80)}...</p>
              </div>
              <div className="course-footer">
                <span className="students">{course.students?.length || 0} students</span>
                {course.rating > 0 && <span className="rating">⭐ {course.rating.toFixed(1)}</span>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
