"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { userAPI } from "../../services/api"
import "./Dashboard.css"

export default function StudentDashboard() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [enrolledCourses] = useState([
    { id: 1, title: "React Fundamentals", progress: 65, lessons: "12/18" },
    { id: 2, title: "JavaScript Essentials", progress: 40, lessons: "8/20" },
    { id: 3, title: "CSS Grid & Flexbox", progress: 90, lessons: "18/20" },
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

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.fullName || "Student"}!</h1>
        <p>Continue your learning journey</p>
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Your Enrolled Courses</h2>
            <a href="/courses" className="view-all">
              View All
            </a>
          </div>
          <div className="courses-list">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="course-item">
                <div className="course-info">
                  <h3>{course.title}</h3>
                  <p>{course.lessons}</p>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                </div>
                <span className="progress-text">{course.progress}%</span>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Quick Stats</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-value">{enrolledCourses.length}</div>
              <div className="stat-label">Active Courses</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📖</div>
              <div className="stat-value">38</div>
              <div className="stat-label">Lessons Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-value">65%</div>
              <div className="stat-label">Avg Progress</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-value">24h</div>
              <div className="stat-label">Learning Time</div>
            </div>
          </div>
        </section>

        <section className="dashboard-section full-width">
          <h2>Recommendations</h2>
          <div className="recommendations">
            <div className="recommendation-card">
              <span className="recommendation-tag">Popular</span>
              <h4>Advanced React Patterns</h4>
              <p>Take your React skills to the next level</p>
              <button className="btn btn-small btn-outline">Explore</button>
            </div>
            <div className="recommendation-card">
              <span className="recommendation-tag">New</span>
              <h4>TypeScript Mastery</h4>
              <p>Learn static typing for JavaScript</p>
              <button className="btn btn-small btn-outline">Explore</button>
            </div>
            <div className="recommendation-card">
              <span className="recommendation-tag">Trending</span>
              <h4>Next.js Full Stack</h4>
              <p>Build full-stack applications</p>
              <button className="btn btn-small btn-outline">Explore</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
