"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { courseAPI } from "../services/api"
import "./CourseDetail.css"

export default function CourseDetail() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { user, token } = useAuth()
  const [course, setCourse] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [isEnrolling, setIsEnrolling] = useState(false)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true)
        const data = await courseAPI.getCourse(courseId)
        setCourse(data)

        // Check if user is enrolled
        if (user && data.students?.includes(user.id)) {
          setIsEnrolled(true)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourse()
  }, [courseId, user])

  const handleEnroll = async () => {
    if (!user) {
      navigate("/login")
      return
    }

    setIsEnrolling(true)
    try {
      await courseAPI.enrollCourse(courseId)
      setIsEnrolled(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsEnrolling(false)
    }
  }

  if (isLoading) return <div className="loading-state">Loading course...</div>
  if (error) return <div className="error-message">{error}</div>
  if (!course) return <div className="error-message">Course not found</div>

  return (
    <div className="course-detail">
      <div className="detail-header">
        <div className="header-content">
          <h1>{course.title}</h1>
          <p className="instructor">by {course.instructor?.fullName}</p>
          <div className="meta-info">
            <span>{course.duration} hours</span>
            <span>•</span>
            <span className="level-badge">{course.level}</span>
            <span>•</span>
            <span>{course.students?.length || 0} students</span>
            {course.rating > 0 && (
              <>
                <span>•</span>
                <span>⭐ {course.rating.toFixed(1)}</span>
              </>
            )}
          </div>
        </div>
        <div className="header-action">
          {isEnrolled ? (
            <button className="btn btn-large btn-success">Enrolled</button>
          ) : (
            <button className="btn btn-large btn-primary" onClick={handleEnroll} disabled={isEnrolling}>
              {isEnrolling ? "Enrolling..." : "Enroll Now"}
            </button>
          )}
        </div>
      </div>

      <div className="detail-content">
        <section className="section">
          <h2>About This Course</h2>
          <p>{course.description}</p>
        </section>

        {course.lessons && course.lessons.length > 0 && (
          <section className="section">
            <h2>Lessons</h2>
            <div className="lessons-list">
              {course.lessons.map((lesson, index) => (
                <div key={index} className="lesson-item">
                  <div className="lesson-number">{index + 1}</div>
                  <div className="lesson-info">
                    <h4>{lesson.title}</h4>
                    <p>{lesson.description}</p>
                  </div>
                  <span className="lesson-duration">{lesson.duration} min</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {course.reviews && course.reviews.length > 0 && (
          <section className="section">
            <h2>Reviews</h2>
            <div className="reviews-list">
              {course.reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="review-header">
                    <span className="rating">⭐ {review.rating}</span>
                    <span className="date">{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
