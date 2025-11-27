"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { userAPI } from "../../services/api"
import "./Dashboard.css"

export default function InstructorDashboard() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [courses] = useState([
    { id: 1, title: "React Advanced Patterns", students: 245, rating: 4.8, revenue: 4900 },
    { id: 2, title: "Node.js Best Practices", students: 189, rating: 4.7, revenue: 3780 },
  ])

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userAPI.getProfile()
        setProfile(data)
      } catch (error) {
        console.error("Failed to fetch profile:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchProfile()
    }
  }, [user])

  if (isLoading) return <div className="loading-state">Loading dashboard...</div>

  const totalStudents = courses.reduce((sum, c) => sum + c.students, 0)
  const totalRevenue = courses.reduce((sum, c) => sum + c.revenue, 0)
  const avgRating = (courses.reduce((sum, c) => sum + c.rating, 0) / courses.length).toFixed(2)

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Instructor Dashboard</h1>
        <p>Manage your courses and track student progress</p>
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-section full-width">
          <h2>Overview</h2>
          <div className="stats-grid">
            <div className="stat-card large">
              <div className="stat-icon">👥</div>
              <div className="stat-value">{totalStudents}</div>
              <div className="stat-label">Total Students</div>
            </div>
            <div className="stat-card large">
              <div className="stat-icon">📊</div>
              <div className="stat-value">{avgRating}</div>
              <div className="stat-label">Avg Rating</div>
            </div>
            <div className="stat-card large">
              <div className="stat-icon">💰</div>
              <div className="stat-value">${totalRevenue}</div>
              <div className="stat-label">Total Revenue</div>
            </div>
            <div className="stat-card large">
              <div className="stat-icon">📚</div>
              <div className="stat-value">{courses.length}</div>
              <div className="stat-label">Active Courses</div>
            </div>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Your Courses</h2>
            <Link to="/create-course" className="btn btn-small btn-primary">
              Create New
            </Link>
          </div>
          <div className="courses-list">
            {courses.map((course) => (
              <div key={course.id} className="course-item-detailed">
                <div className="course-info">
                  <h3>{course.title}</h3>
                  <div className="course-meta">
                    <span>{course.students} students</span>
                    <span>•</span>
                    <span>⭐ {course.rating}</span>
                  </div>
                </div>
                <div className="course-stats">
                  <div className="stat">
                    <span className="label">Revenue</span>
                    <span className="value">${course.revenue}</span>
                  </div>
                </div>
                <button className="btn btn-small btn-outline">Manage</button>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">🎓</span>
              <div className="activity-content">
                <p className="activity-title">New student enrolled</p>
                <span className="activity-time">Sarah joined "React Advanced Patterns"</span>
              </div>
              <span className="time">2h ago</span>
            </div>
            <div className="activity-item">
              <span className="activity-icon">⭐</span>
              <div className="activity-content">
                <p className="activity-title">New course review</p>
                <span className="activity-time">5-star review on "Node.js Best Practices"</span>
              </div>
              <span className="time">4h ago</span>
            </div>
            <div className="activity-item">
              <span className="activity-icon">💬</span>
              <div className="activity-content">
                <p className="activity-title">New message</p>
                <span className="activity-time">Student question about Lesson 5</span>
              </div>
              <span className="time">1d ago</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
