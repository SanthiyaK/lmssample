"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { userAPI } from "../../services/api"
import "./Dashboard.css"

export default function AdminDashboard() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

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
        <h1>Admin Dashboard</h1>
        <p>System overview and management</p>
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-section full-width">
          <h2>Platform Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card large admin">
              <div className="stat-icon">👥</div>
              <div className="stat-value">1,245</div>
              <div className="stat-label">Total Users</div>
              <span className="stat-change">↑ 12% this month</span>
            </div>
            <div className="stat-card large admin">
              <div className="stat-icon">📚</div>
              <div className="stat-value">47</div>
              <div className="stat-label">Active Courses</div>
              <span className="stat-change">↑ 5 new this month</span>
            </div>
            <div className="stat-card large admin">
              <div className="stat-icon">📝</div>
              <div className="stat-value">8,920</div>
              <div className="stat-label">Total Enrollments</div>
              <span className="stat-change">↑ 28% this month</span>
            </div>
            <div className="stat-card large admin">
              <div className="stat-icon">💰</div>
              <div className="stat-value">$124.5K</div>
              <div className="stat-label">Platform Revenue</div>
              <span className="stat-change">↑ 35% this month</span>
            </div>
          </div>
        </section>

        <section className="dashboard-section">
          <h2>User Statistics</h2>
          <div className="user-stats-grid">
            <div className="stat-box">
              <span className="stat-label">Students</span>
              <span className="stat-number">892</span>
              <span className="stat-percentage">71.6%</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Instructors</span>
              <span className="stat-number">215</span>
              <span className="stat-percentage">17.3%</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Admins</span>
              <span className="stat-number">138</span>
              <span className="stat-percentage">11.1%</span>
            </div>
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Top Courses</h2>
          <div className="top-courses-list">
            <div className="course-rank-item">
              <span className="rank">1</span>
              <div className="course-rank-info">
                <h4>React Advanced Patterns</h4>
                <p>245 students • $4,900 revenue</p>
              </div>
              <span className="badge">⭐ 4.8</span>
            </div>
            <div className="course-rank-item">
              <span className="rank">2</span>
              <div className="course-rank-info">
                <h4>Node.js Best Practices</h4>
                <p>189 students • $3,780 revenue</p>
              </div>
              <span className="badge">⭐ 4.7</span>
            </div>
            <div className="course-rank-item">
              <span className="rank">3</span>
              <div className="course-rank-info">
                <h4>MongoDB Mastery</h4>
                <p>156 students • $3,120 revenue</p>
              </div>
              <span className="badge">⭐ 4.6</span>
            </div>
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Recent Activities</h2>
          <div className="activity-log">
            <div className="activity-item">
              <span className="activity-type success">✓</span>
              <div className="activity-detail">
                <p className="activity-desc">New user registered</p>
                <span className="activity-time">john_doe@example.com • 2h ago</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-type info">📚</span>
              <div className="activity-detail">
                <p className="activity-desc">New course published</p>
                <span className="activity-time">TypeScript Fundamentals • 4h ago</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-type warning">⚠️</span>
              <div className="activity-detail">
                <p className="activity-desc">Course flagged for review</p>
                <span className="activity-time">Suspicious content detected • 1d ago</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-type success">✓</span>
              <div className="activity-detail">
                <p className="activity-desc">Payment processed</p>
                <span className="activity-time">$524.00 revenue • 2d ago</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
